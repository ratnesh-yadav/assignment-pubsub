import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordSchema } from './record.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongo:27017/pubsub'),
    MongooseModule.forFeature([{ name: 'Record', schema: RecordSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


