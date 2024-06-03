import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Productos from './pages/Productos'
import NuevoProducto from './pages/NuevoProducto'
import EditarProducto from './pages/EditarProducto'

// Redux
import { Provider } from 'react-redux'
import store from './store'

function App() {


  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Productos />} />
          </Route>
          <Route path='/productos/nuevo' element={<Layout />} > 
            <Route index element={<NuevoProducto />}/>
          </Route>
          <Route path='/productos/editar/:id' element={<Layout />} > 
            <Route index element={<EditarProducto />}/>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
