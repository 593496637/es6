export const getAssetURL = (path) => {
  return new URL(`../assets/img/${path}`, import.meta.url).href;
};
