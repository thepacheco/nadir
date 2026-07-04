// Resolver hook so `node --experimental-strip-types` can follow the same
// extensionless relative imports Next.js uses (./schema → ./schema.ts).
import { register } from "node:module";
import { pathToFileURL } from "node:url";
register(new URL("./ts-resolve-hooks.mjs", import.meta.url), pathToFileURL("./"));
