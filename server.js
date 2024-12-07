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

  type Series {
    id: ID!
    name: String!
    first_air_date: String
    backdrop_path: String
    overview: String
    vote_average: Float
    genre_ids: [Int]
  }

  type Query {
    movies(page: Int!): [Movie]

    topRatedMovies(page: Int!): [Movie]

    movieDetails(id: ID!): Movie

    popularSeries(page: Int!): [Series]

    seriesDetails(id: ID!): Series
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

    movieDetails: async (_, { id }) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "43b826f946934eb31ff49952154abb88",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar os detalhes do filme.");
      }
    },

    popularSeries: async (_, { page }) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular`,
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
        throw new Error("Erro ao buscar as séries populares.");
      }
    },

    seriesDetails: async (_, { id }) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}`,
          {
            params: {
              api_key: "43b826f946934eb31ff49952154abb88",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar os detalhes da série.");
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