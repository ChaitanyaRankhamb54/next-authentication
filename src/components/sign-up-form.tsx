"use client"

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { validateRegister } from "../models/registerSchema"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget;
    const formData = {
      username: (form.elements.namedItem("username") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    }

    // Frontend validation with Zod
    const result = validateRegister(formData);

    if (!result.success) {
      // Handle validation errors
      setErrors(result.error.issues.map((err) => err.message));
      return;
    }

    setErrors([]); // Clear previous errors if validation passes

    // Call backend API
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Registration successful:", data);
      router.push("/login");
    } else {
      let errorMessage = "Registration failed";
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // response was empty, fallback message
      }
      setErrors([errorMessage]);
    }

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-[450px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Sign up with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" onClick={() => signIn("github")}>
                  <FaGithub className="size-4" />
                  Sign up with GitHub
                </Button>
                <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
                  <FaGoogle className="size-4" />
                  Sign up with Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    name="username"
                    type="text"
                    placeholder="Your username"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="enter your password"
                    required
                  />
                </div>

                {/* // Show error messages */}
                {errors.length > 0 && (
                  <div className="text-red-500 text-sm space-y-1">
                    {errors.map((err, idx) => (
                      <p key={idx}>{err}</p>
                    ))}
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4 hover:text-indigo-400">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}