import { LoginButton } from "@/components/auth/LoginButton"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Bem-vindo</h2>
          <p className="mt-2 text-gray-600">
            Faça login para acessar sua conta
          </p>
        </div>
        <div className="mt-8">
          <LoginButton />
        </div>
      </div>
    </div>
  )
} 