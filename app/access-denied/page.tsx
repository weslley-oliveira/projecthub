'use client'

import { Button } from "@/components/ui/button"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function AccessDeniedPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-destructive">Acesso Negado</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Você não tem permissão para acessar o dashboard.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Entre em contato com o administrador para solicitar acesso.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>
      </div>
    </div>
  )
} 