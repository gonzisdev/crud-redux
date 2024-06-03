import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

// Redux
import { useDispatch } from "react-redux"
import { borrarProductoAction, obtenerProductoEditar } from "../actions/productoActions"

const Producto = ({producto}) => {

    const { id , nombre, precio } = producto
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const confirmarEliminarProducto = id => {

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Un producto eliminado no se puede recuperar.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, estoy seguro!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(borrarProductoAction(id))
        }
      });
    }

    const redireccionarEdicion = producto => {
      dispatch(obtenerProductoEditar(producto))
      navigate(`/productos/editar/${producto.id}`)
    }

  return (

    <tr>
        <td>{nombre}</td>
        <td><span className="font-weight-bold">${precio}</span></td>
        <td className="acciones text-center">
            <button type="button" className="btn btn-primary mr-2" onClick={() => redireccionarEdicion(producto)}>Editar</button>
            <button type="button" className="btn btn-danger" onClick={() => confirmarEliminarProducto(id)}>Eliminar</button>
        </td>
    </tr>

  )
}

export default Producto