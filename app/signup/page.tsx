"use client";
import { FormEvent, useRef } from "react";
import Input from "@/components/ui/input";

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <main className="w-full max-w-md flex flex-col items-center p-4 gap-4 bg-gray-700 rounded">
      <h2 className={"font-bold text-2xl w-full text-start"}>Sign Up</h2>
      <form
        className={"w-full flex flex-col items-start gap-8"}
        onSubmit={handleSubmit}
      >
        <Input
          label={"username"}
          placeholder={""}
          id={"username"}
          type={"text"}
          required={true}
          max={50}
          min={3}
          ref={usernameRef}
        />
        <Input
          label={"password"}
          placeholder={""}
          id={"password"}
          type={"text"}
          required={true}
          max={50}
          min={3}
          ref={passwordRef}
        />
        <button
          type={"submit"}
          className={
            "bg-blue-500 py-2 px-4 font-bold rounded hover:bg-blue-600 cursor-pointer duration-300 transition-all"
          }
        >
          Sign Up
        </button>
      </form>
    </main>
  );
};

export default SignUp;
