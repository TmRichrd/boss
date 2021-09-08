import { Rule, RuleType } from '@midwayjs/decorator';

export class LoginDTO {
  // 邮箱
  @Rule(RuleType.string().required())
  email: string;
  // code
  @Rule(RuleType.string().required())
  code: string;
}
