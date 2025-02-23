import * as React from "react"
import { cn } from "@/lib/utils"
import { Button as BaseButton, type ButtonProps } from "@/components/ui/button"

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <BaseButton
        className={cn(
          // Reset base styles
          "rounded-none border-0",
          // Common styles
          "relative h-10 px-4",
          "before:absolute before:inset-0 before:z-0",
          "before:skew-x-[-20deg] before:origin-left",
          // Variant styles
          variant === "default" && [
            "bg-transparent text-white",
            "before:bg-blue-500",
            "hover:before:shadow-[0_0_20px_rgba(0,102,255,0.5)]",
          ],
          variant === "outline" && [
            "bg-transparent text-blue-500",
            "before:border before:border-blue-500",
            "hover:text-blue-400 hover:before:border-blue-400",
            "hover:before:shadow-[0_0_15px_rgba(0,102,255,0.3)]",
          ],
          // Ensure text stays horizontal and above background
          "overflow-hidden",
          className,
        )}
        {...props}
        ref={ref}
      >
        <span className="relative z-10">{children}</span>
      </BaseButton>
    )
  },
)
CustomButton.displayName = "CustomButton"

export { CustomButton }

