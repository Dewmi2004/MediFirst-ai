type BadgeVariant = "emergency" | "urgent" | "nonurgent" | "info" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  emergency: "bg-emergency text-white",
  urgent: "bg-urgent text-white",
  nonurgent: "bg-nonurgent text-white",
  info: "bg-info text-white",
  neutral: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100",
};

export function Badge({
  variant = "neutral",
  children,
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
