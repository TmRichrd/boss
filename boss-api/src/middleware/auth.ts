import { App, Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context, Application } from 'egg';
@Provide()
export class auth implements IWebMiddleware {
  @App()
  app: Application;
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const token: any = ctx.request.header.token;
      const authApi: Array<string> = [
        '/user/emailCode',
        '/user/email-login'
      ];
      const apiUrl: string = ctx.request.url;
      if (authApi.includes(apiUrl)) return await next();
      let decode = '';
      if (token) {
        try {
          decode = ctx.app.jwt.verify(token, this.app.config.jwt.secret);
          await next();
          console.log('decode=========>', decode);
        } catch (error) {
          ctx.body = {
            code: 401,
            data: null,
            message: 'token失效！',
          };
          return;
        }
      } else {
        ctx.body = {
          code: 401,
          data: null,
          message: 'token失效！',
        };
        return;
      }
    };
  }
}
