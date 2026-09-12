import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import { ROUTES } from '@/shared/config'

// Router modul darajasida bir marta yaratiladi — har renderda qayta yaratilmasin.
const router = createBrowserRouter([
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.login, element: <LoginPage /> },
  { path: ROUTES.register, element: <RegisterPage /> },
])

export function RouterProvider() {
  return <ReactRouterProvider router={router} />
}
