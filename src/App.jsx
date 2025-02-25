import { useState } from "react";
import "./App.css";

function App() {
  const [notas, setNotas] = useState([]); // Para almacenar las notas que se vayan generando

  const [inputTitulo, setInputTitulo] = useState(""); //Para almacenar el titulo de la nota y controlar el input
  const [inputDescripcion, setInputDescripcion] = useState("");

  const mostrarModal = () => {
    document.querySelector("#contenedorformularioParaNotas").style.display ="flex";
  };

  const cerrarModal = () => {
    document.querySelector("#contenedorformularioParaNotas").style.display ="none";
  };

  //Se crea un objeto para agregarlo al state de notas, luego se borran los input y se cierra el modal
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

  //Se obtiene el index de la nota, luego se filtran las notas y se actualiza el state de notas para renderizar de nuevo
  const eliminarTarea = (e) => {
    const indexAEliminar = parseInt(e.target.closest(".nota").dataset.index);
    const notasFiltradas = notas.filter((_, index) => index !== indexAEliminar);
    setNotas(notasFiltradas);
  }

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
            maxLength={40} 
          />
          <textarea
            value={inputDescripcion}
            type="text"
            onChange={(e) => setInputDescripcion(e.target.value)}
            placeholder="Descripcion...(Limite de 700 caracteres)"
            maxLength={700}
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
              <div key={index} className="nota" data-index={index}>
                <button onClick={eliminarTarea} className="borrarNota"><i class="fa-solid fa-trash"></i></button>
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
