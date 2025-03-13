"use client";
import { FormEvent, useRef } from "react";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { UserActions } from "@/redux/slicers/userSlice";
import Button from "@/components/ui/button";
import FormButton from "@/components/ui/formButton";

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current!.value,
          password: passwordRef.current!.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch(
        UserActions.logIn({
          userID: data.user.userID,
          username: data.user.username,
        }),
      );
      dispatch(
        NotificationActions.createNotification({
          type: "success",
          message: "Logged In",
        }),
      );
      router.push("/store");
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          NotificationActions.createNotification({
            type: "error",
            message: error.message,
          }),
        );
      } else {
        dispatch(
          NotificationActions.createNotification({
            type: "error",
            message: "An unknown error occurred",
          }),
        );
      }
    }
  }

  return (
    <main className="w-full max-w-md flex flex-col items-center p-4 gap-4 bg-gray-700 rounded">
      <h2 className={"font-bold text-2xl w-full text-start"}>Log In</h2>
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
          type={"password"}
          required={true}
          max={50}
          min={3}
          ref={passwordRef}
        />
        <FormButton
          label={"Log In"}
          color={"blue"}
          type={"submit"}
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </main>
  );
};

export default Login;
