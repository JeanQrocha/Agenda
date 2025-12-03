import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Atendimentos from  "./pages/Clientes/index"
import CreateUser from './pages/Clientes/create'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import { AuthProvider } from './auth/context'
import PrivateRoute from './router/PrivateRoute'
import Home from './pages/Home'
import CriarAtendimento from './pages/CriarAtendimento/criarAtendimento'
import UpdateAtendimento from './pages/EditarAtendimento/updateAtendimento'


function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create/user' element={<CreateUser />} />
        <Route element={<PrivateRoute />}>
          <Route path='/Atendimentos' element={<Atendimentos />} />
          <Route path="/CriarAtendimento" element={<CriarAtendimento />} />
          <Route path="/EditarAtendimento" element={<UpdateAtendimento />} />

        </Route>
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: '50%' }}

      />
      <Footer />
    </AuthProvider>
  )
}

export default App
