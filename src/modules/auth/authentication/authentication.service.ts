import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/schema/users/user.entity';
import { SendDtoReq, SendDtoRes } from './dto/send.dto';
import { ConfirmDtoReq, ConfirmDtoRes } from './dto/confirm.dto';
import { randomBytes } from 'crypto';
import { AuthCode } from 'src/schema/auth_code/auth-code.entity';
import { RefreshDtoRes } from './dto/refresh.dto';
import { encrypt } from 'src/modules/utilities/utilities.cipher';
import { JwtService } from '../services/jwt/jwt.service';
import { UcallerService } from '../services/ucaller/ucaller.service';
import { AuthPayload } from '../services/jwt/interface/jwt.interface';
import { Transactional } from 'src/modules/utilities/transactional.decorator';
import { Response } from 'express';


@Injectable()
export class AuthenticationService {

  @InjectRepository(User)
  private readonly userRep: Repository<User>;

  @InjectRepository(AuthCode)
  private readonly authCodeRep: Repository<AuthCode>;

  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly ucallerService: UcallerService

  @Inject()
  private readonly dataSource: DataSource;

  @Transactional()
  public async sendCode(dto: SendDtoReq): Promise<SendDtoRes> {
    const phone = dto.phone.replace(/\D/g, '');
    const encryptedPhone = encrypt(phone);

    let user = await this.userRep.findOne({
      relationLoadStrategy: 'join',
      relations: { authCode: true },
      where: { phone: encryptedPhone }
    });
    if (user && user.authCode) {
      throw new BadRequestException();
    }
    user ??= await this.userRep.save({
      phone: encryptedPhone,
      isActive: false
    });
    const secrectCode = this.getCryptoCode(4);
    await this.authCodeRep.save({
      code: encrypt(secrectCode),
      user: { id: user.id }
    });
    await this.ucallerService.initCall({
      phone: Number(phone),
      code: Number(secrectCode),
      client: 'test'
    });
    return {
      statusCode: 201
    }
  }

  @Transactional()
  public async confirmCode(res: Response, dto: ConfirmDtoReq): Promise<ConfirmDtoRes> {
    const encryptedCode = encrypt(dto.code);
    const code = await this.authCodeRep.findOne({
      relationLoadStrategy: 'join',
      relations: { user: true },
      where: { code: encryptedCode }
    });
    if (!code) {
      throw new BadRequestException();
    }
    code.user.isActive = true;
    await this.authCodeRep.delete(code.id);
    await this.userRep.save(code.user);
    const { accessToken, refreshToken } = await this.jwtService
      .createJwtTokens(code.user.id);

    this.setRefreshToken(res, refreshToken);
    return { accessToken };
  }

  public async refresh(res: Response, jwt: AuthPayload): Promise<RefreshDtoRes> {
    const { accessToken, refreshToken } = await this.jwtService
      .updateJwtTokens(jwt.userId, jwt.sessionId);

    this.setRefreshToken(res, refreshToken);
    return { accessToken };
  }

  private setRefreshToken(res: Response, token: string): void {
    res.cookie("refreshToken", `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
  }

  private getCryptoCode(codeSize: number): string {
    const min = 0, max = 9;
    const code = Array.from({ length: codeSize }, () => {
      return min + (randomBytes(1).readUInt8(0) % max - min + 1)
    })
    return code.join('');
  }
}