import Datastore from "nedb-promises";

const db = Datastore.create({
  filename: "items.db",
  autoload: true,
});

export default db;
