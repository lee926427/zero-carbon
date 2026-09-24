import { bucket } from "#/shared/lib/apis";

import { NetworkError, SchemaValidationError } from "ky";
import { resilientTaiwanDataSchema } from "../schema/resilientTaiwanDataSchema";

export async function fetchResilientTaiwanData() {
  try {
    return bucket.get("/json/2026_Resilient-Taiwan.json").json(resilientTaiwanDataSchema);
  } catch (error) {
    if (error instanceof NetworkError) {
      return;
    }

    if (error instanceof SchemaValidationError) {
      return;
    }
  }
}
