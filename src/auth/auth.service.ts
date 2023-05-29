import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto, UserDto } from 'src/users/dto/index.dto'
import { ConfigService } from '@nestjs/config'
import { AuthDto } from './dto/index.dto'
@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn (data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.findByUserEmail(data.email)
    if (!user) {
      throw new BadRequestException('User does not exist')
    }
    if (user.password != data.password) {
      throw new BadRequestException('Password is incorrect')
    }
    const tokens = await this.getTokens(user._id, user.email)
    await this.signUpdateRefreshToken(user._id, tokens.refreshToken)
    return tokens
  }

  async signUp (createUserDto: CreateUserDto) {
    // Check if user exists
    const userExists = await this.usersService.findByUserEmail(
      createUserDto.email,
    )
    if (userExists) {
      throw new BadRequestException('User already exists')
    }
    // Hash password
    const newUser = await this.usersService.create({
      ...createUserDto,
    })

    const tokens = await this.getTokens(newUser._id, newUser.email)
    await this.signUpdateRefreshToken(newUser._id, tokens.refreshToken)
    return tokens
  }

  async logout (userId: string) {
    return this.usersService.update(userId, { refreshToken: null })
  }

  async signUpdateRefreshToken (id: string, refreshToken: string) {
    try {
      await this.usersService.update(id, {
        refreshToken: refreshToken,
      })
    } catch (error) {
      throw new BadRequestException(String(error))
    }
  }

  async updateRefreshToken (refreshToken: string) {
    try {
      const userData: any = await this.jwtService.verifyAsync(refreshToken, {})
      if (userData?.sub) {
        // Check if user exists
        const user = await this.usersService.findById(userData.sub)
        if (!user) {
          throw new BadRequestException('User does not exist')
        }
        const tokens = await this.getTokens(userData?.sub, userData?.email)
        await this.usersService.update(userData?.sub, {
          refreshToken: tokens.refreshToken,
        })
        return tokens
      } else {
        throw new BadRequestException('JWT ERROR')
      }
    } catch (error) {
      throw new BadRequestException(String(error))
    }
  }

  async getTokens (userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '7d',
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
