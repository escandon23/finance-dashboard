import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import App from './components/App.tsx'
import { ThemeProvider } from './context/ThemeConetxt.tsx'
import { RolesProvider } from './context/RoleContext.tsx'
import { TransactionsProvider } from './context/TransactionsContext.tsx'
import { FiltersProvider } from './context/FiltersContext.tsx'

createRoot(document.getElementById('root')!).render(
      <ThemeProvider>
        <RolesProvider>
          <TransactionsProvider>
            <FiltersProvider>
              <App />
            </FiltersProvider>
          </TransactionsProvider>
        </RolesProvider>
      </ThemeProvider>

)
