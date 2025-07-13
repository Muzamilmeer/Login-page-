import { useQuery } from "@tanstack/react-query";
import { Dumbbell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

export default function HomePage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/auth/me");
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    },
  });

  const handleLogout = async () => {
    await apiRequest("POST", "/api/auth/logout", {});
    window.location.href = "/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fitness-pink via-fitness-purple to-fitness-blue text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-fitness-pink via-fitness-purple to-fitness-blue text-white">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <Dumbbell className="w-10 h-10 text-white" />
          <h1 className="text-3xl font-bold">FITNESS Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <p>Welcome, {user?.email}</p>
          <Button
            onClick={handleLogout}
            className="bg-white/20 border border-white hover:bg-white/30 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/20 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Total Members</h2>
          <p className="text-4xl font-bold">1234</p>
        </div>
        <div className="p-6 bg-white/20 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Revenue</h2>
          <p className="text-4xl font-bold">$45,000</p>
        </div>
      </div>
    </div>
  );
      }
