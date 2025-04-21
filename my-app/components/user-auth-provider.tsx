"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  avatar: string
  role: "admin" | "user"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: () => void
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Simuler la vérification de l'authentification au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Simuler la connexion avec Battle.net
  const login = () => {
    // Dans une implémentation réelle, cela redirigerait vers l'API Battle.net
    // Pour cette démo, nous simulons un utilisateur connecté
    const mockUser: User = {
      id: "bnet-123456",
      name: "JoueurWoW",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "admin",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    router.push("/")
  }

  // Déconnexion
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un UserAuthProvider")
  }
  return context
}
