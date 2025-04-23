import { useAuthStore } from '@/store'

export default function Auth(to, from, next) {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.auth 

  if (isAuthenticated) {
    return next()
  } else {
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  }
}