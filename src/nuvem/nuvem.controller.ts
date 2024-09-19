import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NuvemService } from './nuvem.service';
import {
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
}
