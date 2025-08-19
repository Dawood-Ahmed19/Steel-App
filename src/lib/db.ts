// import Datastore from "@seald-io/nedb";

// const db = new Datastore({ filename: "items.db", autoload: true });

// export default db;

import Datastore from "nedb-promises";

// This will create a local file `items.db` in your project root
const db = Datastore.create({
  filename: "items.db",
  autoload: true,
});

export default db;
