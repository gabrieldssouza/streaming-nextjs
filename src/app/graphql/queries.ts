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

export const GET_POPULAR_SERIES = `
  query GetPopularSeries($page: Int!) {
  popularSeries(page: $page) {
    id
    name
    first_air_date
    backdrop_path
    overview
  }
}
`;

export const GET_TOPRATED_MOVIES =  `
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
