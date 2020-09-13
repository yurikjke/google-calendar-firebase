export let vueInstance: any = {};

export function initAppInstance(vue: any) {
  vueInstance = vue;
}

// export function getStore() {
//   return vueInstance.$store;
// }

export function getAppInstance() {
  return vueInstance;
}
