/* eslint-disable react/no-unescaped-entities */
"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import EyeCrossedOutIcon from "@/components/icons/EyeCrossedOutIcon";
import EyeIcon from "@/components/icons/EyeIcon";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [error, setError] = useState<AuthError | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      router.replace("/home");
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!password || !email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Some fields are missing",
      });
    } else {
      signIn();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen px-20 w-max gap-2">
        <img src="/logo.png" alt="" className="w-32" />
        <span className="block w-[40ch] text-center mb-5 opacity-80">
          Find new films and keep track of the ones you have watched
        </span>
        <form onSubmit={handleSubmit} className="flex flex-col w-52 gap-2">
          <label className="flex flex-col">
            Email
            <input
              className="rounded-sm h-8 text-beeBrownHeader p-2 bg-beeBeig"
              type="email"
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
          <button
            className="flex w-20 bg-beeYellow h-8 text-beeBrownBackground rounded-sm self-center items-center justify-center mt-2"
            type="submit"
          >
            Log in
          </button>
        </form>
        <span className="text-center w-max">
          Don't have an account?
          <Link href="/signup" className="pl-2 underline">
            Sign up
          </Link>
        </span>
      </div>
      <Toaster />
    </>
  );
}
