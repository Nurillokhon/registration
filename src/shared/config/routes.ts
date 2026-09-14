// Ilova marshrutlari — yo'llar bitta joyda saqlanadi, <Link to> va router
// konfiguratsiyasi shu qiymatlardan foydalanadi.
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  dashboardCertificates: '/dashboard/certificates',
  dashboardApplicationsNew: '/dashboard/applications/new',
  dashboardApplications: '/dashboard/applications',
  dashboardReviews: '/dashboard/reviews',
  dashboardExperts: '/dashboard/experts',
  dashboardForms: '/dashboard/forms',
  dashboardAnalytics: '/dashboard/analytics',
  dashboardProfile: '/dashboard/profile',
} as const
