import { Controller, Get, Query } from '@nestjs/common';
import { BallByBallService } from './ball-by-ball.service';

@Controller('ball-by-ball')
export class BallByBallController {
  constructor(private readonly ballByBallService: BallByBallService) {}

  @Get()
  async getBallByBall(@Query() query): Promise<string> {
    return this.ballByBallService.getBallByBallOfMatch(query['cricBuzzMatchUrl']);
  }
}
