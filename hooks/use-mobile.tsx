"use client"

import { useState, useEffect } from "react"

// Custom hook to detect if the device is mobile
export default function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < breakpoint)
      }

      // Initial check
      checkIfMobile()

      // Add event listener for window resize
      window.addEventListener("resize", checkIfMobile)

      // Clean up
      return () => {
        window.removeEventListener("resize", checkIfMobile)
      }
    }
  }, [breakpoint])

  return isMobile
}

