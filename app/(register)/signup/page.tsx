"use client";
import { FormEventHandler, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeCrossedOutIcon from "@/components/icons/EyeCrossedOutIcon";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!username || !password || !email || !passwordConfirm) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Some fields are missing",
      });
    } else if (password !== passwordConfirm) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
    } else if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must have at least 6 characters",
      });
    } else {
      const userData = {
        username,
        email,
        password,
      };
      try {
        await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify(userData),
        });
      } catch (e) {
        throw e;
      }
      router.replace("/login");
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-max justify-center px-20 items-center gap-2">
        <img src="/logo.png" alt="" className="w-32" />
        <span className="block w-[40ch] text-center mb-5 opacity-80">
          Find new films and keep track of the ones you have watched
        </span>
        <form onSubmit={handleSubmit} className="flex flex-col w-52 gap-2">
          <label className="flex flex-col">
            Username
            <input
              className="rounded-sm h-8 text-beeBrownHeader p-2 bg-beeBeig"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>

          <label className="flex flex-col">
            Email
            <input
              className="rounded-sm h-8 text-beeBrownHeader p-2 bg-beeBeig"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label className="flex flex-col">
            Password
            <div className="flex flex-row items-center">
              <input
                className="rounded-sm h-8 text-beeBrownHeader p-2 bg-beeBeig w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute flex items-center"
              >
                {showPassword ? (
                  <EyeCrossedOutIcon className="absolute ml-[11.5rem] w-4 h-4 text-beeBrownHeader " />
                ) : (
                  <EyeIcon className="absolute ml-[11.5rem] w-4 h-4 text-beeBrownHeader " />
                )}
              </span>
            </div>
          </label>
          <label className="flex flex-col">
            Confirm Password
            <div className="flex flex-row items-center">
              <input
                className="rounded-sm h-8 text-beeBrownHeader p-2 bg-beeBeig w-full"
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeCrossedOutIcon className="absolute ml-[11.5rem] w-4 h-4 text-beeBrownHeader " />
                ) : (
                  <EyeIcon className="absolute ml-[11.5rem] w-4 h-4 text-beeBrownHeader " />
                )}
              </span>
            </div>
          </label>

          <button
            className="flex w-20 bg-beeYellow h-8 text-beeBrownBackground rounded-sm self-center items-center justify-center mt-2"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <span className="text-center w-max">
          Already have an account?
          <Link href="/login" className="underline pl-2">
            Log in
          </Link>
        </span>
      </div>
      <Toaster />
    </>
  );
}
