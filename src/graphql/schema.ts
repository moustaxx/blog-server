import { gql } from 'apollo-server-fastify';

export default gql`
	scalar Date

	type Comment {
		id: String!
		text: String!
		postSlug: String!
		author: String!
		createdDate: Date!
		updatedDate: Date!
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
