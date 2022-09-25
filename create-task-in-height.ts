#!/usr/bin/env -S deno run --allow-read=.env,.env.defaults --allow-env --allow-net

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Create todo in Height app
// @raycast.mode compact

// Optional parameters:
// @raycast.icon ✅
// @raycast.argument1 { "type": "text", "placeholder": "task" }

// Documentation:
// @raycast.author @atenni
// @raycast.authorURL https://github.com/atenni/raycast-scripts

import { config as loadConfig } from "https://deno.land/std@0.157.0/dotenv/mod.ts";

const config = await loadConfig();

async function main() {
  const task = Deno.args[0];

  // Add the task to the default list
  const res = await fetch(`${config["HEIGHT_BASE_URL"]}/tasks`, {
    method: "POST",
    headers: {
      "Authorization": `api-key ${config["HEIGHT_SECRET_KEY"]}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: task,
      listIds: [config["HEIGHT_DEFAULT_LIST_UUID"]],
    }),
  });

  console.log(await res.json());
}

main().catch((err) => {
  console.error(err);
  Deno.exit(1);
});
