import _ from "lodash";
import { v4 as uuid } from "uuid";

import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

const adapter = new LocalStorage("db");
const db = low(adapter);

export { _, db, uuid };
