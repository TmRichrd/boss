// import { LoginDTO } from './../dto/login';
import { loginInterFace } from '../interface';
import { Body, Provide, Inject, App } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { mailOptions } from '../../../config/config.mail';
import { send } from '../../../utils';
import { CacheManager } from '@midwayjs/cache';
import { Context, Application } from 'egg';
@Provide()
export class UsersService {
  @Inject()
  cache: CacheManager;

  @Inject()
  ctx: Context;

  @App()
  app: Application;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  async saveUser(login: loginInterFace) {
    const { email, code } = login;
    let codes = await this.cache.get(`${email}`);
    if (!codes)
      return { code: 201, data: {}, message: '该验证码已过期，请重新验证' };
    if (code !== codes)
      return { code: 201, data: {}, message: '验证码有误，请重新输入' };
    if (code === codes) {
      const userQ = await this.userModel.findOne({ email });
      if (userQ.id) return this.userLogin(login);
      return this.register(login);
    }
  }
  async userLogin(login: loginInterFace) {
    const { email } = login;
    let user = await this.userModel.findOne({ email });
    const token = this.app.jwt.sign({ id: user.id },this.app.config.jwt.secret);
    return {
      code: 200,
      data: user,
      message: '登录成功',
      token,
    };
  }
  async register(login: loginInterFace) {
    const { email } = login;
    let user = new User();
    user.name = email;
    user.email = email;
    user.identity = 1;
    user.sex = 1;
    user.type = 1;
    user.status = 1;
    user.headImg = 'https://avatars.githubusercontent.com/u/49671013?s=120&v=4';
    user.createTime = new Date();
    const userResult = await this.userModel.save(user);
    // 生成token
    const token = this.app.jwt.sign({id: userResult.id,},this.app.config.jwt.secret);
    let Users = await this.userModel.findOne({ id: userResult.id });
    return {
      code: 200,
      data: Users,
      token: token,
      message: '操作成功',
    };
  }
  async getEmail(@Body() email: string) {
    let code = await this.randomCode();
    mailOptions.to = email;
    mailOptions.html = await this.getHtmlStr(code);
    const resCode = await send(mailOptions);
    await this.cache.set(`${email}`, `${code}`, { ttl: 100 });
    return {
      code: resCode ? 200 : 500,
      data: code,
      message: resCode ? '发送成功' : '发送失败，请稍后重试',
    };
  }
  /**
   *
   *
   * @return {*} 邮箱验证码
   * @memberof UsersService
   */
  async randomCode() {
    let emailCode = '';
    let codeStr =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let index = 0; index < 6; index++) {
      emailCode += codeStr.charAt(Math.round(Math.random() * codeStr.length));
    }
    return emailCode;
  }
  /**
   *
   *
   * @param {*} code
   * @return {*} 邮件模板内容
   * @memberof UsersService
   */
  getHtmlStr(code) {
    return `  
      

<div id="mailContentContainer" class="qmbox qm_con_body_content qqmail_webmail_only" style="">


<style type="text/css" media="screen">
        @font-face {
            font-family: 'Motiva Sans';
            font-style: normal;
            font-weight: 300;
            src: local('Motiva Sans'), url('https://store.cloudflare.steamstatic.com/public/shared/fonts/email/MotivaSans-Light.woff') format('woff');
        }

        @font-face {
            font-family: 'Motiva Sans';
            font-style: normal;
            font-weight: normal;
            src: local('Motiva Sans'), url('https://store.cloudflare.steamstatic.com//public/shared/fonts/email/MotivaSans-Regular.woff') format('woff');
        }

        @font-face {
            font-family: 'Motiva Sans';
            font-style: normal;
            font-weight: bold;
            src: local('Motiva Sans'), url('https://store.cloudflare.steamstatic.com//public/shared/fonts/email/MotivaSans-Bold.woff') format('woff');
        }
    </style>
<style type="text/css" media="screen">
        .qmbox body { padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#ffffff; -webkit-text-size-adjust:none; }
        .qmbox a { color:#3999ec; text-decoration:underline; }
        .qmbox body a { color:#ffffff; text-decoration:underline; }
        .qmbox img { margin: 0 !important; -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }

        /* for recepits */
            .qmbox table { mso-table-lspace:0pt; mso-table-rspace:0pt; }
            .qmbox img, .qmbox a img{ border:0; outline:none; text-decoration:none; }
            .qmbox #outlook a { padding:0; }
            .qmbox .ReadMsgBody { width:100%; }
            .qmbox .ExternalClass { width:100%; }
            .qmbox div,.qmbox p,.qmbox a,.qmbox li,.qmbox td,.qmbox blockquote { mso-line-height-rule:exactly; }
            .qmbox a[href^=tel],.qmbox a[href^=sms] { color:inherit; text-decoration:none; }
            .qmbox .ExternalClass, .qmbox .ExternalClass p, .qmbox .ExternalClass td, .qmbox .ExternalClass div, .qmbox .ExternalClass span, .qmbox .ExternalClass font { line-height:100%; }
        /* END for recepits */

        .qmbox a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }

        .qmbox .btn-18 a { display: block; padding: 13px 35px; text-decoration: none; }

        .qmbox .l-white a { color: #ffffff; }
        .qmbox .l-black a { color: #000001; }
        .qmbox .l-grey1 a { color: #dbdee2; }
        .qmbox .l-grey2 a { color: #a1a2a4; }
        .qmbox .l-grey3 a { color: #dadcdd; }
        .qmbox .l-grey4 a { color: #f1f1f1; }
        .qmbox .l-grey5 a { color: #dddedf; }
        .qmbox .l-grey6 a { color: #bfbfbf; }
        .qmbox .l-grey7 a { color: #dcdddd; }
        .qmbox .l-grey8 a { color: #8e96a4; }
        .qmbox .l-green a { color: #a4d007; }
        .qmbox .l-blue a { color: #6a7c96; }
        .qmbox .l-blue1 a { color: #3999ec; }
        .qmbox .l-blue2 a { color: #9eb8cc; }


        /* Mobile styles */
        @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
            .qmbox .mpy-35 { padding-top: 35px !important; padding-bottom: 35px !important; }

            .qmbox .mpx-15 { padding-left: 15px !important; padding-right: 15px !important; }

            .qmbox .mpx-20 { padding-left: 20px !important; padding-right: 20px !important; }

            .qmbox .mpb-30 { padding-bottom: 30px !important; }

            .qmbox .mpb-10 { padding-bottom: 10px !important; }

            .qmbox .mpb-15 { padding-bottom: 15px !important; }

            .qmbox .mpb-20 { padding-bottom: 20px !important; }

            .qmbox .mpb-35 { padding-bottom: 35px !important; }

            .qmbox .mpb-40 { padding-bottom: 40px !important; }

            .qmbox .mpb-50 { padding-bottom: 50px !important; }

            .qmbox .mpb-60 { padding-bottom: 60px !important; }

            .qmbox .mpt-30 { padding-top: 30px !important; }

            .qmbox .mpt-40 { padding-top: 40px !important; }

            .qmbox .mpy-40 { padding-top: 40px !important; padding-bottom: 40px !important; }

            .qmbox .mpt-0 { padding-top: 0px !important; }

            .qmbox .mpr-0 { padding-right: 0px !important; }

            .qmbox .mfz-14 { font-size: 14px !important; }

            .qmbox .mfz-28 { font-size: 28px !important; }

            .qmbox .mfz-16 { font-size: 16px !important; }

            .qmbox .mfz-24 { font-size: 24px !important; }

            .qmbox .mlh-18 { line-height: 18px !important; }

            .qmbox u + body .gwfw { width:100% !important; width:100vw !important; }

            .qmbox .td,.qmbox 
            .m-shell { width: 100% !important; min-width: 100% !important; }

            .qmbox .mt-left { text-align: left !important; }
            .qmbox .mt-center { text-align: center !important; }
            .qmbox .mt-right { text-align: right !important; }

            .qmbox .m-left { text-align: left !important; }
            .qmbox .me-left { margin-right: auto !important; }
            .qmbox .me-center { margin: 0 auto !important; }
            .qmbox .me-right { margin-left: auto !important; }

            .qmbox .mh-auto { height: auto !important; }
            .qmbox .mw-auto { width: auto !important; }
            .qmbox .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }
            .qmbox .column,.qmbox 
            .column-top,.qmbox 
            .column-dir,.qmbox 
            .column-dir-top { float: left !important; width: 100% !important; display: block !important; }
            .qmbox .kmMobileStretch { float: left !important; width: 100% !important; display: block !important; padding-left: 0 !important; padding-right: 0 !important; }
            .qmbox .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
            .qmbox .m-block { display: block !important; }
            .qmbox .mw-15 { width: 15px !important; }
            .qmbox .mw-2p { width: 2% !important; }
            .qmbox .mw-32p { width: 32% !important; }
            .qmbox .mw-49p { width: 49% !important; }
            .qmbox .mw-50p { width: 50% !important; }
            .qmbox .mw-100p { width: 100% !important; }
            .qmbox .mbgs-200p { background-size: 200% auto !important; }
        }
    </style>
<center>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0; padding: 0; width: 100%; height: 100%;" bgcolor="#ffffff" class="gwfw">
        <tbody><tr>
            <td style="margin: 0; padding: 0; width: 100%; height: 100%;" align="center" valign="top">
                <table width="775" border="0" cellspacing="0" cellpadding="0" class="m-shell">
                    <tbody><tr>
                        <td class="td" style="width:775px; min-width:775px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                
                                <tbody><tr>
                                    <td class="p-80 mpy-35 mpx-15" bgcolor="#212429" style="padding: 80px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">

                                            
                                            <tbody><tr>
                                                <td class="img pb-45" style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 45px;">
                                                    

                                                </td>
                                            </tr>
                                            

                                            
                                            <tr>
                                                <td>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tbody><tr>
					<td class="title-36 pb-30 c-grey6 fw-b" style="font-size:36px; line-height:42px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; text-align:left; padding-bottom: 30px; color:#bfbfbf; font-weight:bold;">您好！</td>
				</tr>
			</tbody></table>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tbody><tr>
					<td class="title-28 c-white pb-30" style="font-size:28px; line-height:36px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; text-align:left; color:#ffffff; padding-bottom: 30px;">
						<strong>以下是您激活电子邮件地址时所需的确认代码：</strong>
					</td>
				</tr>
			</tbody></table>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tbody><tr>
					<td class="pb-70 mpb-50" style="padding-bottom: 70px;">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#17191c">
							<tbody><tr>
								<td class="py-30 px-56" style="padding-top: 30px; padding-bottom: 30px; padding-left: 56px; padding-right: 56px;">
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
																				<tbody><tr>
											<td class="title-48 c-blue1 fw-b a-center" style="font-size:48px; line-height:52px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; color:#3a9aed; font-weight:bold; text-align:center;">
												${code}											</td>
										</tr>
									</tbody></table>
								</td>
							</tr>
						</tbody></table>
					</td>
				</tr>
			</tbody></table>
			


			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tbody>
        <tr>
					
				</tr>
			</tbody></table>
			


                                                                                                
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody><tr>
                                                        <td class="pt-30" style="padding-top: 30px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tbody><tr>
                                                                    <td class="img" width="3" bgcolor="#3a9aed" style="font-size:0pt; line-height:0pt; text-align:left;"></td>
                                                                    <td class="img" width="37" style="font-size:0pt; line-height:0pt; text-align:left;"></td>
                                                                    <td>
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                            <tr>
                                                                                                                                                                    <td class="text-16 py-20 c-grey4 fallback-font" style="font-size:16px; line-height:22px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; text-align:left; padding-top: 20px; padding-bottom: 20px; color:#f1f1f1;">
                                                                                        祝您愉快，<br>                                                                                    </td>
                                                                                                                                                            </tr>
                                                                        </tbody></table>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                        </td>
                                                    </tr>
                                                </tbody></table>
                                                
                                                
                                                </td>
                                            </tr>

                                        </tbody></table>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
    </tbody></table>
</center>
<style type="text/css">.qmbox style, .qmbox script, .qmbox head, .qmbox link, .qmbox meta {display: none !important;}</style></div>
    `;
  }
}
