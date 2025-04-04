"use client";
import { FormEvent, useRef, useState } from "react";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { UserActions } from "@/redux/slicers/userSlice";
import FormButton from "@/components/ui/formButton";
import Form from "@/components/ui/form";
import axios from "axios";

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

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
        const response = await axios.post("/api/auth/login", {
          username: usernameRef.current!.value,
          password: passwordRef.current!.value,
        });

        const { notification, user } = response.data;

        // Save user info
        dispatch(
          UserActions.logIn({ userID: user.userID, username: user.username }),
        );

        // Create notification
        dispatch(
          NotificationActions.createNotification({
            type: notification.type,
            message: notification.message,
          }),
        );
        router.push("/store");
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const notification = error.response?.data?.notification || {
          type: "error",
          message: "Server Error3",
        };
        dispatch(
          NotificationActions.createNotification({
            type: notification.type,
            message: notification.message,
          }),
        );
      } finally {
        setLoading(false);
        setTimeout(() => {
          dispatch(NotificationActions.toggleVisible());
        }, 5000);
      }
    }
  }

  return (
    <main className="w-full max-w-md flex flex-col items-center">
      <Form title={"Login"} onSubmit={(e: FormEvent) => handleSubmit(e)}>
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
          label={loading ? "Logging in..." : "Log In"}
          color={"blue"}
          type={"submit"}
          onClick={(e) => handleSubmit(e)}
        />
      </Form>
    </main>
  );
};

export default Login;
