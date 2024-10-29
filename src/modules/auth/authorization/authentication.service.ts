import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/schema/users/user.entity';
import { JwtService } from '../jwt/jwt.service';
import { SendDtoReq, SendDtoRes } from './dto/send.dto';
import { ConfirmDtoReq, ConfirmDtoRes } from './dto/confirm.dto';
import { UcallerService } from '../ucaller/ucaller.service';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { AuthCode } from 'src/schema/auth-code/auth-code.entity';
import { CONFIG_CIPHER } from 'src/config/config.export';


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
    const encryptedPhone = this.encrypt(phone);

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

  private getCryptoCode(codeSize: number): string {
    const min = 0, max = 9;
    const code = Array.from({ length: codeSize }, () => {
      return min + (randomBytes(1).readUInt8(0) % max - min + 1)
    })
    return code.join('');
  }

  private encrypt(str: string) {
    const key = Buffer.from(CONFIG_CIPHER.AES_CIPHER_KEY, "hex");
    const iv = Buffer.from(CONFIG_CIPHER.AES_CIPHER_IV, "hex");
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  private decrypt(str: string) {
    const key = Buffer.from(CONFIG_CIPHER.AES_CIPHER_KEY, "hex")
    const iv = Buffer.from(CONFIG_CIPHER.AES_CIPHER_IV, "hex")
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(str, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
