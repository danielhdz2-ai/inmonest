import { createClient } from '@/lib/supabase/server'
import NavbarUI from './Navbar'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Navbar() {
  let isLoggedIn = false
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    isLoggedIn = !!user
  } catch {
    isLoggedIn = false
  }
  return <NavbarUI isLoggedIn={isLoggedIn} />
}
