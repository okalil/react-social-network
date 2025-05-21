import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { SignUp } from "./ui/auth/sign-up";
import { Home } from "./ui/home/home";
import { ProtectedRoute } from "./ui/protected-route";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="sign-up" Component={SignUp} />
          <Route Component={ProtectedRoute}>
            <Route index Component={Home} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
