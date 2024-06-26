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

// Cada reducer tiene su propio state
const inicialState = {
    productos: [],
    error: null,
    loading: false,
    productoEliminar: null,
    productoEditar: null
}

export default function(state = inicialState, action){
    switch (action.type) {
        case AÑADIR_PRODUCTO:
            return {
                ...state,
                loading: action.payload
            }
        
        case AÑADIR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        
        case AÑADIR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: action.payload,
            }

        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }

        case DESCARGA_PRODUCTOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoEliminar: action.payload
            }
        
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoEliminar),
                productoEliminar: null
            }

        case PRODUCTO_ELIMINADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoEditar: action.payload
            }

        case COMENZAR_EDICION_PRODUCTO:
            return {
                ...state,
                loading: action.payload,
            }
            
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                productoEditar: null,
                loading: false,
                productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
            }

        case PRODUCTO_EDITADO_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}