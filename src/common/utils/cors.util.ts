/*
 * Copyright (c) 2022 ActionPower Corporation. All right reserved.
 * ActionPower Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

const corsWhitelist = [
  process.env.CLIENT,
  process.env.HOST,
  'electron://altair',
  'http://54.180.116.236',
  'http://localhost',
  'https://mapleland.vercel.app',
  'https://sandbox.embed.apollographql.com',
  'https://studio.apollographql.com',
  'https://kauth.kakao',
  'https://mapleland.p-e.kr',
];

const validateOrigin = (origin: string, whitelist: string[] = corsWhitelist): boolean => {
  if (!origin) {
    return true;
  }

  return whitelist.reduce((prev, cur) => {
    return prev ? true : origin.startsWith(cur);
  }, false);
};

export const customOrigin = (origin: string, callback: (err: Error | null, origin?: boolean) => void) => {
  validateOrigin(origin) ? callback(null, true) : callback(new Error(`CORS is not allowed. origin: <${origin}>`));
};
