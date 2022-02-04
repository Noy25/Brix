// React
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
// Other
import { routes } from './routes';
// Cmps
import { AppHeader } from './js/cmps/AppHeader';
import { UserMsg } from './js/cmps/UserMsg'
import { Login } from './js/cmps/Login';
// Assets
import 'react-toastify/dist/ReactToastify.css';


export function App() {

  const isLoginShown = useSelector(state => state.systemModule.isLoginShown);

  return <section className="main-app">
    <AppHeader />
    <UserMsg />
    <Routes>
      {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
    </Routes>
    {isLoginShown && <Login />}
  </section>
}