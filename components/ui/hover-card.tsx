import React from 'react'
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type HoverCardProps = React.HTMLAttributes<HTMLDivElement>;

export const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
    ({ className, ...props }, ref) => {
        return (
            <Card
                ref={ref}
                className={cn(
                    "transition-all duration-100 ease-in-out hover:-translate-y-0.5 hover:shadow-lg bg-card",
                    className
                )}
                {...props}
            />
        )
    }
)

HoverCard.displayName = 'HoverCard'