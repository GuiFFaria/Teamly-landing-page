"use client";

import Link from "next/link";
import { useEffect } from "react";

/** The site lives under /en and /pt. The bare root sends visitors to their browser language. */
export default function RootRedirect() {
  useEffect(() => {
    const preferred = navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
    window.location.replace(`/${preferred}/`);
  }, []);

  return (
    <main style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <p>
        <Link href="/en/">English</Link> · <Link href="/pt/">Português</Link>
      </p>
    </main>
  );
}
