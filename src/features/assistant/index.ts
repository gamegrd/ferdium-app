import AssistantStore from './store';
export const asstantStore = new AssistantStore();

export default function initAsstants(stores: { todos?: any }, actions: any) {
  stores.todos = asstantStore ;
  asstantStore.start(stores, actions);
}
