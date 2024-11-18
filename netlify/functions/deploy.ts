import type { Config } from '@netlify/functions';

const BUILD_HOOK =
  'https://api.netlify.com/build_hooks/673b721e814f5a0bff4ba476'; // replace me!

export default async function deploy() {
  await fetch(BUILD_HOOK, {
    method: 'POST',
  })
};

export const config: Config = {
  schedule: '0 0 * * *',
};