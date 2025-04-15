import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit';
import { fileURLToPath } from 'url';

export interface ModuleOptions {
  preventClose: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'Tasks',
    configKey: 'tasks',
  },
  defaults: {},
  setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);

    _nuxt.options.alias['@tasks'] = fileURLToPath(
      new URL('.', import.meta.url)
    );

    addComponentsDir({
      path: resolve('components'),
      prefix: 'Tasks',
    });

    addComponentsDir({
      path: resolve('pages'),
      prefix: 'TasksPages',
    });
  },
});
