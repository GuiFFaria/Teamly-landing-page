const isProduction = process.env.NODE_ENV === "production";

function fromEnv(name: string, value: string | undefined, devFallback: string): string {
  if (value) return value;
  if (isProduction) {
    throw new Error(`${name} is required for production builds. See .env.example.`);
  }
  return devFallback;
}

/** Public URL of the Teamly app. Powers every "Go to the app" call to action. */
export const appUrl = fromEnv("NEXT_PUBLIC_APP_URL", process.env.NEXT_PUBLIC_APP_URL, "http://localhost:3000");

/** Where "Request access" emails are sent. */
export const contactEmail = fromEnv("NEXT_PUBLIC_CONTACT_EMAIL", process.env.NEXT_PUBLIC_CONTACT_EMAIL, "");
