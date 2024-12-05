import Image from "next/image";

export default function InitialScreen() {
  return (
    <div className="bg-black flex text-white flex-col items-center justify-center w-screen h-screen">
      <img src="logo.png" className="mb-8" alt="" />
      <h1 className="text-xl text-center"><strong>SAVEE movies</strong></h1>
      <a href="/Home">
      <button className="w-60 mt-12 h-12 text-black text-bold flex items-center justify-around rounded-lg bg-white">Entrar
        <img src="Arrow.png" alt="" />
      </button>
      </a>
    </div>
  );
}
