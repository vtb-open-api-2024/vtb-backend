import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { User } from 'src/schema/users/user.entity';
import { ActivateDtoReq, CreateDtoReq, CreateDtoRes } from './dto';
import { randomUUID } from 'crypto';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class RegistrationService {

  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  @Inject()
  private readonly jwtService: JwtService;


  public async createAccount(dto: CreateDtoReq): Promise<CreateDtoRes> {
    const isUserExists = await this.usersRepository.findOne({
      select: { id: true },
      where: [{ email: dto.email }],
    });
    if (isUserExists) {
      throw new ConflictException(
        `${dto.email} already exists!`,
      );
    }
    const hashPassword = await hash(dto.password, 3);
    await this.usersRepository.save({
      email: dto.email,
      password: hashPassword,
      activation_link: randomUUID(),
    });

    return true;
  }

  public async activateAccount(dto: ActivateDtoReq): Promise<string> {
    const user = await this.usersRepository.findOne({
      select: { id: true, isActive: true },
      where: { activationLink: dto.activationLink },
    });
    if (!user || user.isActive) {
      throw new BadRequestException();
    }
    user.isActive = true;
    await this.usersRepository.update(user.id, user);
    const tokens = await this.jwtService.createJwtTokens(user.id);
    return '';
  }
}