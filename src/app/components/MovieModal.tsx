import Image from 'next/image';

const MovieModal = ({ movie, isOpen, onClose }: { movie: any, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-gray-900 text-white rounded-lg max-w-3xl w-full overflow-hidden shadow-lg">
        <div className="relative h-64 w-full">
          <Image
            src={movie.title === "Deadpool & Wolverine" ? "https://image.tmdb.org/t/p/w500/dvBCdCohwWbsP5qAaglOXagDMtk.jpg" : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-400 mb-1">
            <span className="font-semibold">Release:</span> {movie.release_date}
          </p>
          <p className="text-gray-400 mb-4">
            <span className="font-semibold">Review:</span> {movie.vote_average}
          </p>
          <p className="leading-relaxed text-gray-300">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;