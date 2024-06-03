import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { editarProductoAction } from "../actions/productoActions";
import { useNavigate } from "react-router-dom";


const EditarProducto = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [producto, setProducto] = useState({
    nombre: '',
    precio: ''
  })


  const productoeditar = useSelector(state => state.productos.productoEditar)
  
  useEffect(()=>{
    setProducto(productoeditar)
  }, [productoeditar])

  const onChangeFormulario = e => {
    setProducto({
      ...producto,
      [e.target.name] : e.target.value
    })
  }

  const { nombre, precio } = productoeditar

  const submitEditarProducto = e => {
    e.preventDefault()

    dispatch(editarProductoAction(producto))
    navigate('/')
  }

  return (
    <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4 font-weight-bold">
            Editar producto
          </h2>
          <form onSubmit={submitEditarProducto}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input 
                type="text" 
                name="nombre"
                id="nombre"
                className="form-control"
                placeholder="Nombre del producto"
                defaultValue={nombre}
                onChange={onChangeFormulario}
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
                defaultValue={precio}
                onChange={onChangeFormulario}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
            >Guardar cambios</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditarProducto