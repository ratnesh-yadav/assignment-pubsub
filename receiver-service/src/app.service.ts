import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

@Injectable()
export class AppService {
  private redisClient;

  constructor(@InjectModel('Record') private recordModel: Model<any>) {
    this.redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}:6379` });
    this.redisClient.connect();
  }

  async handleData(data: any) {
    // Basic validation
    if (!data.user || !data.class || !data.age || !data.email) {
      throw new Error('Validation failed');
    }

    const newRecord = {
      id: uuidv4(),
      ...data,
      inserted_at: moment().toISOString()
    };

  
  console.log('Saving Record:', newRecord); // Debug log

  const saved = await this.recordModel.create(newRecord);

  console.log('Saved Record:', saved); // Confirm it's saved
    await this.redisClient.publish('record_channel', JSON.stringify(newRecord));

    return { message: 'Data received and published', data: newRecord };
  }

  async getAllRecords() {
  return await this.recordModel.find().exec();
}
}