import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "../types";

// importamos el cliente axios
import clienteAxios from "../config/axios";
// importamos sweetalert2
import Swal from "sweetalert2";

// funcion que se utilizara en la vista

//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  // agregamos el dispatch al return y el dispatch ejecutara la funcion agregarProducto
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      // insertar en la api
      await clienteAxios.post("/productos", producto);
      // modificar el state
      dispatch(agregarProductoExito(producto));
      // alerta con swal
      Swal.fire("Correcto", "El producto se agrego correctamente", "success");
    } catch (error) {
      console.log("error");
      // modificar el state
      dispatch(agregarProductoError(true));
      // alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error intenta de nuevo",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
});

// si el producto se guarda en la bbdd
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

// si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

// funcion que descarga los productos de la db
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      // llamado a la API
      const respuesta = await clienteAxios.get("/productos");
      console.log(respuesta.data);
      // cambio en el state
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargaProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

// selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());

      // si se elimina mostrar alerta
      Swal.fire(
        "Eliminado",
        "El producto seleccionado se ha eliminado",
        "success"
      );
    } catch (error) {
      dispatch(productoEliminadoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

const productoEliminadoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

// colocar producto en edicion
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

// edita un registro en la API y state
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto(producto));

    try {
      const resultado = await clienteAxios.put(
        `/productos/${producto.id}`,
        producto
      );
      console.log(resultado);
    } catch (error) {}
  };
}

const editarProducto = (producto) => ({
  type: COMENZAR_EDICION_PRODUCTO,
  payload: producto,
});
