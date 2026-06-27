"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp, signIn, signOut, useSession } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [role, setRole] = useState("user");
  const [googleMode, setGoogleMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // detect google login without role
  useEffect(() => {
    if (session?.user && !session?.user?.role) {
      setGoogleMode(true);
    }
  }, [session]);

  // EMAIL SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        role,
      });

      if (res?.error) {
        toast.error(res.error.message || "Signup failed");
        return;
      }

      toast.success("Account created 🎉");

      await signOut();
      router.push("/login");
    } catch {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleSignup = async () => {
    setGoogleLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/register",
      });
    } catch {
      toast.error("Google signup failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  // SAVE ROLE (IMPORTANT FIXED FLOW)
  const saveGoogleRole = async () => {
    try {
      await fetch("/api/user/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      toast.success("Role saved 🎉");

      await signOut();

      router.replace("/login");
    } catch {
      toast.error("Failed to save role");
    }
  };

  return (
  <div className="bg-[#FFF9F5] min-h-screen px-4 pt-8 pb-8 md:flex md:items-center md:justify-center">
  <Card className="w-full max-w-md mx-auto bg-white border border-rose-100 rounded-3xl shadow-xl p-6 sm:p-8">

        <h1 className="text-2xl font-bold text-center">
          Create Account
        </h1>

        {/* GOOGLE ROLE STEP */}
        {googleMode && session?.user ? (
          <div className="space-y-4">

            <p className="text-center">
              Welcome <b>{session.user.name}</b>
            </p>

            <select
              className="w-full p-3 border rounded-xl"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="writer">Writer</option>
            </select>

            <Button
              onPress={saveGoogleRole}
              className="w-full bg-rose-500 text-white"
            >
              Complete Signup
            </Button>

          </div>
        ) : (
          <>
            {/* FORM */}
            <form onSubmit={handleSignup} className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-xl"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="abc@gmail.com"
                className="w-full p-3 border rounded-xl"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded-xl"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-xl"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />

              <select
                className="w-full p-3 border rounded-xl"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="writer">Writer</option>
              </select>

              <Button
                type="submit"
                isLoading={loading}
                className="w-full bg-rose-500 text-white"
              >
                Create Account
              </Button>

            </form>

            <Button
              onPress={handleGoogleSignup}
              isLoading={googleLoading}
              variant="bordered"
              className="w-full mt-3"
            >
              Continue with Google
            </Button>
          </>
        )}

      </Card>
    </div>
  );
}