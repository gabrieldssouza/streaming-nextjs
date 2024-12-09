import { gql } from '@apollo/client';

export const GET_POPULAR_MOVIES = `
  query GetMovies($page: Int!) {
    movies(page: $page) {
      id
      title
      release_date
      backdrop_path
      overview
      vote_average
    }
  }
`;

export const GET_TOPRATED_MOVIES = `
  query GetTopRatedMovies($page: Int!) {
    topRatedMovies(page: $page) {
      id
      title
      release_date
      vote_average
      backdrop_path
      overview
    }
  }
`;

export const GET_PLAYING_MOVIES = `
  query GetNowPlayingMovies($page: Int!) {
    nowPlayingMovies(page: $page) {
      id
      title
      release_date
      backdrop_path
      overview
      vote_average
    }
  }
`;

export const GET_UPCOMING_MOVIES = `
  query GetUpcomingMovies($page: Int!) {
    upcomingMovies(page: $page) {
      id
      title
      release_date
      backdrop_path
      overview
      vote_average
    }
  }
`;

export const SEARCH_MOVIES = `
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      title
      release_date
      backdrop_path
      overview
      vote_average
    }
  }
`;