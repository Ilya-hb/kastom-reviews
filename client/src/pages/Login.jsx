export default function Login() {
  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      <div className="rounded border-1 border-neutral-800 bg-neutral-700 gap-4 shadow-xs justify-center shadow-black p-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold mr-3">Login page</h2>
        <input
          type="text"
          name=""
          id=""
          placeholder="Login"
          className="border-black border-1 px-4 py-2 text-xl"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-black border-1 px-4 py-2 text-xl"
        />
        <button
          type="submit"
          className="px-6 py-2 text-xl border-1 border-black cursor-pointer hover:bg-black transition duration-300"
        >
          Submit
        </button>
      </div>

      {/* <Link
        to={"/"}
        className="link"
      >
        Назад
      </Link>
      <Link
        to={"/admin"}
        className="link"
      >
        В админку
      </Link> */}
    </div>
  );
}
