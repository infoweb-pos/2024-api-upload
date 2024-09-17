import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArmazenamentoService } from './armazenamento.service';

@Controller('armazenamento')
export class ArmazenamentoController {
  constructor(private readonly armazenamentoService: ArmazenamentoService) {}
}
