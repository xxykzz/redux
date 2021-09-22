import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

// creamos el store
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    // le pasamos la extension para poder utilizar redux dev tools en nuestro proytecto
    // y tambien que no se rompa en navegadores que no lo tengan instalado
    typeof window === "object" &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
