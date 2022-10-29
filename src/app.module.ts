import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BallByBallModule } from './ball-by-ball/ball-by-ball.module';
import { PuppetModule } from './puppet/puppet.module';

@Module({
  imports: [BallByBallModule, PuppetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
