import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['accounts']
        });
    }

    findByPhone(phone: string): Promise<User | null> {
        return this.usersRepository.findOneBy({phone: phone});
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(firstName: string, lastName: string, phone: string) {
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;

        return this.usersRepository.save(user);
    }
}
