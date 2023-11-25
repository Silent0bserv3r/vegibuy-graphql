import * as process from 'process';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Product } from '@/product/product.entity';
import { ProductModule } from '@/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from '@/config.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = process.env.STAGE == 'production';
        return {
          type: 'mongodb',
          url: isProduction
            ? process.env.MONGO_URL
            : configService.get('MONGO_URL'),
          synchronize: true,
          useUnifiedTopology: true,
          entities: [Product],
        };
      },
    }),
    ProductModule,
  ],
})
export class AppModule {}
