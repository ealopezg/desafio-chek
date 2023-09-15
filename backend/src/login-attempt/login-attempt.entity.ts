import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
@Entity()
export class LoginAttempt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @Column()
    deviceId: string;

    @Column({ default: false })
    successfull: boolean;

    @Column({default: false})
    enabled: boolean;

    @ManyToOne(() => User, (user) => user.loginAttempts)
    user: User;

}