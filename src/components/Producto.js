import React from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// redux
import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from "../actions/productoActions";

const Producto = ({ producto }) => {
  const { id, nombre, precio } = producto;

  // utilizar el hook useDispatch
  const dispatch = useDispatch();
  // habilitamos el history para redireccion
  const history = useHistory();
  // confirmar si desea eliminar el producto
  const confirmarEliminarProducto = (id) => {
    // preguntar al user
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Seguro deseas eliminar este producto?",
        text: "No se podra revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminalo",
        cancelButtonText: "No, no lo elimines!!!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // pasar al action
          dispatch(borrarProductoAction(id));
        }
      });
  };

  // funcion que redirige de una forma programada
  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="actions">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(producto)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
