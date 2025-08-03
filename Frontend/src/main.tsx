import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider , QueryClient} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store/store'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
            <Provider store={store}>
               <PersistGate loading={null} persistor={persistor}>
                <App />
               </PersistGate>
            </Provider>
     </QueryClientProvider>
  </StrictMode>,
)
