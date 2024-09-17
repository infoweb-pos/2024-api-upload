import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArmazenamentoService } from './armazenamento.service';

@Controller('armazenamento')
@ApiTags('armazenamento')
export class ArmazenamentoController {
  constructor(private readonly armazenamentoService: ArmazenamentoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagem'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imagem: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload de arquivo com armazenamento' })
  @ApiResponse({ status: 201, description: 'Arquivo enviado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro no envio do arquivo.' })
  salvar(@UploadedFile() arq: Express.Multer.File) {
    return this.armazenamentoService.salvarEmDisco(arq);
  }
}
