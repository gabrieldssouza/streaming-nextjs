"use client";

import Header from '../components/Header';
import Banner from '../components/Banner';
import MovieList from '../components/MovieList';
import SearchAndModalHandler from '../components/SearchAndModalHandler';
import { GET_POPULAR_MOVIES, GET_TOPRATED_MOVIES, GET_PLAYING_MOVIES, GET_UPCOMING_MOVIES } from '../graphql/queries';

export default function Home() {
  const bannerMovie = {
    title: "Deadpool & Wolverine",
    overview: "An epic adventure of two iconic characters teaming up for the first time.",
    backdrop_path: "/dvBCdCohwWbsP5qAaglOXagDMtk.jpg",
    release_date: "2023-12-25",
    vote_average: 8.5,
  };

  return (
    <SearchAndModalHandler>
      {({ searchResults, openModal, handleSearch }) => (
        <div>
          <Header onSearch={handleSearch} />
          {searchResults.length === 0 ? (
            <>
              <Banner movie={bannerMovie} openModal={openModal} />
              <div className="mx-auto px-4">
                <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
                <MovieList query={GET_POPULAR_MOVIES} id="popular-list" openModal={openModal} />
                <h1 className="text-2xl font-bold mb-4">Top Rated Movies</h1>
                <MovieList query={GET_TOPRATED_MOVIES} id="rated-list" openModal={openModal} />
                <h1 className="text-2xl font-bold mb-4">Upcoming Movies</h1>
                <MovieList query={GET_UPCOMING_MOVIES} id="coming-list" openModal={openModal} />
                <h1 className="text-2xl font-bold mb-4">Now Playing Movies</h1>
                <MovieList query={GET_PLAYING_MOVIES} id="playing-list" openModal={openModal} />
              </div>
            </>
          ) : (
            <div className="mx-auto px-4">
              <h1 className="text-3xl font-bold mb-4">Search Results</h1>
              <MovieList movies={searchResults} openModal={openModal} />
            </div>
          )}
        </div>
      )}
    </SearchAndModalHandler>
  );
}