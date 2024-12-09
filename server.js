const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    release_date: String
    backdrop_path: String
    overview: String
    vote_average: Float
    genre_ids: [Int]
  }

  type Query {
    movies(page: Int!): [Movie]
    topRatedMovies(page: Int!): [Movie]
    nowPlayingMovies(page: Int!): [Movie]
    movieDetails(id: ID!): Movie
    upcomingMovies(page: Int!): [Movie]
    searchMovies(query: String!): [Movie]
  }
`;

const resolvers = {
  Query: {
    movies: async (_, { page }) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular`,
          {
            params: {
              api_key: "43b826f946934eb31ff49952154abb88",
              page,
            },
          }
        );
        return response.data.results;
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar os filmes populares.");
      }
    },
    topRatedMovies: async (_, { page }) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated`,
          {
            params: {
              api_key: "43b826f946934eb31ff49952154abb88",
              page,
            },
          }
        );
        return response.data.results;
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar os filmes mais bem avaliados.");
      }
    },
    nowPlayingMovies: async (_, { page }) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing`,
          {
            params: {
              api_key: "43b826f946934eb31ff49952154abb88",
              page,
            },
          }
        );
        return response.data.results;
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar os filmes em cartaz.");
      }
    },
    upcomingMovies: async (_, { page }) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming`,
          {
            params: {
              api_key: "43b826f946934eb31ff49952154abb88",
              page,
            },
          }
        );
        return response.data.results;
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar os filmes que estão por vir.");
      }
    },
    searchMovies: async (_, { query }) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: "43b826f946934eb31ff49952154abb88",
              query,
            },
          }
        );
        return response.data.results;
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar os filmes.");
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Servidor GraphQL rodando em: ${url}`);
});