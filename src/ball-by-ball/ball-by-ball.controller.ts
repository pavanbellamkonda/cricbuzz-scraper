import { Controller, Get, Query } from '@nestjs/common';
// import { Request } from 'express';
import { BallByBallService } from './ball-by-ball.service';

@Controller('ball-by-ball')
export class BallByBallController {
  constructor(private readonly ballByBallService: BallByBallService) {}

  @Get()
  getBallByBall(@Query() query): string {
    return this.ballByBallService.getBallByBallOfMatch(query['cricBuzzMatchUrl']);
  }
}
