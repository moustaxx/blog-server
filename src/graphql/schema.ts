import { gql } from 'apollo-server-fastify';

export default gql`
	type Comment {
		id: String!
		text: String!
		postSlug: String!
		author: String!
	}

	input Where {
		id: String
		ids: [String!]
		text: String
		postSlug: String
		author: String
	}

	type Query {
		getComments(where: Where): [Comment]!
	}

	type Mutation {
		addComment(text: String! postSlug: String! author: String!): Comment!
		deleteComments(ids: [String!] postSlug: String): String!
	}
`;
