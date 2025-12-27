"use client";

interface ToastProps {
  title: string;
  description?: string;
  variant?: "success" | "destructive" | "default";
}

export const Toast = ({
  title,
  description,
  variant = "default",
}: ToastProps) => {
  let bg = "bg-white text-black border";
  if (variant === "success") bg = "bg-green-600 text-white";
  if (variant === "destructive") bg = "bg-red-600 text-white";

  return (
    <div
      className={`
        w-full sm:w-[320px]
        p-4 rounded-lg shadow-lg
        ${bg}
      `}
    >
      <div className="font-semibold">{title}</div>
      {description && (
        <div className="text-sm mt-1 opacity-90">{description}</div>
      )}
    </div>
  );
};
