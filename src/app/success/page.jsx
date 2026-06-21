"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const sessionId = useSearchParams().get("session_id");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!sessionId) return;

    const verify = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/verify-payment?session_id=${sessionId}`
      );

      const data = await res.json();

      setStatus(data.success ? "success" : "failed");
    };

    verify();
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {status === "loading" && <p>Verifying payment...</p>}
      {status === "success" && <h1>Payment Successful 🎉</h1>}
      {status === "failed" && <h1>Payment Failed ❌</h1>}
    </div>
  );
}