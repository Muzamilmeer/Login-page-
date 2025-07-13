import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function apiRequest(
  method: "GET" | "POST",
  url: string,
  body?: unknown
) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!res.ok) throw new Error((await res.json()).message || "Request failed");

  return res;
}
