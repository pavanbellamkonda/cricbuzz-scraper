import { Test, TestingModule } from '@nestjs/testing';
import { BallByBallService } from './ball-by-ball.service';

describe('BallByBallService', () => {
  let service: BallByBallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BallByBallService],
    }).compile();

    service = module.get<BallByBallService>(BallByBallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
