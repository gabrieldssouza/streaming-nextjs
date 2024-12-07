import Image from "next/image";

export default function InitialScreen() {
  return (
    <div className="bg-black flex text-white flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-xl text-center"><strong>SAVEE movies</strong></h1>
      <a href="/home">
      <button className="w-60 mt-12 h-12 text-black text-bold flex items-center justify-around rounded-lg bg-white">Entrar
      </button>
      </a>
    </div>
  );
}
