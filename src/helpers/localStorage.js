export default {
  setLocalStorage: function(setName, value, ttl) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(setName, JSON.stringify(item));
  },

  getLocalStorage(getName) {
    const itemStr = localStorage.getItem(getName);
      if (!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr)
      const now = new Date()

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(getName);
        return null;
      }
      return item.value;
  }
}