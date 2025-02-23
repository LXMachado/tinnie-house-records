import * as React from "react"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <button
        className={cn("custom-button", variant === "outline" && "custom-button-outline", className)}
        {...props}
        ref={ref}
      >
        <span className="custom-button-content">{children}</span>
      </button>
    )
  },
)
CustomButton.displayName = "CustomButton"

