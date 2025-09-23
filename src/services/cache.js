export const getFromCache = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  try {
    return JSON.parse(cached);
  } catch (e) {
    console.error("❌ Error parsing cache:", e);
    return null;
  }
};

export const setToCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("❌ Error saving to cache:", e);
  }
};
