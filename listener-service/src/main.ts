import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClient } from 'redis';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors();
  await app.listen(3002);
  const redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}:6379` });
  await redisClient.connect();
  const service = app.get(AppService);

  await redisClient.subscribe('record_channel', async (message) => {
     console.log('Received message from Redis:', message);
    await service.processEvent(JSON.parse(message));
  });
}
bootstrap();