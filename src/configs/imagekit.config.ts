import { ConfigService } from '@nestjs/config';
import { ImageKitModuleOptions } from 'imagekit-nestjs';

export const ImageKitConfig = (
  configService: ConfigService,
): ImageKitModuleOptions => ({
  privateKey: configService.get('CLOUD_PRIVATE_KEY'),
  publicKey: configService.get('CLOUD_PUBLIC_KEY'),
  urlEndpoint: configService.get('CLOUD_URL_ENDPOINT'),
});
