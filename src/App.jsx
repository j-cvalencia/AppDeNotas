import { useState } from "react";
import "./index.css";

function App() {
  const [notas, setNotas] = useState([]);
  const [inputTitulo, setInputTitulo] = useState("");
  const [inputDescripcion, setInputDescripcion] = useState("");
  const [notaEditando, setNotaEditando] = useState(null); 

  const mostrarModal = () => {
    document.querySelector("#contenedorformularioParaNotas").style.display =
      "flex";
  };

  const cerrarModal = () => {
    document.querySelector("#contenedorformularioParaNotas").style.display =
      "none";
    setNotaEditando(null);
    setInputTitulo("");
    setInputDescripcion("");
  };

  const agregarTarea = (e) => {
    e.preventDefault();

    if (inputTitulo.trim() === "") {
      alert("La nota debe tener un título");
      return;
    }

    if (notaEditando !== null) {
      const notasActualizadas = [...notas];
      notasActualizadas[notaEditando] = {
        titulo: inputTitulo,
        descripcion: inputDescripcion,
      };
      setNotas(notasActualizadas);
    } else {
      const nuevaNota = {
        titulo: inputTitulo,
        descripcion: inputDescripcion,
      };
      setNotas([...notas, nuevaNota]);
    }

    cerrarModal();
  };

  const eliminarTarea = (indexAEliminar) => {
    const notasFiltradas = notas.filter((_, index) => index !== indexAEliminar);
    setNotas(notasFiltradas);
  };

  const editarTarea = (index) => {
    setInputTitulo(notas[index].titulo);
    setInputDescripcion(notas[index].descripcion);
    setNotaEditando(index);
    mostrarModal();
  };

  return (
    <>
      <div
        id="contenedorformularioParaNotas"
        className="fixed inset-0 bg-black/50 hidden justify-center items-center z-10 p-4"
      >
        <form
          onSubmit={agregarTarea}
          id="formularioParaNotas"
          className="flex flex-col gap-4 justify-around bg-white w-full max-w-lg h-[80%] md:h-auto p-6 text-center rounded-2xl relative"
        >
          <div
            className="w-8 h-8 flex items-center justify-center text-2xl absolute top-2 right-2 cursor-pointer text-red-800"
            onClick={cerrarModal}
          >
            ✕
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {notaEditando !== null ? "Editar Nota" : "Agregar Nota"}
          </h1>
          <input
            className="text-base sm:text-lg md:text-xl p-2 border border-gray-400 rounded-md"
            value={inputTitulo}
            onChange={(e) => setInputTitulo(e.target.value)}
            type="text"
            placeholder="Título"
            maxLength={40}
          />
          <textarea
            className="h-40 resize-none text-base sm:text-lg md:text-xl p-2 border border-gray-400 rounded-md"
            value={inputDescripcion}
            onChange={(e) => setInputDescripcion(e.target.value)}
            placeholder="Descripción...(máx. 700 caracteres)"
            maxLength={700}
          />
          <button
            className="p-2 text-base sm:text-lg md:text-xl cursor-pointer bg-amber-400 rounded-md shadow-md hover:bg-amber-500 transition"
            type="submit"
          >
            {notaEditando !== null ? "Guardar Cambios" : "Enviar"}
          </button>
        </form>
      </div>

      <div
        id="contenedor"
        className="w-full min-h-screen p-4 md:p-8 bg-gray-50"
      >
        <button
          onClick={mostrarModal}
          className="fixed bottom-6 right-6 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-full border border-black text-3xl md:text-5xl cursor-pointer bg-white hover:bg-gray-200 shadow-md z-5"
          type="button"
        >
          +
        </button>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notas.map((nota, index) => {
            return (
              <div
                key={index}
                className="bg-[orange] w-full h-60 sm:h-72 p-4 shadow-[1px_5px_7px_black] rounded-lg relative"
              >
                <button
                  onClick={() => eliminarTarea(index)}
                  className="absolute top-2 right-2 w-6 h-6 flex justify-center items-center text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button
                  onClick={() => editarTarea(index)}
                  className="absolute top-2 right-8 w-6 h-6 flex justify-center items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <i className="fa-solid fa-pen"></i>
                </button>

                <h2 className="font-bold text-base sm:text-lg md:text-xl">
                  {nota.titulo}
                </h2>
                <hr className="my-2 border-black/30" />
                <p className="text-xs sm:text-sm md:text-base lg:text-lg overflow-y-auto max-h-40">
                  {nota.descripcion}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
