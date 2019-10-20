import fastify from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { createConnection } from 'typeorm';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

const port = Number(process.env.PORT) || 4000;

const main = async () => {
	const app = fastify();
	const server = new ApolloServer({
		resolvers,
		typeDefs: schema,
		introspection: true,
		tracing: true,
	});

	app.register(server.createHandler());
	await app.listen(port, '0.0.0.0');
	await createConnection();
	console.log(`🚀 Server ready at: http://localhost:${port}/graphql`);
};
main();
