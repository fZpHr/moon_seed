"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/user-auth-provider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const { user, login, isLoading } = useAuth()
  const router = useRouter()

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user && !isLoading) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>Connectez-vous pour accéder au tableau d'équipement</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button
            onClick={login}
            className="w-full flex items-center justify-center gap-2 bg-[#00AEFF] hover:bg-[#00AEFF]/90"
          >
            <Image
              src="/placeholder.svg?height=24&width=24"
              alt="Battle.net"
              width={24}
              height={24}
              className="rounded-full bg-white p-1"
            />
            Se connecter avec Battle.net
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>Connexion requise pour modifier le tableau</p>
        </CardFooter>
      </Card>
    </div>
  )
}
