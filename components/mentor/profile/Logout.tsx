"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Button from "@/components/button/Button";

const LogoutBtn = () => {
  const onLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };
  return (
    <div>
      <Button onClick={onLogout} text="Logout" variant="Red">
        <LogOut />
      </Button>
    </div>
  );
};

export default LogoutBtn;
