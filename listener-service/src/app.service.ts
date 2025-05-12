// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import moment from 'moment';

// @Injectable()
// export class AppService {
//   constructor(@InjectModel('Listener') private listenerModel: Model<any>) {}

//   async processEvent(data: any) {
//     const newData = {
//       ...data,
//       modified_at: moment().toISOString()
//     };
//       const listen = await this.listenerModel.create(newData);
//      console.log('Saved listener:', listen); 
//   }

//   async getAllRecords() {
//   return await this.listenerModel.find().exec();
// }
// }

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createClient } from 'redis';
import moment from 'moment';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectModel('Listener') private listenerModel: Model<any>) {}

  async onModuleInit() {
    const redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}:6379` });
    await redisClient.connect();

    await redisClient.subscribe('record_channel', async (message) => {
      await this.processEvent(JSON.parse(message));
    });
  }

  async processEvent(data: any) {
    const newData = {
      ...data,
      modified_at: moment().toISOString()
    };
    await this.listenerModel.create(newData);
  }

  async getAllRecords() {
    return await this.listenerModel.find().lean();
  }
}
