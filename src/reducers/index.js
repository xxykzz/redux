// este archivo combina todos los reducers
import { combineReducers } from "redux";
import productosReducer from "./productosReducer";

// creamos el export del combine, cada atributo que definamos puede tener su propio reducer, en este caso el reducer de productos es ProductosReducer
export default combineReducers({
  productos: productosReducer,
});
