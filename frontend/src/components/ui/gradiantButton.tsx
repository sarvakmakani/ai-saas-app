import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const GradientButton = ({ 
  children, 
  className, 
  variant = "default",
  size = "default",
  ...props 
}: GradientButtonProps) => {
  return (
    <Button
      className={cn(
        "relative group overflow-hidden",
        variant === "default" && "bg-gradient-to-r from-purple to-indigo hover:from-purple-dark hover:to-indigo-dark text-white",
        variant === "outline" && "border border-purple text-white bg-transparent hover:bg-purple/10",
        variant === "ghost" && "text-white hover:text-purple hover:bg-transparent",
        className
      )}
      size={size}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === "default" && (
        <span className="absolute inset-0 bg-gradient-to-r from-purple-dark to-indigo-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Button>
  );
};

export default GradientButton;