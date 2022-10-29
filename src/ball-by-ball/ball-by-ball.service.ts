import { Injectable } from '@nestjs/common';

@Injectable()
export class BallByBallService {

  getBallByBallOfMatch(cricBuzzMatchUrl: string): string {
    return cricBuzzMatchUrl;
  }
}
