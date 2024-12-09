import { useState, useCallback } from 'react';
import MovieModal from './MovieModal';
import { SEARCH_MOVIES } from '../graphql/queries';

const SearchAndModalHandler = ({ children }: { children: (props: any) => JSX.Element }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);

    if (!query.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://graphqlserver-beta.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: SEARCH_MOVIES,
          variables: { query },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error(result.errors[0].message);
      } else {
        setSearchResults(result.data.searchMovies || []);
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {children({ searchResults, openModal, handleSearch, loading })}
      <MovieModal movie={selectedMovie} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default SearchAndModalHandler;