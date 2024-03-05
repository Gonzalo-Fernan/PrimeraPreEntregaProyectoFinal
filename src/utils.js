import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __direname = dirname(dirname(__filename));

export default __direname;