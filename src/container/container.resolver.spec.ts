import { Test, TestingModule } from '@nestjs/testing';
import { ContainerResolver } from './container.resolver';

describe('ContainerResolver', () => {
  let resolver: ContainerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContainerResolver],
    }).compile();

    resolver = module.get<ContainerResolver>(ContainerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
