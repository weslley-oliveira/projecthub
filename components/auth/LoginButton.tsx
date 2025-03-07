'use client'

import { Button } from "@/components/ui/button"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function LoginButton() {
  const supabase = createClientComponentClient()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      console.error('Erro ao fazer login:', error.message)
    }
  }

  return (
    <Button onClick={handleLogin} variant="outline" className="w-full">
      Entrar com Google
    </Button>
  )
} 