"use client";
import Link from "next/link";
import CLink from "../../Link/CLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export interface MainNavbarProps {
  user: {
    id: string;
    name: string;
    image: string;
  } | null;
  isMentor: boolean;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({ user, isMentor }) => {
  const pathName = usePathname();

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
                href="/mentors"
                className={clsx(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium",
                  pathName == "/mentors" && "border-primary  border-b-2"
                )}
              >
                Find Mentors
              </Link>
              <Link
                href="/mentors/my-mentors"
                className={clsx(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium",
                  pathName == "/mentors/my-mentors" &&
                    "border-primary  border-b-2"
                )}
              >
                My Mentors
              </Link>
              {!isMentor && (
                <Link
                  href="/mentors/be-mentor"
                  className={clsx(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathName == "/mentors/be-mentor" &&
                      "border-primary  border-b-2"
                  )}
                >
                  Be a Mentor
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <CLink redirectTo="/mentors/profile" hasBackground={false}>
              <img className="rounded-xl w-12 h-12" src={user?.image}/>
            </CLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
