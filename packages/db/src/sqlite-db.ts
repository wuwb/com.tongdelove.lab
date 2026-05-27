import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as productsSchema from "./schema/sqlite-products";

const dbUrl = process.env.DATABASE_URL || "file:local.db";

console.log("[sqlite-db] Using database:", dbUrl);

export const schema = { ...productsSchema };

const client = createClient({ url: dbUrl });
export const db = drizzle(client, { schema });

export { sql, eq, and, or, like, desc, asc, inArray } from "drizzle-orm";
export * from "./schema/sqlite-products";
