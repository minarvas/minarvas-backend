enum ServiceEnvironment {
  Local = 'local',
  Development = 'development',
  Production = 'production',
}

const currentServiceEnv = () => process.env.SERVICE_ENV;

export const isProductEnv = () => {
  return [ServiceEnvironment.Production].includes(currentServiceEnv() as ServiceEnvironment);
};
