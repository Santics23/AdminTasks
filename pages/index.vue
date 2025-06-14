<template>
  <div
    class="min-h-screen"
    :class="{ dark: isDark }">
    <header
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <UContainer class="py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">
          Tablero Kanban
        </h1>
        <ClientOnly v-if="!colorMode?.forced">
          <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            @click="isDark = !isDark" />

          <template #fallback>
            <div class="size-8" />
          </template>
        </ClientOnly>
      </UContainer>
    </header>

    <UContainer class="py-6">
      <draggable
        v-model="columns"
        group="columns"
        item-key="id"
        handle=".column-drag-handle"
        class="flex gap-4 overflow-x-auto pb-4">
        <template #item="{ element: column }">
          <div
            class="column bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 border border-gray-200 dark:border-gray-700 w-72 flex-shrink-0">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ column.title }}
              </h3>
              <button
                class="column-drag-handle cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <UIcon name="i-heroicons-bars-3-bottom-left" />
              </button>
            </div>

            <draggable
              v-model="column.cards"
              group="cards"
              item-key="id"
              class="space-y-2 min-h-20"
              @end="onCardDragEnd">
              <template #item="{ element: card }">
                <div
                  class="card bg-white dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow">
                  <p class="text-gray-800 dark:text-gray-200">
                    {{ card.text }}
                  </p>
                  <button
                    class="mt-1 text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    @click="removeCard(column.id, card.id)">
                    Eliminar
                  </button>
                </div>
              </template>
            </draggable>

            <button
              class="mt-2 w-full text-sm text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 flex items-center gap-1"
              @click="openAddCardModal(column.id)">
              <UIcon name="i-heroicons-plus" />
              <span>Añadir tarjeta</span>
            </button>
          </div>
        </template>
      </draggable>

      <button
        class="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md flex items-center gap-1"
        @click="openAddColumnModal">
        <UIcon name="i-heroicons-plus" />
        <span>Añadir columna</span>
      </button>
    </UContainer>

    <UModal
      v-model:open="isCardModalOpen"
      title="Nueva Tarjeta">
      <template #body>
        <UInput
          v-model="newCardText"
          placeholder="Texto de la tarjeta"
          class="mb-3" />

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            @click="isCardModalOpen = false" />
          <UButton
            label="Guardar"
            color="primary"
            @click="addCard" />
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="isColumnModalOpen"
      title="Nueva Columna">
      <template #body>
        <UInput
          v-model="newColumnTitle"
          placeholder="Título de la columna"
          class="mb-3" />

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            @click="isColumnModalOpen = false" />
          <UButton
            label="Crear"
            color="primary"
            @click="addColumn" />
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';

// Datos del tablero
const columns = ref([
  {
    id: 1,
    title: '📝 Por hacer',
    cards: [
      { id: 1, text: 'Diseñar interfaz' },
      { id: 2, text: 'Configurar NuxtUI' },
    ],
  },
  {
    id: 2,
    title: '🚀 En progreso',
    cards: [{ id: 3, text: 'Implementar drag & drop' }],
  },
]);

const isCardModalOpen = ref<boolean>(false);
const isColumnModalOpen = ref<boolean>(false);
const currentColumnId = ref<number | null>(null);
const newCardText = ref('');
const newColumnTitle = ref('');

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light';
  },
});

const openAddCardModal = (columnId: number) => {
  currentColumnId.value = columnId;
  newCardText.value = '';
  isCardModalOpen.value = true;
};

const addCard = () => {
  if (newCardText.value.trim()) {
    const column = columns.value.find(
      (col) => col.id === currentColumnId.value
    );
    if (column) {
      column.cards.push({
        id: Date.now(),
        text: newCardText.value,
      });
      isCardModalOpen.value = false;
    }
  }
};

const openAddColumnModal = () => {
  newColumnTitle.value = '';
  isColumnModalOpen.value = true;
};

const addColumn = () => {
  if (newColumnTitle.value.trim()) {
    columns.value.push({
      id: Date.now(),
      title: newColumnTitle.value,
      cards: [],
    });
    isColumnModalOpen.value = false;
  }
};

const removeCard = (columnId: number, cardId: number) => {
  const column = columns.value.find((col) => col.id === columnId);
  if (column) {
    column.cards = column.cards.filter((card) => card.id !== cardId);
  }
};

const onCardDragEnd = () => {
  console.log('Tarjeta movida');
};
</script>

<style>
/* Transiciones */
.column {
  transition: all 0.2s ease;
}

.card {
  transition: all 0.2s ease;
}
</style>
