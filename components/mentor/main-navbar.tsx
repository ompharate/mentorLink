import Link from "next/link";
import Button from "../button/Button";

export function MainNavbar() {
  return (
    <nav className=" border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img src="/logo.png" className="mr-3 h-6 sm:h-9" />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                MentorLink
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/mentors"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-primary"
              >
                Find Mentors
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* <Button variant="outline" className="mr-2">Sign In</Button>
            <Button>Sign Up</Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
