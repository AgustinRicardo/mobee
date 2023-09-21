//TODO: completar funcionalidad del signup
"use client";
import { FormEventHandler, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
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
            <input
              className="rounded-sm h-8 text-beeBrownHeader p-2 bg-beeBeig"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>

          <label className="flex flex-col">
            Confirm password
            <input
              className="rounded-sm h-8 text-beeBrownHeader p-2 bg-beeBeig"
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            />
          </label>
          <button
            className="flex w-20 bg-beeYellow h-8 text-beeBrownBackground rounded-sm self-center items-center justify-center mt-2"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <span className="text-center w-max">
          Already have an account? <Link href="/login">Log in</Link>
        </span>
      </div>
      <Toaster />
    </>
  );
}
