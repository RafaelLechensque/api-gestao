import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Res,
  Render,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.decorator';
import { response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiBody({ type: LoginUserDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginUserDto) {
    return await this.authService.singIn(signInDto.email, signInDto.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Render('forms')
  @ApiBody({
    schema: {
      type: 'object',
      example: { email: 'rafael.lechensque@gmail.com' },
    },
  })
  @Post('forgot-pass')
  sendEmail(@Body() req: { email: string }) {
    return this.authService.sendCode(req.email);
  }

  @Public()
  @ApiParam({
    name: 'token',
    enumName: 'token',
  })
  @ApiBody({
    schema: {
      example: {
        pass: 'string 1',
        repitPass: 'string 2',
      },
    },
  })
  @Patch('reset-password/:token')
  async resetPassword(
    @Body() newPass: { pass: string; repitPass: string },
    @Param('token') token: string,
  ) {
    await this.authService.resetPassbyEmail({ newPass, token });
  }
}
