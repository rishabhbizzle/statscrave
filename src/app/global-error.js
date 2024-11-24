'use client'
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Error from "next/error";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>Sorry, something went wrong. Please send us this error message on our any of our socials and we will fix it as soon as possible</p>
        <p>{error?.message}</p>
        <pre>{error?.stack}</pre>
        {/* <button onClick={() => reset()}>Try again</button> */}
      </body>
    </html>
  )
}