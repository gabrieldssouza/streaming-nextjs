import { useEffect, useState } from 'react';
import Image from 'next/image';

const MovieList = ({ query, id }: { query: string, id: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            variables: { page: 1 },
          }),
        });

        const result = await response.json();
        if (result.errors) {
          setError(result.errors[0].message);
        } else {
          setData(result.data.movies || result.data.topRatedMovies || []);
        }
      } catch (err) {
        setError('erro ' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredData = data.filter((movie: any) => movie.backdrop_path && movie.overview);

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative group">
      <div className="flex overflow-hidden space-x-4" id={id}>
        {filteredData.map((movie: any) => (
          <div key={movie.id} className="relative flex-shrink-0 transform transition-transform duration-300 hover:scale-105">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              width={250}
              height={150}
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
              <h2 className="text-white text-lg font-bold mb-2">{movie.title}</h2>
              <button className="bg-white text-black py-1 px-3 rounded" onClick={() => openModal(movie)}>Watch</button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
        onClick={() => document.getElementById(id)!.scrollBy({ left: -400, behavior: 'smooth' })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 transition-transform duration-200 hover:scale-125 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
        onClick={() => document.getElementById(id)!.scrollBy({ left: 400, behavior: 'smooth' })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 transition-transform duration-200 hover:scale-125 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black opacity-30 pointer-events-none group-hover:opacity-100 transition-opacity p-3"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black opacity-30 pointer-events-none group-hover:opacity-100 transition-opacity p-3"></div>

      {isModalOpen && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
            <p className="mb-4">{selectedMovie.overview}</p>
            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;