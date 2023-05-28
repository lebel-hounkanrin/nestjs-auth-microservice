import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { SocialMediaUser } from './social-media-user.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(SocialMediaUser) private socialMediaUserRepo: Repository<SocialMediaUser>
		) { }

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

	async createUserWithSocialMedia(userParams:any){
		const { id, displayName, emails, provider } = userParams;
		const existingUser = await this.getSocialMediaUserById(id, provider);
		if(existingUser) return existingUser
		const user = this.socialMediaUserRepo.create();
		user.socialMediaId=id;
		user.email = emails[0].value;
		user.userName = displayName;
		user.provider = provider;
		//user.refreshToken = refreshToken;
		return this.socialMediaUserRepo.save(user);
	}

	async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
		const user = await this.userRepository
			.createQueryBuilder("user")
			.where("user.phoneNumber = :phoneNumber", { phoneNumber })
			.getOne();
		return user;
	}
	async getSocialMediaUserById(userId: string, provider: string): Promise<SocialMediaUser> {
		return this.socialMediaUserRepo.findOneBy([{provider: provider, socialMediaId: userId}])
	}

	async setUserRefreshToken(userId: string, token: string){
		console.log("Got refreshtoken", token)
		this.userRepository.update({id: userId}, {refreshToken: token});
	}

	async getUserWithRefreshToken(token: string){
		//const hashedToken = await hash(token, "secret")
		//console.log(hashedToken);
		return this.userRepository.findOneBy({refreshToken: token})
	}
}
