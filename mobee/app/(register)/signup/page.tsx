//TODO: completar funcionalidad del signup
"use client";
import { FormEventHandler, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import prismaClient from "@/utils/prisma-client";
import { toast, useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { createDBUser } from "../../../utils/actions";

type Credentials = {
  email: string;
  password: string;
};

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  async function createSupabaseUser(credentials: Credentials) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });
    console.log(error);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
    } else {
      //createSupabaseUser({ email, password });
      //createDBUser({username, email});
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label>Confirm password</label>
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <button type="submit">Sign up</button>
      </form>
      <span>
        Already have an account? <Link href="/login">Log in</Link>
      </span>
      <Toaster />
    </>
  );
}
