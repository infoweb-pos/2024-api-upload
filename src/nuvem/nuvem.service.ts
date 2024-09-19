import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImageKitService } from 'imagekit-nestjs';

class ArquivoDto {
  id: string;
  nome: string;
  tamanho: number;
  mimetype: string;
  encoding: string;
  armazenamento: string;
}

@Injectable()
export class NuvemService {
  arquivos: ArquivoDto[] = [];

  constructor(private readonly cloud: ImageKitService) {}

  async upload(arquivo: Express.Multer.File) {
    const resultado = await this.cloud.upload({
      file: arquivo.buffer,
      fileName: arquivo.originalname,
    });

    if (!resultado) {
      throw new HttpException(
        'Erro ao tentar armazenar arquivo na nuvem',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const informacao: ArquivoDto = {
      id: resultado.fileId,
      nome: arquivo.originalname,
      encoding: arquivo.encoding,
      mimetype: arquivo.mimetype,
      tamanho: arquivo.size,
      armazenamento: resultado.url,
    };
    this.arquivos.push(informacao);
    return {
      estado: 'ok',
      data: informacao,
    };
  }

  pegarPorNome(nome: string) {
    const informacao = this.arquivos.filter((item) => item.nome === nome);
    if (informacao.length === 0) {
      throw new NotFoundException(`Arquivo (${nome}) não encontrado.`);
    }
    return informacao[0];
  }

  pegarPorID(id: string) {
    const informacao = this.arquivos.filter((item) => item.id === id);
    if (informacao.length === 0) {
      throw new NotFoundException(`Arquivo (${id}) não encontrado.`);
    }
    return informacao[0];
  }
}
