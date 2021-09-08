// qq邮箱端口配置
export const mailConfig = {
  host: 'pop.qq.com',
  port: 465,
  secureConnection: false,
  auth: {
    user: '1084491297@qq.com',
    pass: 'mvyycbziwjcqfggf',
  },
};
// 发件人模板信息配置
export const mailOptions = {
  from: '1084491297@qq.com', // 发件人地址
  to: '', // 收件人地址，多个收件人可以使用逗号分隔
  subject: '激活您的邮箱地址', // 邮件标题
  html: '', // 邮件内容
};
