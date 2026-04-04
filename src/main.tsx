import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import App from './components/App.tsx'
import { ThemeProvider } from './context/ThemeConetxt.tsx'
import { RolesProvider } from './context/RoleContext.tsx'

createRoot(document.getElementById('root')!).render(
      <ThemeProvider>
        <RolesProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </RolesProvider>
      </ThemeProvider>

)
