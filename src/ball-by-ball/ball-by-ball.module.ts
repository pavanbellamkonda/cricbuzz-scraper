import { Module } from '@nestjs/common';
import { BallByBallService } from './ball-by-ball.service';
import { BallByBallController } from './ball-by-ball.controller';
import { PuppetModule } from 'src/puppet/puppet.module';

@Module({
  imports: [PuppetModule],
  controllers: [BallByBallController],
  providers: [BallByBallService]
})
export class BallByBallModule {}
