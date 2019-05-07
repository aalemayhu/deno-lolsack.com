import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
const s = serve("0.0.0.0:8000");

async function sendFile(req: ServerRequest) {
  const templateFile = await Deno.readFile(`.${req.url}`);
  req.respond({ body: templateFile });
}

function braid(mappings, payload) {
  let mangle = payload;
  for (let key in mappings) {
    const value = mappings[key];
    mangle = mangle.replace(key, value);
  }
  return mangle;
}

async function main() {
  // index.html is treated differently due to the macros inside it.
  const page = "./public/index.html";
  const publicFiles = [
    "/public/Roflcopter.gif",
    "/public/android-chrome-192x192.png",
    "/public/android-chrome-512x512.png",
    "/public/apple-touch-icon.png",
    "/public/favicon-16x16.png",
    "/public/favicon-32x32.png",
    "/public/favicon.ico",
    "/public/site.webmanifest",
    "/public/style.css"
  ];
  const mappings = {
    "{{deno}}": Deno.version.deno,
    "{{v8}}": Deno.version.v8,
    "{{typescript}}": Deno.version.typescript
  };
  for await (const req of s) {
    console.log("request to " + req.url);
    if (publicFiles.includes(req.url)) {
      await sendFile(req);
      continue;
    }

    const decoder = new TextDecoder("utf-8");
    const templateFile = await Deno.readFile(page);

    let templateData = decoder.decode(templateFile);
    templateData = braid(mappings, templateData);

    const data = new TextEncoder().encode(templateData);
    req.respond({ body: data });
  }
}

main();
