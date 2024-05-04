import AssistantStore from './store';

export const assistantStore = new AssistantStore();

export default function initAsstants(stores: { todos?: any }, actions: any) {
  const updatedStores = { ...stores, todos: assistantStore };
  assistantStore.start(updatedStores, actions);
}
