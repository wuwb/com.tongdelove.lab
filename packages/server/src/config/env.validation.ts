import { plainToClassFromExist } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
  Staging = "staging",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClassFromExist(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    forbidUnknownValues: false, // 允许存在 unkown 值的配置项
  });

  console.log('error: ', errors);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
