import { HomePage } from '@/pages/home'
import { I18nProvider, QueryProvider } from './providers'
import './styles/index.css'

export function App() {
  return (
    <I18nProvider>
      <QueryProvider>
        <HomePage />
      </QueryProvider>
    </I18nProvider>
  )
}
