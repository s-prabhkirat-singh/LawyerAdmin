import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signin from './pages/SignIn.jsx'
import Landing from './pages/landing.jsx'
import Dashboard from './pages/dashboard.jsx'
import { store, persistor } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'


/*const router = createBrowserRouter([


  {

    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/signin", element: <Signin /> },
      { path: "/dashboard", element: <Dashboard /> }
    ]
  }
])*/
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>

       
          <App />
        

      </React.StrictMode>,
    </PersistGate>

  </Provider>

)
