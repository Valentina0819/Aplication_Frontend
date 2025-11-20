import React from 'react'

// Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))

// Login / Register (si planeas usarlos)
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

//RUTA
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))

//Users
const Users = React.lazy(() => import('./views/users/users'))

//RUTAS

//Inicio

const Inicio = React.lazy(() => import ('./views/Inicio/Inicio'))

// Gestión Administrativa

const Products = React.lazy(() => import('./views/Products/Products'))

//Recursos Humanos RRHH

const Pedidos = React.lazy(() => import('./views/Pedidos/Pedidos'))

//Reportes y Estadísticas

const Reports = React.lazy(() => import('./views/Reportes/Reports'))


//FIN RUTAS AGG


const routes = [
  // Página principal
  { path: '/', exact: true, name: 'Home' },

  // Dashboard
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // Base (Gestión de Contenido)
  { path: '/base/tabs', name: 'Tabs', element: Tabs },

  // Login y Register
  { path: '/login', name: 'Login', element: Login },
  { path: '/register', name: 'Register', element: Register },
  //RUTA
  {path: '/buttons/buttons', name: 'Buttons', element: Buttons},
  //Users
  {path: '/users', name: 'Users', element: Users},

  //RUTAS
  {path: '/Inicio', name: 'Inicio', element: Inicio},
  {path: '/Products', name: 'Products', element: Products}, // Gestión Administrativa
  {path: '/Pedidos', name: 'Pedidos', element: Pedidos}, // Recursos Humanos RRHH
  {path: '/Reports', name: 'Reports', element: Reports} // Reportes y Estadísticas
  //FIN RUTAS AGG





]

export default routes
