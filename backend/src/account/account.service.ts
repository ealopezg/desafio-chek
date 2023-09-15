import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { Faker, es } from '@faker-js/faker';
import { User } from 'src/user/user.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) { }

    findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    findOne(id: number): Promise<Account | null> {
        return this.accountRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.accountRepository.delete(id);
    }

    async createForUser(user: User) {
        const faker = new Faker({ locale: [es] });
        let account = new Account();
        account.user = user;
        account.balance = Number(faker.finance.amount(10000, 150000, 0));
        account.number = faker.finance.accountNumber();
        account.type = 'debit';
        await this.accountRepository.save(account);
    }
}
