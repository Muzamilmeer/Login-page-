import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";

function AuthenticatedRoutes() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) return null;
      return res.json();
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-fitness-pink via-fitness-purple to-fitness-blue">
        Loading...
      </div>
    );
  }

  return (
    <Switch>
      {user ? (
        <>
          <Route path="/" component={HomePage} />
          <Route path="/login" component={() => { window.location.href = "/"; return null; }} />
        </>
      ) : (
        <>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={LoginPage} />
        </>
      )}
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthenticatedRoutes />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

          
