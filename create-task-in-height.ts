#!/usr/bin/env -S deno run --allow-read=.env,.env.defaults --allow-env --allow-net

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Create todo in Height app
// @raycast.mode compact

// Optional parameters:
// @raycast.icon ✅
// @raycast.argument1 { "type": "text", "placeholder": "name" }
// @raycast.argument2 { "type": "text", "placeholder": "effort", "optional": true }
// @raycast.argument3 { "type": "text", "placeholder": "priority", "optional": true }

// Documentation:
// @raycast.author @atenni
// @raycast.authorURL https://github.com/atenni/raycast-scripts
// @raycast.description Create a todo in the Height app, with an optional effort and priority.

import { config as loadConfig } from "https://deno.land/std@0.157.0/dotenv/mod.ts";

const config = await loadConfig();

async function main() {
  const [name, effort, priority] = Deno.args; // `effort` and `priority` are empty strings if not provided
  let feedback = "Success!";

  // Create fields array
  const fields = [];

  // Map effort to its UUID
  if (["1", "2", "3"].includes(effort)) {
    fields.push({
      fieldTemplateId: config["HEIGHT_EFFORT_FIELD_TEMPLATE_UUID"],
      value: config[`HEIGHT_EFFORT_${effort}_UUID`],
    });
  } else if (effort) {
    feedback = `${feedback} Effort ignored - must be 1, 2, or 3.`;
  }

  // Map priority to its UUID
  if (["1", "2", "3"].includes(priority)) {
    fields.push({
      fieldTemplateId: config["HEIGHT_PRIORITY_FIELD_TEMPLATE_UUID"],
      value: config[`HEIGHT_PRIORITY_${priority}_UUID`],
    });
  } else if (priority) {
    feedback = `${feedback} Priority ignored - must be 1, 2, or 3.`;
  }

  // Add the task to the default list
  await fetch(`${config["HEIGHT_BASE_URL"]}/tasks`, {
    method: "POST",
    headers: {
      "Authorization": `api-key ${config["HEIGHT_SECRET_KEY"]}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      listIds: [config["HEIGHT_DEFAULT_LIST_UUID"]],
      fields,
    }),
  });

  console.log(feedback);
}

main().catch((err) => {
  console.error(err);
  Deno.exit(1);
});
