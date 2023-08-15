"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [error, setError] = useState<AuthError | null>(null);
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
        title: error.name,
        description: error.message,
      });
    } else {
      router.replace("/home");
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen px-32 w-max gap-2">
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
            <input
              className="rounded-sm h-8 text-beeBrownHeader p-2 bg-beeBeig"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
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
          <Link href="/signup" className="pl-2">
            Sign up
          </Link>
        </span>
      </div>
      <Toaster />
    </>
  );
}
