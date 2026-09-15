/** @format */

import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router";
import {
  DashboardAnalyticsPage,
  DashboardApplicationsPage,
  DashboardCertificateDetailPage,
  DashboardCertificateEditPage,
  DashboardCertificatesPage,
  DashboardExpertsPage,
  DashboardFormsPage,
  DashboardIndexPage,
  DashboardNewApplicationPage,
  DashboardProfilePage,
  DashboardReviewsPage,
} from "@/pages/dashboard";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { ROUTES } from "@/shared/config";
import { DashboardLayout } from "@/widgets/dashboard-layout";
import { RequireAuth } from "./require-auth";

// Kabinet sahifalari bitta yo'lsiz (pathless) layout ostida: tashqi RequireAuth
// faqat kirganlikni tekshiradi, sahifadagi RequireAuth esa rolni — ruxsat
// berilmagan rol o'z bosh sahifasiga (entities/user getRoleHomeRoute) qaytariladi.
// `roles` berilmagan sahifa (profil) barcha rollar uchun ochiq.
// Ruxsatlar sidebar menyusi (widgets/dashboard-layout/model/menu.ts) bilan mos bo'lishi kerak.
const router = createBrowserRouter([
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.login, element: <LoginPage /> },
  { path: ROUTES.register, element: <RegisterPage /> },
  {
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: ROUTES.dashboard,
        element: (
          <RequireAuth roles={["expert", "admin"]}>
            <DashboardIndexPage />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.certificates,
        element: (
          <RequireAuth roles={["candidate"]}>
            <DashboardCertificatesPage />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.certificateDetail,
        element: (
          <RequireAuth roles={["candidate"]}>
            <DashboardCertificateDetailPage />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.certificateEdit,
        element: (
          <RequireAuth roles={["candidate"]}>
            <DashboardCertificateEditPage />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.newApplication,
        element: (
          <RequireAuth roles={["candidate"]}>
            <DashboardNewApplicationPage />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.applications,
        element: (
          <RequireAuth roles={["expert", "admin"]}>
            <DashboardApplicationsPage />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.reviews,
        element: (
          <RequireAuth roles={["expert"]}>
            <DashboardReviewsPage />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.experts,
        element: (
          <RequireAuth roles={["admin"]}>
            <DashboardExpertsPage />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.forms,
        element: (
          <RequireAuth roles={["admin"]}>
            <DashboardFormsPage />
          </RequireAuth>
        ),
      },
      {
        path: ROUTES.analytics,
        element: (
          <RequireAuth roles={["admin"]}>
            <DashboardAnalyticsPage />
          </RequireAuth>
        ),
      },
      { path: ROUTES.profile, element: <DashboardProfilePage /> },
    ],
  },
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
