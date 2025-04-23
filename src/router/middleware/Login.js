import { useAuthStore } from '@/store' 

export default function Login(to, from, next) {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.auth 

  if (isAuthenticated) {
    return next({ name: 'home' })
  } else {
    return next() 
  }
}