"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { Category } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import useMobile from "@/hooks/use-mobile"
import { DialogTitle } from "@radix-ui/react-dialog"

interface MainNavProps {
  data?: Category[]
  className?: string
}

export const MainNav: React.FC<MainNavProps> = ({
  data = [],
  className,
}) => {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Group routes by parent category if they have subcategories
  const routeGroups = data.reduce(
    (acc, route) => {
      if (route.parentId) {
        const parent = acc.find((r) => r.id === route.parentId)
        if (parent) {
          if (!parent.children) parent.children = []
          parent.children.push(route)
        }
      } else {
        acc.push({ ...route, children: [] })
      }
      return acc
    },
    [] as (Category & { children?: Category[] })[],
  )

  const routes = routeGroups.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}` || pathname.startsWith(`/category/${route.id}/`),
    children: route.children?.map((child) => ({
      href: `/category/${child.id}`,
      label: child.name,
      active: pathname === `/category/${child.id}` || pathname.startsWith(`/category/${child.id}/`),
    })),
  }))

  useEffect(() => {
    if (isOpen) setIsOpen(false)
  }, [pathname])

  if (isMobile) {
    return (
      <div className={cn("relative flex items-center justify-between w-full px-4 py-3", className)}>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center gap-4">
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 p-0 rounded-full transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-expanded={isOpen ? "true" : "false"}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <VisuallyHidden>Toggle menu</VisuallyHidden>
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent side="left" className="w-[85%] pt-14 px-4 bg-white dark:bg-gray-900 shadow-xl">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white mb-6">Menu</DialogTitle>

            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                  pathname === "/"
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                )}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>

              {routes.map((route) => (
                <div key={route.href} className="space-y-1">
                  <Link
                    href={route.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                      route.active
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    )}
                  >
                    <span>{route.label}</span>
                  </Link>

                  {route.children && route.children.length > 0 && (
                    <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1">
                      {route.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2 rounded-lg text-sm transition-all duration-200",
                            child.active
                              ? "text-primary font-medium"
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-8", className)}>
      <nav className="hidden md:flex items-center space-x-1">
        <Link
          href="/"
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative",
            pathname === "/"
              ? "text-primary font-semibold"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
          )}
        >
          Home
        </Link>

        {routes.map((route) => (
          <div key={route.href} className="relative group">
            {route.children && route.children.length > 0 ? (
              <Button
                variant="ghost"
                className={cn(
                  "px-3 py-2 h-auto rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1",
                  route.active
                    ? "text-primary font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
                )}
              >
                {route.label}
              </Button>
            ) : (
              <Link
                href={route.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 block relative",
                  route.active
                    ? "text-primary font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
                )}
              >
                {route.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
