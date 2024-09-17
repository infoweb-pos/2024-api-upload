import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

class ImagemDto {
  id: string;
  nome: string;
  tamanho: number;
  mimetype: string;
  encoding: string;
  armazenamento: string;
}

@Injectable()
export class ArmazenamentoService {
  dir = path.join(__dirname, '..', '..', 'uploads');
  imagens = new Array<ImagemDto>();

  async salvarEmDisco(arquivo: Express.Multer.File) {
    const nomeCompleto = path.join(this.dir, arquivo.originalname);

    await fs.writeFile(nomeCompleto, arquivo.buffer);
    this.imagens.push({
      id: arquivo.originalname,
      nome: arquivo.originalname,
      tamanho: arquivo.size,
      mimetype: arquivo.mimetype,
      encoding: arquivo.encoding,
      armazenamento: nomeCompleto,
    });
    return {
      estado: 'ok',
      dados: {
        id: arquivo.originalname,
        nome: arquivo.originalname,
      },
    };
  }
}
