/** @format */

// Ilova marshrutlari — yo'llar bitta joyda saqlanadi, <Link to> va router
// konfiguratsiyasi shu qiymatlardan foydalanadi.
// Yo'llarda rol yo'q: qaysi rol qaysi sahifaga kira olishi router'da
// (app/providers/router-provider.tsx) RequireAuth orqali tekshiriladi.
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  certificates: "/certificates",
  newApplication: "/applications/new",
  applications: "/applications",
  reviews: "/reviews",
  experts: "/experts",
  forms: "/forms",
  analytics: "/analytics",
  profile: "/profile",
} as const;
