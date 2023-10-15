import { authModelState } from "@/atoms/auth.atom";
import { auth } from "@/firebase/Firebase";
import Router, { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
  const [authModel, setAuthModel] = useRecoilState(authModelState);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleOnClick = (modalType: any) => {
    setAuthModel((prev) => ({
      ...prev,
      isOpen: true,
      type: modalType,
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password)
      return alert("Please fill all the fields");

    try {
      const user = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!user) return;
      router.push("/");
      toast.success("Login Success", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleOnSubmit}>
      <h5 className="text-xl font-medium text-white">Login into LeetKode</h5>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block-mb-2 text-gray-300"
        >
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className=" border-2 outline-none sm:text sm:rounded-lg
        focus:ring-blue-500 
        focus:border-blue-500
        block w-full
        p-2.5
        bg-gray-600
        border-gray-500
        placeholder-gray-400
        text-white
        "
          placeholder="name@company.com"
          onChange={handleChangeInput}
        ></input>
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block-mb-2 text-gray-300"
        >
          Your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className=" border-2 outline-none sm:text sm:rounded-lg
        focus:ring-blue-500 
        focus:border-blue-500
        block w-full
        p-2.5
        bg-gray-600
        border-gray-500
        placeholder-gray-400
        text-white
        "
          placeholder="*********"
          onChange={handleChangeInput}
        ></input>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="
        bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm 
        font-medium hover:text-brand-orange hover:bg-white hover:border-2 
        hover:border-brand-orange border-2 border-transparent transition-duration-300 ease-in-out"
        >
          Login
        </button>
        <button
          className="
        bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm 
        font-medium hover:text-brand-orange hover:bg-white hover:border-2 
        hover:border-brand-orange border-2 border-transparent transition-duration-300 ease-in-out"
          onClick={() => handleOnClick("forgotPassword")}
        >
          Forgot Password
        </button>
        <button
          className="
        bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm 
        font-medium hover:text-brand-orange hover:bg-white hover:border-2 
        hover:border-brand-orange border-2 border-transparent transition-duration-300 ease-in-out"
          onClick={() => handleOnClick("register")}
        >
          Create Account
        </button>
      </div>
    </form>
  );
};
export default Login;
