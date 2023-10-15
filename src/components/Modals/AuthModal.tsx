import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Login from "./Login";
import { useRecoilState, useRecoilValue } from "recoil";
import { authModelState } from "@/atoms/auth.atom";
import Signup from "./Signup";
import Resetpassword from "./Resetpassword";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/Firebase";
import { useRouter } from "next/router";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const router = useRouter();
  const [authModel, setAuthModel] = useRecoilState(authModelState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setpageLoading] = useState(true);
  const closeModal = useCloseModal();
  useEffect(() => {
    if (user) router.push("/");
    if (!user && !loading) setpageLoading(false);
  }, [user, loading, router]);

  if (pageLoading) return null;

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"></div>
      <div className="w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                onClick={closeModal}
              >
                <IoMdClose className="h-5 w-5" />
              </button>
            </div>
            {authModel.type === "login" ? (
              <Login></Login>
            ) : authModel.type === "register" ? (
              <Signup></Signup>
            ) : (
              <Resetpassword></Resetpassword>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthModal;

function useCloseModal() {
  const [authModel, setAuthModel] = useRecoilState(authModelState);

  const closeModal = () => {
    setAuthModel((prev) => ({
      ...prev,
      isOpen: false,
      type: "login",
    }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      return window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return closeModal;
}
