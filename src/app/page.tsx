import Image from "next/image";

export default function InitialScreen() {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-screen h-screen text-white"
      style={{
        backgroundImage: "url('https://www.nexofin.com/archivos/2020/04/series-netflix.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center">
        <Image src="/saveemovies.png" alt="Logo" width={250} height={100} />
        <a href="/Home">
          <button className="w-60 mt-8 h-12 text-black font-bold flex items-center justify-center rounded-lg bg-white hover:bg-gray-200 transition duration-300">
            Entrar
          </button>
        </a>
      </div>
    </div>
  );
}
