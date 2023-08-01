//TODO: completar funcionalidad del signup
"use client";
import { FormEventHandler, useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast";
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
    }
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
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <label>
          Confirm password
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
        </label>

        <button type="submit">Sign up</button>
      </form>
      <span>
        Already have an account? <Link href="/login">Log in</Link>
      </span>
      <Toaster />
    </>
  );
}
