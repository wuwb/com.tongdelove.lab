export default function Page() {
  return (
    <div className="mx-auto mt-10 max-w-screen-md space-y-4">
      <h1 className="text-3xl font-bold">Middleware usage</h1>
      <p className="leading-loose">
        This page is protected by using the universal <code>auth()</code>
        method in Next.js Middleware .
      </p>
    </div>
  )
}
