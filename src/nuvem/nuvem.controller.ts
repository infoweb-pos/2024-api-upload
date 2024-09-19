import { Controller } from '@nestjs/common';
import { NuvemService } from './nuvem.service';

@Controller('nuvem')
export class NuvemController {
  constructor(private readonly nuvemService: NuvemService) {}
}
