import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('exemplo-simples')
  @UseInterceptors(FileInterceptor('arquivo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        arquivo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Exemplo de upload de 1 arquivo qualquer' })
  @ApiResponse({ status: 201, description: 'Arquivo enviado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro no envio do arquivo.' })
  uploadArquivoSimples(@UploadedFile() arq: Express.Multer.File) {
    console.log(arq);

    return this.uploadService.responderInformacaoArquivo(arq);
  }

  @Post('arquivos')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        arquivos: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Arquivo(s) enviado(s) com sucesso.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Erro no envio de arquivos.',
  })
  @UseInterceptors(FilesInterceptor('arquivos'))
  uploadArquivos(@UploadedFiles() arquivos: Array<Express.Multer.File>) {
    return {
      estado: 'ok',
      data: {
        quantidade: arquivos?.length,
      },
    };
  }
}
