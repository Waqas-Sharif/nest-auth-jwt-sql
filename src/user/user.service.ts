import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const users = this.usersRepository.save(createUserDto);
    if (!users) {
      throw new BadRequestException('Validation failed');
    }
    return users;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    const user = this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Validation failed');
    }
    return user;
  }

  findOneByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Validation failed');
    }
    return user;
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
