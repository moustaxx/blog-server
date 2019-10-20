import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	text: string;

	@Column()
	postSlug: string;

	@Column()
	author: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;
}

export default Comment;
