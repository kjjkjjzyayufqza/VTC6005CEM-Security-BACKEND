import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    // 构造头部，在头部中包含算法
    const header = { alg: 'HS256', typ: 'JWT' };
    // 将头部进行 Base64 编码，然后将其进行加密
    const encryptedHeader = crypto
      .createCipher('aes-256-ecb', process.env.jwtConstants)
      .update(JSON.stringify(header), 'utf8', 'base64');
    // 将有效载荷进行加密
    const encryptedPayload = crypto
      .createCipher('aes-256-ecb', process.env.jwtConstants)
      .update(JSON.stringify(payload), 'utf8', 'base64');
    // 将加密后的头部和有效载荷合并在一起，并签署 JWT 令牌
    const access_token = await this.jwtService.signAsync(
      `${encryptedHeader}.${encryptedPayload}`,
    );
    // 返回 JWT 令牌
    return { access_token };
  }
}
