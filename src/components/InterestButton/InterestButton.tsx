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

  // I check the logged-in user so sellers do not send interest on their own car.
  useEffect(() => {
    async function checkCurrentUser() {
      const { data } = await supabase.auth.getUser();
      setCurrentUserId(data.user?.id || null);
    }

    checkCurrentUser();
  }, []);

  if (currentUserId && currentUserId === sellerUserId) {
    return <div className={ownCarClassName}>Detta är din annons</div>;
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
  - This prevents sellers from sending interest messages on their own ads.
*/