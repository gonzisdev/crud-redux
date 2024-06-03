import {
    AÑADIR_PRODUCTO,
    AÑADIR_PRODUCTO_EXITO,
    AÑADIR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import EditarProducto from '../pages/EditarProducto';

// Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            // insertar en la api
            await clienteAxios.post('/productos', producto)
            
            /// si sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))
            // Alerta
            Swal.fire(
                '¡Genial!',
                'El producto se ha añadido correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error)
            // si hay error cambiar el state
            dispatch(agregarProductoError(true))
            // Alerta de error
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ha ocurrido un error, inténtalo de nuevo.'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AÑADIR_PRODUCTO,
    payload: true
})

const agregarProductoExito = producto => ({
    type: AÑADIR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado => ({
    type: AÑADIR_PRODUCTO_ERROR,
    payload: estado
})

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargarProductosExitosa(respuesta.data))
        } catch (error) {
            console.log(error)
            dispatch(descargarProductosError())
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())

            Swal.fire({
                title: "¡Eliminado!",
                text: "El producto se ha eliminado correctamente.",
                icon: "success"
              });
        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

export function obtenerProductoEditar(producto ) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch(editarProductoExito(producto))
        } catch (error) {
            console.log(error)
            editarProductoError()
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: true
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError= () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})