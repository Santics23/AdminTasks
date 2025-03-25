import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit';
import type { NuxtTemplate } from '@nuxt/schema';
import { fileURLToPath } from 'url';

export interface ModuleOptions {
  preventClose: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'Common',
    configKey: 'common',
  },
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    _nuxt.options.alias['@common'] = fileURLToPath(
      new URL('.', import.meta.url)
    );

    addComponentsDir({
      path: resolver.resolve('components'),
      prefix: 'Common',
    });

    addComponentsDir({
      path: resolver.resolve('pages'),
      prefix: 'CommonPages',
    });
  },
});
