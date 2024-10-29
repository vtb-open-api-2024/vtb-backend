import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/schema/users/user.entity';
import { compare } from 'bcrypt';
import { LoginDtoReq, LoginDtoRes } from './dto';
import { RefreshDtoRes } from './dto/refresh.dto';
import { JwtService } from '../jwt/jwt.service';
import { JwtAuthPayload } from '../jwt/interface/jwt.interface';

@Injectable()
export class AuthenticationService {

  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  @Inject()
  private readonly jwtService: JwtService;

  public async login(dto: LoginDtoReq): Promise<LoginDtoRes> {
    const user = await this.usersRepository.findOne({
      select: { id: true, password: true },
      where: { email: dto.email, isActive: true },
    });
    if (!user) {
      throw new BadRequestException();
    }
    const isPassEquals = await compare(dto.password, user.password);
    if (!isPassEquals) {
      throw new BadRequestException();
    }
    return this.jwtService.createJwtTokens(user.id);
  }

  public async logout(jwt: JwtAuthPayload): Promise<void> {
    await this.jwtService.deleteToken(jwt.userId, jwt.sessionId);
  }

  public async refresh(jwt: JwtAuthPayload): Promise<RefreshDtoRes> {
    return this.jwtService.updateJwtTokens(jwt.userId, jwt.sessionId);
  }
}
