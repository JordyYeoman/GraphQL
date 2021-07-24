const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
      info: String!
      feed: [Link]!
      link(id: ID!): Link
      allPokemon: [Pokemon]!
    }

    type Pokemon {
      id: ID!
      name: String!
      attack: Float!
      defense: Float!
      type: String!
    }

    type Mutation {
      # Post a link
      post(url: String!, description: String!): Link!
      # Update a link
      updateLink(id: ID!, url: String, description: String): Link
      # Delete a link
      deleteLink(id: ID!): String!
    }

    type Link {
      id: ID!
      description: String!
      url: String!
    }

    type Jordy {
      id: ID!
      description: String!
      url: String!
    }
`
