import { Test, TestingModule } from '@nestjs/testing';
import { DatalogController } from './datalog.controller';
import { DatalogService } from './datalog.service';

describe('DatalogController', () => {
  let controller: DatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatalogController],
      providers: [DatalogService],
    }).compile();

    controller = module.get<DatalogController>(DatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
