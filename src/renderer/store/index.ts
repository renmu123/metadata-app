import { defineStore } from "pinia";
import { item, library, setting } from "../db";

export const useLibraryStore = defineStore("library", {
  state: () => {
    return {
      currentLibrary: {},
      currentLibraryId: 0,
      currentItems: [],
    };
  },
  actions: {
    async getCurrentLibrary() {
      this.currentLibraryId = await setting.get("currentLibrary");
      if (this.currentLibraryId) {
        this.currentLibrary = await library.get(this.currentLibraryId);
        this.currentItems = await item.get(this.currentLibraryId);
      }
    },
    async setCurrentLibraryId(value: number) {
      await setting.set("currentLibrary", value);
      await this.getCurrentLibrary();
    },

    async getCurrentItems(libraryId: number) {
      this.currentItems = await item.get(libraryId);
    },
    async addItems(libraryId: number, filePaths: any[]) {
      await item.add(
        filePaths.map((item) => {
          item.libraryId = libraryId;
          return item;
        })
      );
      await this.getCurrentItems(libraryId);
    },
  },
});
