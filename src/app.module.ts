import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageKitModule } from 'imagekit-nestjs';
import { ImageKitConfig } from './configs/imagekit.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { ArmazenamentoModule } from './armazenamento/armazenamento.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ImageKitModule.forRootAsync({
      useFactory: ImageKitConfig,
      inject: [ConfigService],
      imports: [ConfigModule],
      isGlobal: true,
    }),
    UploadModule,
    ArmazenamentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
