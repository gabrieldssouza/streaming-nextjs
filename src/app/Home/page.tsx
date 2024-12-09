"use client";

import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
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
      {({ searchResults, openModal, handleSearch, loading }) => (
        <div>
          <Header onSearch={handleSearch} />
          {searchResults.length === 0 ? (
            <>
              <Banner movie={bannerMovie} openModal={openModal} />
              <div className="mx-auto px-4 mb-4">
                <h1 className="text-xl font-bold mt-2 mb-2">Popular Movies</h1>
                <MovieList query={GET_POPULAR_MOVIES} id="popular-list" openModal={openModal} />
                <h1 className="text-xl font-bold mt-2 mb-2">Top Rated Movies</h1>
                <MovieList query={GET_TOPRATED_MOVIES} id="rated-list" openModal={openModal} />
                <h1 className="text-xl font-bold mt-2 mb-2">Upcoming Movies</h1>
                <MovieList query={GET_UPCOMING_MOVIES} id="coming-list" openModal={openModal} />
                <h1 className="text-xl font-bold mt-2 mb-2">Now Playing Movies</h1>
                <MovieList query={GET_PLAYING_MOVIES} id="playing-list" openModal={openModal} />
                <Footer />
              </div>
            </>
          ) : ( 
            <div className="mx-auto px-4">
              <div className="flex row">
                <button onClick={() => window.location.href = '/home'} className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-2 mt-[-3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-xl font-bold ml-5 mb-4">Search Results</h1>
              </div>
              <MovieList movies={searchResults} openModal={openModal} loading={loading} />
              <Footer />
            </div>
          )}
        </div>
      )}
    </SearchAndModalHandler>
  );
}