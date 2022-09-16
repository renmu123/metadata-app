// db.js
import Dexie from "dexie";
import { cloneDeep } from "lodash-es";

export const db = new Dexie("myDatabase");

db.version(2).stores({
  library: "++id, name, createTime, fields",
  setting: "",
  item: "++id, libraryId",
});

export const library = {
  async add(data) {
    data.createTime = Date.now();
    let res = await db.library.add(cloneDeep(data));
    return res;
  },
  async edit() {},
  async remove() {},
  async get(key) {
    if (key) {
      let res = await db.library.get(key);
      return res;
    } else {
      return await db.library.toArray();
    }
  },
};

export const item = {
  async add(dataList) {
    let res = await db.item.bulkAdd(cloneDeep(dataList));
    return res;
  },
  async edit(data) {
    let res = await db.item.update(data.id, cloneDeep(data));
    return res;
  },
  async remove(id) {
    let res = await db.item.delete(id);
    return res;
  },
  async get(libraryId) {
    return await db.item.where("libraryId").equals(libraryId).toArray();
  },
};

export const setting = {
  async set(key, value) {
    let res = await this.update(key, value);
    return res;
  },
  async update(key, value) {
    let res = await db.setting.put(value, key);
    return res;
  },
  async add(key, value) {
    let res = await db.setting.add(value, key);
    return res;
  },
  async getOne(key) {
    let res = await db.setting.get(key);
    return res;
  },
  async get(key) {
    if (key) {
      let res = await db.setting.get(key);
      return res;
    } else {
      const collection = await db.setting.toCollection();
      let res = {};
      collection.each((value, { key }) => {
        res[key] = value;
      });
      return res;
    }
  },
};
