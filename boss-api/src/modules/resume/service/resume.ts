import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '_@midwayjs_decorator@2.13.0@@midwayjs/decorator';
import { Resume } from '../entity/resume';
import { Repository } from 'typeorm';
@Provide()
export class ResumeService {
  @InjectEntityModel(Resume)
  resume: Repository<Resume>;
  async findByUserId(id: number) {
    const res = await this.resume.findOne({ id });
    return res;
    
  }
}
