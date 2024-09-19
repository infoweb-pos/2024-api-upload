import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NuvemService } from './nuvem.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('nuvem')
@ApiTags('nuvem')
export class NuvemController {
  constructor(private readonly nuvemService: NuvemService) {}

  @Post('upload')
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
  @ApiOperation({ summary: 'Upload de arquivo com armazenamento na nuvem' })
  @ApiResponse({ status: 201, description: 'Upload de arquivo concluído.' })
  @ApiResponse({ status: 400, description: 'ERRO no upload do arquivo.' })
  upload(@UploadedFile() arquivo: Express.Multer.File) {
    return this.nuvemService.upload(arquivo);
  }

  @Get('nome/:arquivo_nome')
  @ApiOperation({
    summary: 'pegar um arquivo pelo seu nome que esta armazenado na nuvem',
  })
  @ApiResponse({ status: 201, description: 'Download de arquivo concluído.' })
  @ApiBadRequestResponse({
    status: 404,
    description: 'ERRO arquivo não encontrado.',
  })
  downloadByNome(@Param('arquivo_nome') arquivo_nome: string) {
    return this.nuvemService.pegarPorNome(arquivo_nome);
  }

  @Get('id/:arquivo_id')
  @ApiOperation({
    summary: 'pegar um arquivo pelo seu id que esta armazenado na nuvem',
  })
  @ApiResponse({ status: 201, description: 'Download de arquivo concluído.' })
  @ApiBadRequestResponse({
    status: 404,
    description: 'ERRO arquivo não encontrado.',
  })
  downloadById(@Param('arquivo_id') arquivo_id: string) {
    return this.nuvemService.pegarPorID(arquivo_id);
  }
}
