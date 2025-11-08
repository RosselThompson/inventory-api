import * as fs from 'fs';
import * as path from 'path';
import { AppDataSource } from './data-source';
import { Business } from 'src/business/entities/business.entity';
import { User } from 'src/user/entities/user.entity';
import { hashPassword } from 'src/common/helpers/hash-password';

const onboard = async () => {
  const tenantInfoFile = 'tenant-1.json';
  const directory = `${__dirname}/seeds`;
  const jsonPath = path.resolve(directory, tenantInfoFile);
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const { business: businessData, user: userData } = JSON.parse(raw);

  await AppDataSource.initialize();

  const existing = await AppDataSource.manager.findOne(Business, {
    where: { legalId: businessData.legalId },
  });

  if (existing) {
    console.log(
      `⚠️ business with legalId ${businessData.legalId} already exist. Cancelling...`,
    );
    await AppDataSource.destroy();
    return;
  }

  const business = AppDataSource.manager.create(Business, {
    ...businessData,
    isActive: true,
  });

  await AppDataSource.manager.save(business);

  const user = AppDataSource.manager.create(User, {
    ...userData,
    password: await hashPassword(userData.password),
    isVerified: true,
    isActive: true,
    isVisible: false,
    business,
  });

  await AppDataSource.manager.save(user);

  console.log(
    `✅ Business "${business.tradeName}" and user "${user.username}" were created`,
  );
  await AppDataSource.destroy();
};

onboard().catch((err) => {
  console.error('❌ Onboarding Error', err);
  process.exit(1);
});
