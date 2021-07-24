const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require('../graphql/schema');
const { PrismaClient } = require('@prisma/client')

let allPokemon = [
  {
    id: 'Pokemon-01',
    name: 'Charmander',
    attack: 50.2,
    defense: 20.1,
    type: 'fire'
  },
  {
    id: 'Pokemon-02',
    name: 'Squirtle',
    attack: 30.2,
    defense: 60.1,
    type: 'water'
  }
];

// 2.1
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },{
    id: 'jordy',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },{
    id: 'yeoman-3',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },{
    id: 'meth',
    url: 'www.jordyyeoman.com',
    description: 'Fullstack tutorial on being an absolute legend!'
  }
]

  // Rudimentary way of generating a new unique ID for each new link created
  let idCount = links.length


// Here are my resolvers boy-o
const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      // 2.2
      feed: () => links,
      // Finds a link by specific ID and returns it. 
      link: (parent, args, context, info) => {
        return links.find(link => link.id === args.id)
      },
      allPokemon: () => allPokemon,
    },
    Mutation: {
      // Post a Link
      post: (parent, args) => {
         const link = {
          id: `link-${idCount++}`,
          description: args.description,
          url: args.url,
        }
        links.push(link)
        return link
      },
      // Update a Link
      updateLink: (parent, args) => {  
        // Find the link index to update
        linkIndex = links.findIndex((link => link.id === args.id));
        // new link object, spread the current obj and update the required values 
        const updatedLink = {
          ...links[linkIndex],
          url: args.url,
          description: args.description,
        }
        //Update object's name property.
        links[linkIndex] = updatedLink;
        return updatedLink;
      },
      // Delete a Link
      deleteLink: (parent, args) => {
        // Update the links array with the new filtered links array
        links = links.filter(link => link.id !== args.id);
        return `The link with ID: - ${args.id} - has been deleted`;
      },
  }
}


const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    })
  ],
  context: {
    prisma,
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );