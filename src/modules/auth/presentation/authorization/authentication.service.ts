import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/schema/users/user.entity';
import { SendDtoReq, SendDtoRes } from './dto/send.dto';
import { ConfirmDtoReq, ConfirmDtoRes } from './dto/confirm.dto';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { AuthCode } from 'src/schema/auth_code/auth-code.entity';
import { CONFIG_CIPHER } from 'src/config/config.export';
import { UcallerService } from '../../services/ucaller/ucaller.service';
import { JwtService } from '../../services/jwt/jwt.service';
import { AuthPayload } from '../../services/jwt/interface/jwt.interface';
import { RefreshDtoRes } from './dto/refresh.dto';
import { encrypt } from 'src/modules/utilities/utilities.cipher';


@Injectable()
export class AuthorizationService {

  @InjectRepository(User)
  private readonly userRep: Repository<User>;

  @InjectRepository(AuthCode)
  private readonly authCodeRep: Repository<AuthCode>;

  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly ucallerService: UcallerService

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
      code: this.encrypt(secrectCode),
      user: { id: user.id }
    });
    // await this.ucallerService.initCall({
    //   phone: Number(phone),
    //   code: Number(secrectCode),
    //   client: 'test'
    // });
    return {
      statusCode: 201
    }
  }
  encrypt(secrectCode: string): any {
    throw new Error('Method not implemented.');
  }

  public async confirmCode(dto: ConfirmDtoReq): Promise<ConfirmDtoRes> {
    const encryptedCode = this.encrypt(dto.code);
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
    return this.jwtService.createJwtTokens(code.user.id);
  }

  public async refresh(jwt: AuthPayload): Promise<RefreshDtoRes> {
    return this.jwtService.updateJwtTokens(jwt.userId, jwt.sessionId);
  }

  private getCryptoCode(codeSize: number): string {
    const min = 0, max = 9;
    const code = Array.from({ length: codeSize }, () => {
      return min + (randomBytes(1).readUInt8(0) % max - min + 1)
    })
    return code.join('');
  }
}