import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router'
import {
  DashboardAnalyticsPage,
  DashboardApplicationsPage,
  DashboardCertificatesPage,
  DashboardExpertsPage,
  DashboardFormsPage,
  DashboardIndexPage,
  DashboardNewApplicationPage,
  DashboardProfilePage,
  DashboardReviewsPage,
} from '@/pages/dashboard'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import { ROUTES } from '@/shared/config'
import { DashboardLayout } from '@/widgets/dashboard-layout'
import { RequireAuth } from './require-auth'

// Marshrut daraxti barcha rollar uchun bitta — sidebar bandlarigina rol
// bo'yicha filtrlanadi (widgets/dashboard-layout/model/menu.ts). Bu yerda
// rolga qarab bloklash qilinmaydi, chunki bu keyingi bosqichga tegishli.
const router = createBrowserRouter([
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.login, element: <LoginPage /> },
  { path: ROUTES.register, element: <RegisterPage /> },
  {
    path: ROUTES.dashboard,
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardIndexPage /> },
      { path: 'certificates', element: <DashboardCertificatesPage /> },
      { path: 'applications/new', element: <DashboardNewApplicationPage /> },
      { path: 'applications', element: <DashboardApplicationsPage /> },
      { path: 'reviews', element: <DashboardReviewsPage /> },
      { path: 'experts', element: <DashboardExpertsPage /> },
      { path: 'forms', element: <DashboardFormsPage /> },
      { path: 'analytics', element: <DashboardAnalyticsPage /> },
      { path: 'profile', element: <DashboardProfilePage /> },
    ],
  },
])

export function RouterProvider() {
  return <ReactRouterProvider router={router} />
}
