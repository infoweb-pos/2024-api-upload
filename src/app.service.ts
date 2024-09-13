import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      estado: 'ok',
      data: {
        titulo: 'API de exemplo de upload',
        descricao:
          'Projeto de sala de aula para exemplificar upload de arquivos em API',
        versao: '1.0',
      },
    };
  }
}
