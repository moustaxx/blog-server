import fastify from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { createConnection } from 'typeorm';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

const main = async () => {
	const app = fastify();
	const server = new ApolloServer({
		resolvers,
		typeDefs: schema,
		tracing: true,
	});

	app.register(server.createHandler());
	await app.listen(4000);
	await createConnection();
	console.log('🚀 Server ready at: http://localhost:4000/graphql');
};
main();
