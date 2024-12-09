import Image from 'next/image';

const Banner = ({ movie, openModal }: { movie: any, openModal: (movie: any) => void }) => {
  return (
    <section className="relative h-[490px] bg-gray-800 text-white">
      <Image src="/banner.jpg" alt="Banner Deadpool & Wolverine" layout="fill" objectFit="cover" className="opacity-50" />
      <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg mb-6">{movie.overview}</p>
        <button
          className="bg-white hover:scale-105 transition-transform text-black font-bold py-2 px-4 rounded"
          onClick={() => openModal(movie)}
        >
          See More
        </button>
      </div>
    </section>
  );
};

export default Banner;