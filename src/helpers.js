export const quickStringHash = string => {
  let hash = 0;

  if (string.length === 0) return hash;

  for (const ch of string.split('')) {
    hash = (hash << 5) - hash + ch.charCodeAt();
    hash = hash & hash;
  }

  return hash;
};
