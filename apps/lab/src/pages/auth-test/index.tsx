import UserButton from "@/components/auth-test/user-button";
import Link from "next/link";

export default function AuthTest() {
  return (
    <div>
      <div className="">
        <div>
          <div className="font-bold">Server Side</div>
          <ul className="flex flex-col">
            <Link href="/auth-test/server-example" >
              Protecting React SSR pages.
            </Link>
            <Link href="/auth-test/middleware-example" >
              Using Middleware to protect pages & APIs.
            </Link>
            <Link href="/auth-test/api-example">
              Getting the session inside an API Route.
            </Link>
          </ul>
        </div>

        <div className="mt-2 font-bold">
          <Link
            href="/auth-test/client-example"
          >
            Client Side
          </Link>
        </div>
      </div>
      <UserButton />
    </div>
  )
}
