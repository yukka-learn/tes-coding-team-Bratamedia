'use client'

import { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { logout } from '@/app/login/action'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(() => {
      logout()
    })
  }

  return (
    <Button onClick={handleLogout} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Logout'}
    </Button>
  )
}