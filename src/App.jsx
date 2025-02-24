import { useState } from "react";
import "./App.css";

function App() {
  const [notas, setNotas] = useState([]); // Para almacenar las notas que se vayan generando

  const [inputTitulo, setInputTitulo] = useState("");
  const [inputDescripcion, setInputDescripcion] = useState("");

  const mostrarModal = () => {
    document.querySelector("#contenedorformularioParaNotas").style.display =
      "flex";
  };

  const cerrarModal = () => {
    document.querySelector("#contenedorformularioParaNotas").style.display =
      "none";
  };

  const agregarTarea = (e) => {
    e.preventDefault();
    const nuevaNota = {
      titulo: inputTitulo,
      descripcion: inputDescripcion,
    }
    setNotas([...notas, nuevaNota]);

    setInputTitulo('');
    setInputDescripcion('');
    
    cerrarModal();
  };

  return (
    <>
      <div id="contenedorformularioParaNotas">
        <form onSubmit={agregarTarea} id="formularioParaNotas">
          <div id="cerrar" onClick={cerrarModal}>
            X
          </div>
          <h1> Agregar Nota:</h1>
          <input 
            value={inputTitulo} 
            onChange={(e) => setInputTitulo(e.target.value)}
            type="text" 
            placeholder="Titulo" 
          />
          <textarea
            value={inputDescripcion}
            type="text"
            onChange={(e) => setInputDescripcion(e.target.value)}
            placeholder="Descripcion"
          />
          <button id="enviar" type="submit">
            Enviar
          </button>
        </form>
      </div>

      <div id="contenedor">
        <button onClick={mostrarModal} id="agregarNota" type="submit">
          +
        </button>

        <div id="contenedorDeNotas">
          {notas.map((nota,index)=>{
            return (
              <div key={index} className="nota">
                <button className="borrarNota"><i class="fa-solid fa-trash"></i></button>
                <h2>{nota.titulo}</h2>
                <hr />
                <p>{nota.descripcion}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default App;
