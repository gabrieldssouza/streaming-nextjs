import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from './Loading';

const MovieList = ({ query, id, movies, openModal, loading: searchLoading }: { query?: string, id?: string, movies?: any[], openModal: (movie: any) => void, loading?: boolean }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>(movies || []);

  useEffect(() => {
    if (movies) {
      setData(movies);
      setLoading(false);
      return;
    }

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

  const filteredData = data.filter((movie: any) => movie.backdrop_path && movie.overview);

  return (
    <div className="flex flex-wrap justify-around gap-4">
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
  );
};

export default MovieList;