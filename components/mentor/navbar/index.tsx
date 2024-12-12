import React, { Suspense } from "react";
import { MainNavbar } from "./main-navbar";
import { CustomSession, options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { isUserMentor } from "@/lib/api";

async function fetchUserDetails() {
  try {
  
    const session: CustomSession | null = await getServerSession(options);

    if (!session || !session?.user?.id) {
      return {
        user: null,
        isMentor: false,
      };
    }

    const user = session.user
      ? {
          id: session.user.id!,
          name: session.user.name!,
          email: session.user.email!,
          image: session.user.image!,
        }
      : null;

    const isMentor = await isUserMentor(user?.id!);
    return {
      user: user,
      isMentor,
    };
  } catch (error) {
    console.error(error);
    return {
      user: null,
      isMentor: false,
    };
  }
}

const UserNavbar = async () => {
  const { user, isMentor } = await fetchUserDetails();

  return (
    <div>
      <MainNavbar user={user} isMentor={isMentor} />
    </div>
  );
};

export default UserNavbar;
