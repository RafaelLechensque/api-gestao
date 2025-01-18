import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  RequestTimeoutException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { promises as fs } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';
import { jwtConstants } from './constants';

interface ResetPassEmail {
  token: string;
  newPass: {
    pass: string;
    repitPass: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

  async singIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.name,
      type: user.typeUser.type,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async sendCode(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('usuario nao encontrado');
    }

    const token = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '1d' },
    );

    const templatePath = join(
      __dirname,
      '../../',
      'templates',
      'email-template.html',
    );
    const templateSource = await fs.readFile(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);

    const templateData = {
      mensagem: `token: ${token} \n email: ${email}`,
      reset_link: `http://localhost:3000/auth/${token}/?email=${email}`,
    };

    const mailContent = template(templateData);

    await this.mailService.sendMail({
      to: email,
      from: 'Suport@mail.com',
      subject: 'Link para alterar a senha',
      // html: `<h3 style="color: red">${mensagem}</h3>`,
      html: mailContent,
    });
  }

  async resetPassbyEmail({ token, newPass }: ResetPassEmail) {
    const { sub } = await this.jwtService
      .verifyAsync(token, {
        secret: jwtConstants.secret,
      })
      .catch((err) => {
        throw new RequestTimeoutException('token expirado');
      });

    if (newPass.pass !== newPass.repitPass)
      throw new BadRequestException('senhas nao confere');

    return this.usersService.update(sub, { password: newPass.pass });
  }
}
