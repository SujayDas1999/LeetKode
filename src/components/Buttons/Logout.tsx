import { auth } from "@/firebase/Firebase";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const handleOnClick = () => {
    signOut();
    toast.success("Logout success", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <>
      <button
        onClick={handleOnClick}
        className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
      >
        <FiLogOut />
      </button>
    </>
  );
};
export default Logout;
