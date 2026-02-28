import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: ['resources/ts/demo1/components/ui/**', 'resources/ts/demo1/routeTree.gen.ts'],
  ignoreDependencies: ["tailwindcss", "tw-animate-css"]
};

export default config;