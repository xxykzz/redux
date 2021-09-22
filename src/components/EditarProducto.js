import React, { useState, useEffect } from "react";
// dispatch = acciones, selector = state
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";

const EditarProducto = ({ history }) => {
  // utilizar dispatch
  const dispatch = useDispatch();
  // definir un nuevo state de producto
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
  });

  // producto a editar
  const productoAEditar = useSelector(
    (state) => state.productos.productoEditar
  );
  // destructuring
  const { nombre, precio } = producto;

  // llenar el state
  useEffect(() => {
    guardarProducto(productoAEditar);
  }, [productoAEditar]);

  // leer los datos del formulario
  const onChangeFormulario = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const submitEditarProducto = (e) => {
    e.preventDefault();
    dispatch(editarProductoAction(producto));
    history.push("/");
  };

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
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label>Precio del producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del producto"
                  name="precio"
                  value={precio}
                  onChange={onChangeFormulario}
                />
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-3"
                >
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
