import db from "./db";

export type Item = {
  name: string;
  type: string;
  size: string;
  date: string;
};

export async function addItem(item: Item) {
  return await db.insert(item);
}

export async function getItems() {
  return await db.find({}).sort({ date: -1 });
}

export async function deleteItem(id: string) {
  return await db.remove({ _id: id }, {});
}
