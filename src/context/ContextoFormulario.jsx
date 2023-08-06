import React, {useReducer} from "react";

export const ContextoFormulario = React.createContext();

/**
 * Este es el valor inicial de la aplicación, es un objeto.
 */
const initialStatePokemon = {
  entrenador:{
    nombre: "",
    apellido: "",
    email: ""
  },
  nombrePokemon: "",
}

/**
 * Esta función es la que maneja el estado.
 */
const reducerPokemon = (state, action) => {
  switch (action.type) {
    case "AGREGAR_ENTRENADOR":
      return {...state, entrenador: {...state.entrenador, ...action.payload}};
    case "AGREGAR_POKEMON":
      return {...state, nombrePokemon: action.payload};
    default:
      return state;
  }
}

const ProviderFormulario = ({ children }) => {

  const [pokemonState, dispatchPokemon] = useReducer(reducerPokemon, initialStatePokemon);

  const handleInputBlur = (valorInput) => {
    const { campo, valor } = valorInput;
    
    console.log(pokemonState);

    if(campo === "nombrePokemon"){
      dispatchPokemon({type: "AGREGAR_POKEMON", payload: valor});
    }else{
      dispatchPokemon({type: "AGREGAR_ENTRENADOR", payload: {[campo]: valor}});
    }

  };

  return (
    <ContextoFormulario.Provider
      value={{
        pokemonState,
        handleInputBlur,
      }}
    >
      {children}
    </ContextoFormulario.Provider>
  );
};

export default ProviderFormulario;