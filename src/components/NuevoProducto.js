import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// actions de redux
import { crearNuevoProductoAction } from "../actions/productoActions";

const NuevoProducto = ({ history }) => {
  // creamos el state de componente
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  // utilizar useDispatch para ejecutar las acciones
  const dispatch = useDispatch();

  // acceder al state del store
  const loading = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  console.log(loading);

  // enviar a llamar el action de producto action
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  // cuando el usuario hace el submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    // validar
    if (nombre.trim() === "" || precio <= 0) {
      return;
    }

    // revisar errores

    // crear nuevo producto
    agregarProducto({
      nombre,
      precio,
    });

    // redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo producto
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del producto"
                  name="Nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio del producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del producto"
                  name="Nombre"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-3"
                >
                  Agregar
                </button>
              </div>
            </form>
            {loading ? <p>Cargando</p> : null}
            {error ? (
              <p className="alert alert-danger p2 text-center">
                Hubo un error, por favor intenta nuevamente
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
