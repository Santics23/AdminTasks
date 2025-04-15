import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit';
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
    const { resolve } = createResolver(import.meta.url);
    
        _nuxt.options.alias['@common'] = fileURLToPath(
          new URL('.', import.meta.url)
        );

    addComponentsDir({
      path: resolve('components'),
      prefix: 'Common',
    });

    addComponentsDir({
      path: resolve('pages'),
      prefix: 'CommonPages',
    });
  },
});
