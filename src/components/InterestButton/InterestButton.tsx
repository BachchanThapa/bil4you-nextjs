"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type InterestButtonProps = {
  carId: string;
  carTitle: string;
  carPrice: number;
  sellerUserId: string;
  ctaClassName: string;
  ownCarClassName: string;
};

export default function InterestButton({
  carId,
  carTitle,
  carPrice,
  sellerUserId,
  ctaClassName,
  ownCarClassName,
}: InterestButtonProps) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [hasSentInterest, setHasSentInterest] = useState(false);
  const [isCheckingInterest, setIsCheckingInterest] = useState(true);

  // I check the logged-in user and if this user already sent interest for this car.
  useEffect(() => {
    async function checkCurrentUserAndInterest() {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      setCurrentUserId(user?.id || null);

      if (!user?.email) {
        setIsCheckingInterest(false);
        return;
      }

      const { data: existingMessages } = await supabase
        .from("messages")
        .select("id")
        .eq("email", user.email)
        .eq("subject", `Bilförfrågan: ${carTitle}`)
        .ilike("message", `%Annons-ID: ${carId}%`)
        .limit(1);

      if (existingMessages && existingMessages.length > 0) {
        setHasSentInterest(true);
      }

      setIsCheckingInterest(false);
    }

    checkCurrentUserAndInterest();
  }, [carId, carTitle]);

  if (currentUserId && currentUserId === sellerUserId) {
    return <div className={ownCarClassName}>Detta är din annons</div>;
  }

  if (isCheckingInterest) {
    return <div className={ownCarClassName}>Kontrollerar intresse...</div>;
  }

  if (hasSentInterest) {
    return <div className={ownCarClassName}>Intresse redan skickat</div>;
  }

  return (
    <Link
      href={{
        pathname: "/kontakt",
        query: {
          carId,
          car: carTitle,
          price: carPrice,
        },
      }}
      className={ctaClassName}
    >
      Jag är intresserad
    </Link>
  );
}

/*
  - This component controls the interest button on the car detail page.
  - It checks the logged-in user with Supabase Auth.
  - If the logged-in user owns the car, the interest button is hidden.
  - It checks if the user already sent interest for this specific car.
  - If interest already exists, the button becomes inactive.
  - This prevents duplicate interest messages for the same car.
*/