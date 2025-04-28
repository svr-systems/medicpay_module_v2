import { useAuthStore } from "@/store";

export default function Public(to, from, next) {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.auth;

  if (isAuthenticated) {
    return next({ name: "module/consultations" });
  } else {
    return next();
  }
}
