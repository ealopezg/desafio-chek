import { Account } from 'src/account/account.entity';
import { LoginAttempt } from 'src/login-attempt/login-attempt.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({length: 9,nullable: false,unique: true})
    phone: string;

    @OneToMany(() => Account, (account) => account.user)
    accounts: Account[];

    @OneToMany(() => LoginAttempt, (loginAttempt) => loginAttempt.user)
    loginAttempts: LoginAttempt[];
}