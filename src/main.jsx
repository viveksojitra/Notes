import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/fonts.css'
import './App.css'
import './styles/login.css'
import './styles/signUp.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)