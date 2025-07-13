import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/login", {
        email,
        password,
      });
      if (!res.ok) throw new Error("Login failed");
      return res.json();
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      alert("Login failed");
      console.error(error);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-fitness-pink via-fitness-purple to-fitness-blue flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-fitness-dark">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div className="mb-4">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-fitness-accent hover:bg-fitness-purple text-white">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
