import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context);
  } catch (err) {
    if (err?.code === "ERR_MODULE_NOT_FOUND" && (specifier.startsWith("./") || specifier.startsWith("../"))) {
      const candidate = specifier + ".ts";
      const url = new URL(candidate, context.parentURL).href;
      if (existsSync(fileURLToPath(url))) return next(candidate, context);
    }
    throw err;
  }
}
