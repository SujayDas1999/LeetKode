import { authModelState } from "@/atoms/auth.atom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { useRecoilValue } from "recoil";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModel = useRecoilValue(authModelState);

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar></Navbar>
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <img src="/hero.png" alt="" />
        </div>
        {authModel.isOpen && <AuthModal></AuthModal>}
      </div>
    </div>
  );
};
export default AuthPage;
