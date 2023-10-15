import { authModelState } from "@/atoms/auth.atom";
import { auth } from "@/firebase/Firebase";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import LoadingSkeleton from "../Skeleton/LoadingSkeleton";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [authModel, setAuthModel] = useRecoilState(authModelState);
  const [user] = useAuthState(auth);
  const [signOut, loading, error] = useSignOut(auth);
  const handleClick = async () => {
    if (!user) {
      setAuthModel((prev) => ({
        ...prev,
        isOpen: true,
      }));
    } else {
      const success = await signOut();
      if (success) alert("Sign out success");
    }
  };

  if (loading) return <LoadingSkeleton />;

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link href={"/"} className="flex-item-center justify-center h-20">
        <img src="/logo.png" alt="" className="h-full" />
      </Link>
      <div className="flex items-center">
        <button
          className="
        bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm 
        font-medium hover:text-brand-orange hover:bg-white hover:border-2 
        hover:border-brand-orange border-2 border-transparent transition-duration-300 ease-in-out"
          onClick={handleClick}
        >
          {!user ? "Sign In" : "Sign Out"}
        </button>
      </div>
    </div>
  );
};
export default Navbar;
