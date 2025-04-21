"use client"

import EquipmentTable from "@/components/equipment-table"
import { useAuth } from "@/components/user-auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  // const { user, isLoading } = useAuth()
  // const router = useRouter()

  // // Rediriger vers la page de connexion si non connecté
  // useEffect(() => {
  //   if (!user && !isLoading) {
  //     router.push("/login")
  //   }
  // }, [user, isLoading, router])

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  //     </div>
  //   )
  // }

  // if (!user) {
  //   return null // Ne rien afficher pendant la redirection
  // }

  return (
    <div className="container mx-auto py-8 px-4">
      <EquipmentTable />
    </div>
  )
}
