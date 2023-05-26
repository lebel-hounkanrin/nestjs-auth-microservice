import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

	public async create(entity: RegisterUserDto): Promise<User> {
		const user = await this.getUserByPhoneNumber(entity.phoneNumber);
		if (user) {
			throw new BadRequestException("User already exist with the same params");
		}
		if (entity.password !== entity.confirmPassword) {
			throw new BadRequestException("password didn't match")
		}
		const obj = this.userRepository.create(entity);
		try {
			return await this.userRepository.save(obj as any);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async createUserWithGoogle(userParams:any){
		const existingUser = await this.getUserByGoogleId(userParams.id);
		if(existingUser) return existingUser
		const user = this.userRepository.create();
		user.googleId = userParams.id;
		user.userName = userParams.displayName;
		return this.userRepository.save(user);
	}

	async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
		const user = await this.userRepository
			.createQueryBuilder("user")
			.where("user.phoneNumber = :phoneNumber", { phoneNumber })
			.getOne();
		return user;
	}
	async getUserByFacebookId(userId: string): Promise<User> {
		return this.userRepository.findOneBy({ facebookId: userId })
	}

	async getUserByGoogleId(userId: string): Promise<User> {
		return this.userRepository.findOneBy({ googleId: userId })
	}
}
