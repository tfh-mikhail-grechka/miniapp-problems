import { createRoot } from 'react-dom/client'
import {App} from './App'
import './index.css'
import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider'

createRoot(document.getElementById('root')!).render(
  <MiniKitProvider>
    <App />
  </MiniKitProvider>
)
