import { useEffect } from 'react'
import Producto from '../components/Producto'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductosAction } from '../actions/productoActions'

const Productos = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction())
    cargarProductos()
  }, [])

  const productos = useSelector(state => state.productos.productos)
  const error = useSelector(state => state.productos.error)
  const cargando = useSelector(state => state.productos.loading)

  return (
    <>
      <h2 className="text-center my-5 font-weight-bold">Listado de productos</h2>

      {error ? <p className='font-weigh-bold alert alert-danger text-center mt-4'>Hubo un error.</p> : null}
      {cargando ? <p className='text-center'>Cargando...</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th className='text-center' scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
      {
        productos.length ===0 ? (
          <tr>
            <td className='text-center' colSpan="3">Todavía no hay productos.</td>
          </tr>
        ) : (
          productos.map(producto => (
            <Producto 
              key={producto.id}
              producto={producto}
            />
          ))
        )
      }
        </tbody>
      </table>
    </>
  )
}

export default Productos