"use client";

import MovieList from '../components/MovieList';
import SeriesList from '../components/SeriesList';
import { GET_POPULAR_MOVIES } from '../graphql/queries';
import { GET_POPULAR_SERIES } from '../graphql/queries';
import { GET_TOPRATED_MOVIES } from '../graphql/queries';

export default function Home() {
  return (
    <div className="mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Top Movies</h1>
      <MovieList query={GET_POPULAR_MOVIES} id="popular-list" />
      <h1 className="text-3xl font-bold mb-4">Top TV Shows</h1>
      <SeriesList query={GET_POPULAR_SERIES} />
      <h1 className="text-3xl font-bold mb-4">Top Rated Movies</h1>
      <MovieList query={GET_TOPRATED_MOVIES} id="rated-list" />
    </div>
    
  );
}