import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux'
import store from './utils/store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
