import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

// 0: 'disconnected',
// 1: 'connected',
// 2: 'connecting',
// 3: 'disconnecting',
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          if (connection.readyState === 1) {
            console.log('MongoDB connected');
          }
          connection.on('connected', () => {
            console.log('MongoDB connected event');
          });
          connection.on('error', (error) => {
            console.log('MongoDB connection error', error);
          });
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
