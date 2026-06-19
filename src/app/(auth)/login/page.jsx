"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ================= EMAIL LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn.email({
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        setError(result.error.message || "Invalid credentials");
        toast.error(result.error.message || "Login failed");
        return;
      }

      toast.success("Login successful 🎉");

      // ✅ ROLE BASED REDIRECT (EMAIL ONLY)
      const role = result?.user?.role || "user";

      const routes = {
        admin: "/dashboard/admin",
        writer: "/dashboard/writer",
        user: "/",
      };

      router.replace(routes[role] || "/");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    const toastId = toast.loading("Redirecting to Google...");

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/", // ✅ ALWAYS GO HOME
      });

      toast.dismiss(toastId);
    } catch (error) {
      console.error(error);
      setError("Google login failed");
      toast.error("Google login failed");
      toast.dismiss(toastId);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex items-center justify-center px-4 py-10">

      <Card className="w-full max-w-md bg-white border border-rose-100 rounded-3xl shadow-xl p-6 sm:p-8">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center text-white text-2xl shadow-lg">
            📚
          </div>

          <h1 className="mt-4 text-3xl font-bold text-stone-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-stone-500 text-sm">
            Login to continue your journey
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block mb-2 text-sm font-medium text-stone-700">
              Email Address
            </label>

            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="example@gmail.com"
              className="w-full h-14 px-4 rounded-xl border border-rose-200 bg-white outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 text-sm font-medium text-stone-700">
              Password
            </label>

            <input
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="••••••••"
              className="w-full h-14 px-4 rounded-xl border border-rose-200 bg-white outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold"
          >
            Login
          </Button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-rose-100 flex-1"></div>
          <span className="text-xs text-stone-400 uppercase">OR</span>
          <div className="h-px bg-rose-100 flex-1"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <Button
          variant="bordered"
          isLoading={googleLoading}
          onClick={handleGoogleLogin}
          className="w-full h-14 rounded-xl border-rose-200 text-stone-700"
        >
          Continue with Google
        </Button>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-stone-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-rose-600 hover:text-rose-700"
          >
            Sign Up
          </Link>
        </p>

      </Card>
    </div>
  );
}