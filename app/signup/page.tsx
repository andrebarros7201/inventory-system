"use client";
import { FormEvent, useRef, useState } from "react";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { useDispatch } from "react-redux";
import FormButton from "@/components/ui/formButton";
import Form from "@/components/ui/form";
import axios from "axios";

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (
      usernameRef.current?.value === "" ||
      passwordRef.current?.value === ""
    ) {
      dispatch(
        NotificationActions.createNotification({
          type: "error",
          message: "Username and password are required",
        }),
      );
    } else {
      try {
        const response = await axios.post("api/auth/register", {
          username: usernameRef.current!.value,
          password: passwordRef.current!.value,
        });

        const { notification } = response.data;
        dispatch(
          NotificationActions.createNotification({
            type: notification.type,
            message: notification.message,
          }),
        );
        router.push("/login");
      } catch (error) {
        // @ts-ignore
        const notification = error.response?.data?.notification || {
          type: "error",
          message: "Server error",
        };

        dispatch(
          NotificationActions.createNotification({
            type: notification.type,
            message: notification.message,
          }),
        );
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <main className="w-full max-w-md flex flex-col items-center">
      <Form title={"Sign Up"} onSubmit={handleSubmit}>
        <Input
          label={"username"}
          id={"username"}
          type={"text"}
          required={true}
          max={50}
          min={3}
          ref={usernameRef}
        />
        <Input
          label={"password"}
          id={"password"}
          type={"password"}
          required={true}
          max={50}
          min={3}
          ref={passwordRef}
        />
        <FormButton
          label={loading ? "Signing in..." : "Sign up"}
          color={"blue"}
          type={"submit"}
          onClick={(e) => handleSubmit(e)}
        />
      </Form>
    </main>
  );
};

export default SignUp;
