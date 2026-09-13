type AlertLevel = "emergency" | "urgent" | "nonurgent" | "info";

const levelClasses: Record<AlertLevel, string> = {
  emergency: "border-emergency bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
  urgent: "border-urgent bg-orange-50 text-orange-900 dark:bg-orange-950 dark:text-orange-100",
  nonurgent: "border-nonurgent bg-teal-50 text-teal-900 dark:bg-teal-950 dark:text-teal-100",
  info: "border-info bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
};

const levelLabels: Record<AlertLevel, string> = {
  emergency: "Emergency",
  urgent: "Urgent",
  nonurgent: "Non-urgent",
  info: "Information",
};

interface AlertProps {
  level: AlertLevel;
  children: React.ReactNode;
}

export function Alert({ level, children }: AlertProps) {
  return (
    <div
      role={level === "emergency" ? "alert" : "status"}
      className={`rounded-md border-l-4 p-4 text-sm ${levelClasses[level]}`}
    >
      <p className="font-semibold mb-1">{levelLabels[level]}</p>
      {children}
    </div>
  );
}
