import { useState, useCallback } from 'react';
import MovieModal from './MovieModal';
import { SEARCH_MOVIES } from '../graphql/queries';

interface Movie {
  id: string;
  title: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
}

interface SearchAndModalHandlerProps {
  children: (props: {
    searchResults: Movie[];
    openModal: (movie: Movie) => void;
    handleSearch: (query: string) => void;
    loading: boolean;
  }) => JSX.Element;
}

const SearchAndModalHandler = ({ children }: SearchAndModalHandlerProps) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (movie: Movie) => {
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