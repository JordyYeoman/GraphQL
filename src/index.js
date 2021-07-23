const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require('../graphql/schema');



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
      }
    },
    Mutation: {
      // Post a Link-Resolver
      post: (parent, args) => {
         const link = {
          id: `link-${idCount++}`,
          description: args.description,
          url: args.url,
        }
        links.push(link)
        return link
      },
      // Update a Link-Resolver
      updateLink: (parent, args) => {
        // Find the link to update
        links.map((index, link) => {
          if(link.id === args.id) {
            return link = {
              id: link.id,
              description: args.description,
              url: args.url
            }
          }
        })
        return link;
      }
    }
  }


// 3
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    })
  ]
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );