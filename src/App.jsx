import { useState } from "react";

const COLORS = [
  { bg: "#fef9c3", border: "#fde047" },
  { bg: "#ffedd5", border: "#fdba74" },
  { bg: "#dcfce7", border: "#86efac" },
  { bg: "#fce7f3", border: "#f9a8d4" },
  { bg: "#e0f2fe", border: "#7dd3fc" },
];

const ROTATIONS = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 2];

function App() {
  const [notas, setNotas] = useState([]);
  const [inputTitulo, setInputTitulo] = useState("");
  const [inputDescripcion, setInputDescripcion] = useState("");
  const [notaEditando, setNotaEditando] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const mostrarModal = () => setModalAbierto(true);

  const cerrarModal = () => {
    setModalAbierto(false);
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
      const copia = [...notas];
      copia[notaEditando] = {
        ...copia[notaEditando],
        titulo: inputTitulo,
        descripcion: inputDescripcion,
      };
      setNotas(copia);
    } else {
      const idx = notas.length;
      setNotas([...notas, {
        titulo: inputTitulo,
        descripcion: inputDescripcion,
        color: COLORS[idx % COLORS.length],
        rotation: ROTATIONS[idx % ROTATIONS.length],
      }]);
    }
    cerrarModal();
  };

  const eliminarTarea = (i) => setNotas(notas.filter((_, idx) => idx !== i));

  const editarTarea = (i) => {
    setInputTitulo(notas[i].titulo);
    setInputDescripcion(notas[i].descripcion);
    setNotaEditando(i);
    mostrarModal();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .font-display { font-family: 'Playfair Display', serif; }
        body { background-color: #d6cfc4; }

        .nota-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          /* Sombra tipo papel pegado: sombra dura debajo + difusa alrededor */
          box-shadow:
            2px 3px 0px rgba(0,0,0,0.08),
            4px 8px 12px rgba(0,0,0,0.18),
            0 1px 2px rgba(0,0,0,0.12);
        }
        .nota-card:hover {
          transform: rotate(0deg) scale(1.03) !important;
          box-shadow:
            3px 5px 0px rgba(0,0,0,0.10),
            6px 14px 20px rgba(0,0,0,0.25),
            0 2px 4px rgba(0,0,0,0.15);
          z-index: 10;
        }

        /* Pin decorativo arriba */
        .nota-card::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #e53e3e, #9b1c1c);
          box-shadow: 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.3);
          z-index: 1;
        }
      `}</style>

      {/* Modal */}
      {modalAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(30,20,10,0.55)" }}
          onClick={(e) => e.target === e.currentTarget && cerrarModal()}
        >
          <div className="w-full max-w-md rounded-2xl shadow-2xl p-8 relative border border-amber-200"
            style={{ backgroundColor: "#faf7f2" }}>
            <button
              onClick={cerrarModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition text-lg"
            >✕</button>

            <h2 className="font-display text-3xl text-stone-800 mb-6">
              {notaEditando !== null ? "Editar nota" : "Nueva nota"}
            </h2>

            <form onSubmit={agregarTarea} className="flex flex-col gap-4">
              <input
                value={inputTitulo}
                onChange={(e) => setInputTitulo(e.target.value)}
                type="text"
                placeholder="Título de la nota"
                maxLength={40}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base transition"
              />
              <textarea
                value={inputDescripcion}
                onChange={(e) => setInputDescripcion(e.target.value)}
                placeholder="Escribe algo... (máx. 700 caracteres)"
                maxLength={700}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base resize-none transition"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-medium text-base transition shadow-sm"
                style={{ backgroundColor: "#f59e0b", color: "#1c1917" }}
              >
                {notaEditando !== null ? "Guardar cambios" : "Crear nota"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Fondo tipo muro/tablero */}
      <div className="min-h-screen px-4 py-10 md:px-10" style={{ backgroundColor: "#d6cfc4" }}>

        {/* Header */}
        <div className="max-w-6xl mx-auto mb-14 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#9c8f82" }}>Mi tablero</p>
            <h1 className="font-display text-4xl md:text-5xl" style={{ color: "#3b2f22" }}>Mis notas</h1>
          </div>
        </div>

        {/* Estado vacío */}
        {notas.length === 0 && (
          <div className="max-w-6xl mx-auto text-center py-24" style={{ color: "#9c8f82" }}>
            <p className="font-display text-2xl mb-1" style={{ color: "#7a6a5a" }}>El tablero está vacío</p>
            <p className="text-sm">Presiona <span className="font-medium">+</span> para pegar tu primera nota</p>
          </div>
        )}

        {/* Grid de notas */}
        <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notas.map((nota, index) => (
            <div
              key={index}
              className="nota-card relative flex flex-col min-h-[200px] rounded-sm p-5 pt-7"
              style={{
                backgroundColor: nota.color.bg,
                borderTop: `3px solid ${nota.color.border}`,
                transform: `rotate(${nota.rotation}deg)`,
              }}
            >
              {/* Acciones */}
              <div className="absolute top-3 right-3 flex gap-1">
                <button
                  onClick={() => editarTarea(index)}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-xs transition"
                  style={{ backgroundColor: "rgba(255,255,255,0.5)", color: "#57534e" }}
                  title="Editar"
                >
                  <i className="fa-solid fa-pen" />
                </button>
                <button
                  onClick={() => eliminarTarea(index)}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-xs transition"
                  style={{ backgroundColor: "rgba(255,255,255,0.5)", color: "#9f7070" }}
                  title="Eliminar"
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>

              <span className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "#a8967a" }}>
                #{String(index + 1).padStart(2, "0")}
              </span>

              <h2 className="font-display text-lg leading-snug mb-2 pr-12" style={{ color: "#3b2f22" }}>
                {nota.titulo}
              </h2>

              {nota.descripcion && (
                <>
                  <hr className="mb-2" style={{ borderColor: `${nota.color.border}99` }} />
                  <p className="text-sm overflow-y-auto max-h-28 leading-relaxed" style={{ color: "#57473a" }}>
                    {nota.descripcion}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Botón flotante */}
      <button
        onClick={mostrarModal}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-white text-2xl shadow-lg flex items-center justify-center transition active:scale-95 z-40"
        style={{ backgroundColor: "#3b2f22" }}
        type="button"
      >+</button>
    </>
  );
}

export default App;