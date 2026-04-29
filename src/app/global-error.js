'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>Sorry, something went wrong. Please send us this error message on any of our socials and we will fix it as soon as possible</p>
        <p>{error?.message}</p>
        <pre>{error?.stack}</pre>
      </body>
    </html>
  )
}
