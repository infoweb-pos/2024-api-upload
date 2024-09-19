import { Module } from '@nestjs/common';
import { NuvemService } from './nuvem.service';
import { NuvemController } from './nuvem.controller';

@Module({
  controllers: [NuvemController],
  providers: [NuvemService],
})
export class NuvemModule {}
