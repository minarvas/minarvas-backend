/*
 * Copyright (c) 2022 ActionPower Corporation. All right reserved.
 * ActionPower Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

const corsWhitelist = [process.env.CLIENT, 'http://localhost:3000'];

const validateOrigin = (origin: string, whitelist: string[] = corsWhitelist): boolean => {
  if (!origin) {
    return true;
  }

  const result = whitelist.reduce((prev, cur) => {
    return prev ? true : origin.startsWith(cur);
  }, false);

  return result;
};

export const customOrigin = (origin: string, callback: (err: Error | null, origin?: boolean) => void) => {
  validateOrigin(origin) ? callback(null, true) : callback(new Error(`CORS is not allowed. origin: <${origin}>`));
};
