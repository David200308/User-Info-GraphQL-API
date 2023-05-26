import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typeDefs.mjs';
import { resolvers } from './resolvers.mjs';
import { mongoose } from 'mongoose';

async function startServer() {
    const server = new ApolloServer({
        typeDefs, resolvers
    });

    await mongoose.connect('mongodb://localhost:27017/USER', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    server
        .listen({ port: 4000 })
        .then(({url}) => {
            console.log(`Server is running on http://localhost:4000/api${server.graphqlPath}`)
        }).catch(err => {
            console.log(err);
        });
}

startServer();