import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from './Loading';

interface Movie {
  id: string;
  title: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
}

interface MovieListProps {
  query?: string;
  id?: string;
  movies?: Movie[];
  openModal: (movie: Movie) => void;
  loading?: boolean;
}

const MovieList = ({ query, id, movies, openModal, loading: searchLoading }: MovieListProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Movie[]>(movies || []);

  useEffect(() => {
    if (movies) {
      setData(movies);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch('https://graphqlserver-beta.vercel.app/', {
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
          setData(result.data.movies || result.data.topRatedMovies || result.data.nowPlayingMovies || result.data.upcomingMovies || []);
        }
      } catch (err) {
        setError('erro ' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, movies]);

  if (loading || searchLoading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  const filteredData = data.filter((movie: Movie) => movie.backdrop_path && movie.overview);

  return (
    <div className={movies ? "flex flex-wrap justify-around gap-4" : "relative group"}>
    <div className={movies ? "flex flex-wrap justify-around gap-4" : "flex overflow-x-scroll space-x-4"} id={id} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {filteredData.map((movie: Movie) => (
        <div key={movie.id} className="relative flex-shrink-0 transform transition-transform duration-300 hover:scale-105">
          <div className="md:hidden" onClick={() => openModal(movie)}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              width={250}
              height={150}
              className="rounded-lg"
            />
          </div>
          <div className="hidden md:block">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              width={250}
              height={150}
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
              <h2 className="text-white text-lg font-bold mb-2">{movie.title}</h2>
              <button className="bg-white text-black py-1 px-3 rounded" onClick={() => openModal(movie)}>See more</button>
            </div>
          </div>
        </div>
      ))}
    </div>
      {!movies && (
        <>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
            onClick={() => id && document.getElementById(id)!.scrollBy({ left: -400, behavior: 'smooth' })}
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
            onClick={() => id && document.getElementById(id)!.scrollBy({ left: 400, behavior: 'smooth' })}
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
        </>
      )}
    </div>
  );
};

export default MovieList;