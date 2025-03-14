"use client";
import { FormEvent, useRef } from "react";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { NotificationActions } from "@/redux/slicers/notificationSlice";
import { UserActions } from "@/redux/slicers/userSlice";
import FormButton from "@/components/ui/formButton";
import Form from "@/components/ui/form";
import { RootState } from "@/redux/store";
import axios from "axios";

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    dispatch(UserActions.setLoading(true));
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
      // @ts-ignore
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
      dispatch(UserActions.setLoading(false));
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
