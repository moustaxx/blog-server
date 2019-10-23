import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsDefined, Length } from 'class-validator';

@Entity()
class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Length(3, 250)
	@Column()
	text: string;

	@IsDefined()
	@Column()
	postSlug: string;

	@Length(3, 20)
	@Column()
	author: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;
}

export default Comment;
