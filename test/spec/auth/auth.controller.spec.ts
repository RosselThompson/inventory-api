import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/auth/dto/signin.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const expectedToken = 'access_token';

  const mockSignIn = jest.fn().mockResolvedValue(expectedToken);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: mockSignIn,
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Signin fn should return an access token', async () => {
    const signinDto: SignInDto = { username: '', password: '' };
    expect(await controller.signIn(signinDto)).toBe(expectedToken);
  });
});
