import {
  Body,
  Controller,
  Post,
  Provide,
  Inject,
  ALL,
} from '@midwayjs/decorator';
import { UsersService } from '../service/users';
// import { LoginDTO } from '../dto/login';
import { CreateApiDoc } from '@midwayjs/swagger';
import { loginInterFace } from '../interface';
@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  userService: UsersService;

  @(CreateApiDoc().summary('邮箱登录').build())
  @Post('/email-login')
  async emailLogin(@Body(ALL) login: loginInterFace) {
    return await this.userService.saveUser(login);
  }
  @(CreateApiDoc().summary('获取邮箱验证码').build())
  @Post('/emailCode')
  async getEmail(@Body() email: string) {
    return await this.userService.getEmail(email);
  }
}
