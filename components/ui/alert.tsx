import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "bg-green-600/10 text-green-300 border-green-500/20 [&>svg]:text-green-400",
        info: "bg-blue-600/10 text-blue-300 border-blue-500/20 [&>svg]:text-blue-400",
        warning: "bg-amber-600/10 text-amber-300 border-amber-500/20 [&>svg]:text-amber-400",
        error: "bg-red-600/10 text-red-300 border-red-500/20 [&>svg]:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type Severity = "success" | "info" | "warning" | "error" | "destructive" | "default"

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { severity?: Severity }
>(({ className, variant, severity, children, ...props }, ref) => {
  const appliedVariant = (severity as any) || variant

  const Icon = (() => {
    switch (appliedVariant) {
      case "success":
        return CheckCircle
      case "info":
        return Info
      case "warning":
        return AlertTriangle
      case "error":
        return XCircle
      case "destructive":
        return XCircle
      default:
        return null
    }
  })()

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant: (appliedVariant as any) }), className)}
      {...props}
    >
      {Icon ? <Icon className="w-5 h-5" /> : null}
      {children}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
