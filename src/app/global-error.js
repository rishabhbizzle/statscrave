'use client'
 
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>Sorry, something went wrong. Please send us this error message on our socials and we'll fix it as soon as possible.</p>
        <p>{error?.message}</p>
        <pre>{error?.stack}</pre>
        {/* <button onClick={() => reset()}>Try again</button> */}
      </body>
    </html>
  )
}