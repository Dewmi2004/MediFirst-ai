import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Placeholder auth check — real implementation lands in Part 25-28.
// Deliberately fails "closed" (treats user as logged out) until real auth exists.
function useAuthPlaceholder() {
  return { isAuthenticated: false, role: "USER" as const };
}

export function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole?: "ADMIN";
}) {
  const { isAuthenticated, role } = useAuthPlaceholder();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
