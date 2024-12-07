import { useEffect, useState } from 'react';
import Image from 'next/image';

const SeriesList = ({ query }: { query: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchSeries = async () => {
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
          setData(result.data.popularSeries);
        }
      } catch (err) {
        setError('erro ' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredData = data.filter((series: any) => series.backdrop_path && series.overview);

  return (
    <div className="relative group">
      <div className="flex overflow-hidden space-x-4" id="series-list">
        {filteredData.map((series: any) => (
          <div key={series.id} className="flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${series.backdrop_path}`}
              alt={series.name}
              width={250}
              height={150}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
        onClick={() => document.getElementById('series-list')!.scrollBy({ left: -400, behavior: 'smooth' })}
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
        onClick={() => document.getElementById('series-list')!.scrollBy({ left: 400, behavior: 'smooth' })}
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
    </div>
  );
};

export default SeriesList;