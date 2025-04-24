function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-5">
      <h1 className="text-4xl text-white text-center">
        Братан, давай сделаем сайт с системой отзывов про кассиров?
      </h1>
      <h2 className="text-xl text-neutral-400">Помнишь, мы хотели?</h2>
      <a href="tel:+380508843693">
        <button className="px-6 py-2 bg-logo text-white outline-0 hover:bg-darker-logo transition duration-200 rounded-sm cursor-pointer font-semibold">
          Погнали попробуем
        </button>
      </a>
      <h3 className="text-sm text-neutral-400">
        <span className="font-semibold">P.S</span> А мне надо проектик в
        портфолио
      </h3>
    </div>
  );
}

export default App;
