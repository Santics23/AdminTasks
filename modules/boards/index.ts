import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit';
import { fileURLToPath } from 'url';

export interface ModuleOptions {
  preventClose: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'Boards',
    configKey: 'boards',
  },
  defaults: {},
  setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);

    _nuxt.options.alias['@boards'] = fileURLToPath(
      new URL('.', import.meta.url)
    );
  
    addComponentsDir({
      path: resolve('components'),
      prefix: 'Boards',
    });

    addComponentsDir({
      path: resolve('pages'),
      prefix: 'BoardsPages',
    });
  },
});
