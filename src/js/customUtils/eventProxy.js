/**
 * 
 * 发布, 订阅
 * 
 */

const eventProxy = {
  onObj: {},
  onceObj: {},
  on(key, callback) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }
    this.onObj[key].push(callback);
  },
  once(key, callback) {
    if (this.onceObj[key] === undefined) {
      this.onceObj[key] = [];
    }
    this.onceObj[key].push(callback);
  },
  off(key) {
    this.onObj[key] = [];
    this.onceObj[key] = [];
  },
  trigger(key, ...rest) {
    if (key === undefined) return false;

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      this.onObj[key].forEach(item => {
        item.call(null, ...rest);
      });
    }
    if (this.onceObj[key] !== undefined && this.onceObj[key].length > 0) {
      this.onceObj[key].forEach(item => {
        item.call(null, ...rest);
        item = undefined;
      });
      this.onceObj[key] = [];
    }
  }
};

export default eventProxy;
