import AssistantStore from './store';

export const assistantStore = new AssistantStore();

export default function initAsstants(stores: { todos?: any }, actions: any) {
  stores.todos = assistantStore;
  assistantStore.start(stores, actions);
}
