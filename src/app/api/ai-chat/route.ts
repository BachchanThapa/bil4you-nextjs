import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Car = {
  id: string;
  title: string | null;
  brand: string | null;
  model: string | null;
  year: number | null;
  price: number | null;
  is_sold: boolean | null;
};

// This API route receives the user's question and returns an AI answer.
export async function POST(request: Request) {
  const body = await request.json();
  const question = body.question;

  // This protects the API route from empty or invalid requests.
  if (!question || typeof question !== "string") {
    return NextResponse.json(
      { answer: "Please write a question first." },
      { status: 400 },
    );
  }

  const lowerQuestion = question.toLowerCase();

  // This checks if the user is probably writing in English.
  const isEnglishQuestion = checkIfEnglishQuestion(lowerQuestion);

  // This checks if the user is asking about a specific car brand.
  const carBrand = findCarBrand(lowerQuestion);

  // If a known brand is found, we search Supabase directly.
  if (carBrand) {
    const carAnswer = await getCarsByBrand(carBrand, isEnglishQuestion);

    return NextResponse.json({
      answer: carAnswer,
    });
  }

  // All other questions are sent to Ollama AI.
  const answer = await getOllamaAnswer(question);

  return NextResponse.json({
    answer,
  });
}

// This function makes a simple guess if the question is in English.
function checkIfEnglishQuestion(question: string) {
  const englishWords = [
    "do",
    "you",
    "have",
    "any",
    "car",
    "cars",
    "can",
    "english",
    "buy",
    "sell",
    "contact",
    "available",
  ];

  return englishWords.some((word) => question.includes(word));
}

// This function checks if the question contains a supported car brand.
function findCarBrand(question: string) {
  const brands = [
    "volvo",
    "toyota",
    "tesla",
    "audi",
    "kia",
    "mercedes",
    "volkswagen",
  ];

  return brands.find((brand) => question.includes(brand));
}

// This function searches Supabase and returns matching cars.
async function getCarsByBrand(
  brand: string,
  isEnglishQuestion: boolean,
) {
  const { data: cars, error } = await supabase
    .from("cars")
    .select("id, title, brand, model, year, price, is_sold")
    .eq("is_sold", false)
    .order("created_at", { ascending: false })
    .limit(20);

  // This handles database errors.
  if (error) {
    if (isEnglishQuestion) {
      return "Sorry, I could not get the cars from the database right now. Please try again later.";
    }

    return "Jag kunde tyvärr inte hämta bilar från databasen just nu. Försök igen senare.";
  }

  // This filters only the cars matching the searched brand.
  const matchingCars = (cars as Car[]).filter((car) => {
    const carText = `${car.title} ${car.brand} ${car.model}`.toLowerCase();

    return carText.includes(brand);
  });

  const formattedBrand = brand.charAt(0).toUpperCase() + brand.slice(1);

  // This handles the case when no matching cars are found.
  if (matchingCars.length === 0) {
    if (isEnglishQuestion) {
      return `Sorry, I could not find any available ${formattedBrand} cars right now. You can visit the Buy Cars page to see all current listings.`;
    }

    return `Jag hittade tyvärr inga tillgängliga ${formattedBrand}-bilar just nu. Du kan gärna titta på sidan Köp bilar för att se alla aktuella annonser.`;
  }

  const carWord = getCarCountText(
    matchingCars.length,
    formattedBrand,
    isEnglishQuestion,
  );

  // This creates a readable car list for the AI answer.
  const carList = matchingCars
    .map((car) => {
      const name = car.title || `${car.brand} ${car.model}`;
      const year = car.year ? ` ${car.year}` : "";

      const price = car.price
        ? `${car.price.toLocaleString("sv-SE")} kr`
        : isEnglishQuestion
          ? "Price missing"
          : "Pris saknas";

      const linkText = isEnglishQuestion ? "Read more" : "Läs mer";

      return `- ${name}${year} – ${price}\n  ${linkText}: /kop-bilar/${car.id}`;
    })
    .join("\n\n");

  // This returns the car answer in English or Swedish.
  if (isEnglishQuestion) {
    return `Yes, I found ${carWord}:\n\n${carList}`;
  }

  return `Ja, jag hittade ${carWord}:\n\n${carList}`;
}

// This function creates the car count text in English or Swedish.
function getCarCountText(
  count: number,
  brand: string,
  isEnglishQuestion: boolean,
) {
  if (isEnglishQuestion) {
    return count === 1
      ? `1 available ${brand} car`
      : `${count} available ${brand} cars`;
  }

  return count === 1
    ? `1 tillgänglig ${brand}-bil`
    : `${count} tillgängliga ${brand}-bilar`;
}

// This function sends the user's question to Ollama AI locally.
async function getOllamaAnswer(question: string) {
  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "llama3.1:8b",

        stream: false,

        messages: [
          {
            role: "system",

            content:
              "You are Bil4You AI-assistent. Answer in the same language as the user. Keep answers short, friendly and helpful. Bil4You is a Swedish car marketplace where users can register, log in, buy cars, sell cars and contact Bil4You.",
          },

          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    // This handles failed Ollama requests.
    if (!response.ok) {
      return "AI-assistenten kunde inte kontakta Ollama just nu.";
    }

    const data = await response.json();

    // This returns the AI answer text from Ollama.
    return data.message?.content || "Jag kunde inte skapa ett svar just nu.";
  } catch {
    // This runs if Ollama is not started locally.
    return "Ollama verkar inte vara igång. Starta Ollama lokalt och försök igen.";
  }
}

/*
  This file:
  1. Receives chat questions from the AI assistant page.
  2. Validates incoming user questions.
  3. Detects if the user asks in English or Swedish.
  4. Detects supported car brands from the user's text.
  5. Searches Supabase for available matching cars.
  6. Returns car answers in the same language as the user.
  7. Sends general questions to Ollama AI locally.
  8. Returns AI-generated answers back to the frontend.
  9. Handles loading errors and Ollama connection problems.
*/