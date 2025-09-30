"use client"

import * as React from "react"
import { Moon, Sun, Sunrise } from 'lucide-react'
import { useTheme, type Theme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TagManagerEvent } from "@/src/lib/tag-manager-events"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    const skyGradient = "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"

    const handleThemeChange = (newTheme: string) => {
        const previousTheme = theme
        setTheme(newTheme as Theme)
        
        TagManagerEvent({
            event: 'theme changed',
            theme: newTheme,
            previousTheme: previousTheme
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className={`relative overflow-hidden ${theme === 'sky' ? skyGradient : ''}`}
                >
                    <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${
                        theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
                    }`} />
                    <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                        theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
                    }`} />
                    <Sunrise className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                        theme === 'sky' ? 'rotate-0 scale-100 text-white' : 'rotate-90 scale-0'
                    }`} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("sky")}>
                    <Sunrise className="mr-2 h-4 w-4" />
                    <span>Sky</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}