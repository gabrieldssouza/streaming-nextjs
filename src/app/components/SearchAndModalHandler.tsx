import { useState } from 'react';
import MovieModal from './MovieModal';
import { SEARCH_MOVIES } from '../graphql/queries';

const SearchAndModalHandler = ({ children }: { children: (props: any) => JSX.Element }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000', {
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
    }
  };

  return (
    <>
      {children({ searchResults, openModal, handleSearch })}
      <MovieModal movie={selectedMovie} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default SearchAndModalHandler;