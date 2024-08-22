import { useSession } from "next-auth/react"
import { useState } from "react"
import { SessionData } from "./session-data"

const UpdateForm = () => {
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name ?? "")

  if (!session?.user) return null
  return (
    <>
      <h2 className="text-xl font-bold">Updating the session</h2>
      <div className="flex items-center space-x-2 w-full max-w-sm">
        <input
          type="text"
          placeholder={session.user.name ?? ""}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <button
          type="submit"
          onClick={async () => {
            if (session) {
              await update({
                ...session,
                user: { ...session.user, name },
              })
            }
          }}
        >
          Update
        </button>
      </div>
    </>
  )
}

export function ClientExample() {
  const { data: session, status } = useSession()
  return (
    <div className="mx-auto mt-10 space-y-4 max-w-screen-md">
      <h1 className="text-3xl font-bold">Client Side Rendering Usage</h1>
      <p className="leading-loose">
        This page fetches session data client side using the{" "}
        <code>useSession</code>
        React Hook.
      </p>
      <p className="leading-loose">
        Make sure to wrap this component tree in a{" "}
        <code>SessionProvider</code>
        component in{" "}
        <strong>
          <code>client-example/page.tsx</code>
        </strong>{" "}
        to provide the session data.
      </p>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <SessionData session={session} />
      )}
      <UpdateForm />
    </div>
  )
}
