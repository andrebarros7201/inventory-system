"use client";
import { FormEvent, useRef } from "react";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { useDispatch } from "react-redux";
import FormButton from "@/components/ui/formButton";
import Form from "@/components/ui/form";

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (usernameRef.current!.value && passwordRef.current!.value) {
      try {
        const response = await fetch("/api/auth/register", {
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

        //Redirect the user to the login page
        router.push("/login");
        dispatch(
          NotificationActions.createNotification({
            type: "success",
            message: "Account Created Successfully",
          }),
        );
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
  }

  return (
    <main className="w-full max-w-md flex flex-col items-center">
      <Form title={"Sign Up"} onSubmit={handleSubmit}>
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
          label={"Sign Up"}
          color={"blue"}
          type={"submit"}
          onClick={(e) => handleSubmit(e)}
        />
      </Form>
    </main>
  );
};

export default SignUp;
