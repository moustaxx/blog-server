import { IResolvers } from 'graphql-tools';
import { ApolloError, ValidationError } from 'apollo-server-core';
import { GraphQLDateTime } from 'graphql-iso-date';
import { validate } from 'class-validator';

import Comment from '../entity/Comment';

type TWhere = {
	id?: string;
	ids?: string[];
	text?: string;
	postSlug?: string;
	author?: string;
};

interface IWhere {
	where: TWhere;
}

const Query = {
	getComments: async (_: any, { where }: IWhere) => {
		if (!where) return Comment.find();
		if (where.ids) return Comment.findByIds(where.ids);
		if (where) return Comment.find({ where: { ...where } });
		return [];
	},
};

const Mutation = {
	addComment: async (_: any, { text, postSlug, author }: Comment) => {
		const comment = Comment.create({
			text,
			postSlug,
			author,
		});
		const errors = await validate(comment);
		if (errors.length) throw new ValidationError(String(errors));
		return comment.save();
	},
	deleteComments: async (_: any, { ids, postSlug }: TWhere) => {
		if (!ids && !postSlug) throw new ValidationError('Please specify ids or post slug');
		const data = ids
			? await Comment.delete([...ids])
			: postSlug && await Comment.delete({ postSlug });
		const howMany = data.affected;
		if (!howMany) throw new ApolloError('Entities not found', '1001');
		return `Successfully deleted ${howMany} comments`;
	},
};

const resolvers = {
	Query,
	Mutation,
	Date: GraphQLDateTime,
} as IResolvers;
export default resolvers;
