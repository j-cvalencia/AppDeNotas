import { useState } from "react";
import "./App.css";

function App() {
  const [notas, setNotas] = useState([]); // Para almacenar las notas que se vayan generando

  const mostrarModal = () => {
    document.querySelector('#contenedorformularioParaNotas').style.display = 'flex';
  }

  const cerrarModal = () => {
    document.querySelector('#contenedorformularioParaNotas').style.display = 'none';
  }

  return (
    <>
      <div id="contenedorformularioParaNotas">
        <form id="formularioParaNotas">
          <div id="cerrar" onClick={cerrarModal}>X</div>
          <h1> Agregar Nota:</h1>
          <input type="text" placeholder="Titulo"/>
          <textarea type="text" placeholder="Descripcion"/>
        </form>
      </div>

      <div id="contenedor">
        <button onClick={mostrarModal} id="agregarNota" type="submit">
          +
        </button>

        <div id="contenedorDeNotas">
          
        </div>
      </div>
    </>
  );
}

export default App;
