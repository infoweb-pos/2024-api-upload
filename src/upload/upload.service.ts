import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  responderInformacaoArquivo(arquivo: Express.Multer.File) {
    return {
      estado: 'ok',
      dados: {
        nome: arquivo.originalname,
        tamanho: arquivo.size,
        mimetype: arquivo.mimetype,
        encode: arquivo.encoding,
      },
    };
  }

  responderInformacoesArquivos(arquivos: Array<Express.Multer.File>) {
    const informacoes = arquivos.map((arquivo) => {
      return {
        nome: arquivo.originalname,
        tamanho: arquivo.size,
        mimetype: arquivo.mimetype,
        encode: arquivo.encoding,
      };
    });
    return {
      estado: 'ok',
      dados: {
        quantidade: arquivos?.length,
        arquivos: informacoes,
      },
    };
  }
}