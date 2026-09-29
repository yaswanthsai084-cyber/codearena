/**
 * Dumps the C roadmap data to tools/roadmap.json so the SVG
 * generator (tools/roadmap-svg.py) draws from the exact same
 * source the course page uses.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { cPath, countTopics } from "../src/data/syllabus-c.js";

const here = dirname(fileURLToPath(import.meta.url));
const file = join(here, "roadmap.json");

writeFileSync(
  file,
  JSON.stringify({ ...cPath, total: countTopics(cPath) }, null, 2),
);

console.log("wrote", file);
