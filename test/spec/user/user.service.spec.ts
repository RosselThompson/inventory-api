import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';

describe('UserService', () => {
  let service: UserService;

  const USER_REPOSITORY_TOKEN = 'UserRepository';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: USER_REPOSITORY_TOKEN, useValue: {} },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
