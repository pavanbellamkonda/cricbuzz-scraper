import { Module } from '@nestjs/common';
import { BallByBallService } from './ball-by-ball.service';
import { BallByBallController } from './ball-by-ball.controller';

@Module({
  controllers: [BallByBallController],
  providers: [BallByBallService]
})
export class BallByBallModule {}
