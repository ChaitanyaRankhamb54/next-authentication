"use client"

import { Suspense, useState } from "react"
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
import { FaGithub, FaGoogle } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { validateLogin } from "../models/loginSchema"
import { useRouter } from "next/navigation"
import LoadingFallback from "./Loading-Fallback"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false) // 🔹 new state
  const router = useRouter();
  const [email, setEmail] = useState(''); // 🔹 to hold email for loading popup

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = {
      email: (form.email as HTMLInputElement).value,
      password: (form.password as HTMLInputElement).value,
    }

    // ✅ Frontend validation with Zod
    const result = validateLogin(formData)

    if (!result.success) {
      const zodErrors = result.error.issues.map((err) => err.message)
      setErrors(zodErrors)
      return
    }

    setErrors([])
    setEmail(formData.email) // 🔹 set email for loading popup
    setIsLoading(true) // 🔹 show popup before API call

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const data = await res.json()
        console.log("Login successful:", data);
        router.push("/");
      } else {
        const errorData = await res.json()
        setErrors([errorData.message || "Login failed"])
        setIsLoading(false)
      }
    } catch (err) {
      setErrors(["Something went wrong"])
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 relative", className)} {...props}>
      <Card className="w-[450px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("github")}
                >
                  <FaGithub className="size-4" />
                  Login with GitHub
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("google")}
                >
                  <FaGoogle className="size-4" />
                  Login with Google
                </Button>
              </div>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-6">
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {errors.length > 0 && (
                  <div className="text-red-500 text-sm space-y-1">
                    {errors.map((err, i) => (
                      <p key={i}>{err}</p>
                    ))}
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="underline underline-offset-4 hover:text-indigo-400"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 🔹 Loading popup overlay */}
      {isLoading && (
       <LoadingFallback email={email} />
      )}
    </div>
  )
}
