import { Test, TestingModule } from '@nestjs/testing';
import { BallByBallController } from './ball-by-ball.controller';
import { BallByBallService } from './ball-by-ball.service';

describe('BallByBallController', () => {
  let controller: BallByBallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BallByBallController],
      providers: [BallByBallService],
    }).compile();

    controller = module.get<BallByBallController>(BallByBallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
