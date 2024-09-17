import { Module } from '@nestjs/common';
import { ArmazenamentoService } from './armazenamento.service';
import { ArmazenamentoController } from './armazenamento.controller';

@Module({
  controllers: [ArmazenamentoController],
  providers: [ArmazenamentoService],
})
export class ArmazenamentoModule {}
