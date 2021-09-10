import { ResumeService } from './../service/resume';
import { Controller, Provide, Inject, Get, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';

@Provide()
@Controller('/resume')
export class ResumeController {
  @Inject()
  resumeService: ResumeService;
  @(CreateApiDoc().summary('简历详情').build())
  @Get('/detail')
  async detail(@Query() id: number) {
    return this.resumeService.findByUserId(id);
  }
}
