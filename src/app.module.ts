import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BallByBallModule } from './ball-by-ball/ball-by-ball.module';

@Module({
  imports: [BallByBallModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
