import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions'
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions'


const NuevoProducto = ({history}) => {

  // state del componente
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)
  const navigate = useNavigate()
  
  // utilizar usedispatch y te crea una funcion
  const dispatch = useDispatch()

  // acceder al state del store
  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta)

  // llamar el action de productoAction
  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))
    

  // Cuando el usuario haga submit
  const submitNuevoProducto = e => {
    e.preventDefault()

    // validar
    if (nombre.trim() === '' || precio <= 0) {
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch(mostrarAlerta(alerta))
      return
    }

    // si no hay errores
    dispatch(ocultarAlertaAction())
    
    // crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    })

    // redireccionar
    
    navigate('/')
  }
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Añade un nuevo producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form
              onSubmit={submitNuevoProducto}
            >
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input 
                  type="text" 
                  name="nombre"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre del producto"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio:</label>
                <input 
                  type="number" 
                  name="precio"
                  id="precio"
                  className="form-control"
                  placeholder="Precio del producto"
                  value={precio}
                  onChange={e => setPrecio(Number(e.target.value))}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >Añadir</button>
            </form>
            { cargando ? <p>Cargando...</p> : null }
            { error ? <p className='alert alert-danger p2 mt-4 text-center'>¡Ha ocurrido un error!</p> : null }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto