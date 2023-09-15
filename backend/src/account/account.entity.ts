import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    type: string;

    @Column()
    balance: number;

    @ManyToOne(() => User, (user) => user.accounts)
    user: User;

}