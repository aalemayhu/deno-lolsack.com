import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
const s = serve("0.0.0.0:8000");

async function main() {
  const page = `
<!DOCTYPE html>
<html>
  <head>
    <title>Lolsack</title>
    <link rel="stylesheet" type="text/css" href="public/style.css" media="screen" />
    <style>
body {
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; font-weight: 300;
}


img {
  width: 250px;
  margin: auto;
}

ul {
  list-style: none;
}

li {
  display:inline;
}

footer {
  margin-top: auto;
}
    </style>
  </head>
  <body>
    <img src='http://upload.wikimedia.org/wikipedia/commons/7/73/Roflcopter.gif'>
    <p>A simple website served via <a href="https://deno.land">deno</a></p>
    <ul>
      <li>deno: ${Deno.version.deno}</li>
      <li>v8: ${Deno.version.v8}</li>
      <li>typescript: ${Deno.version.typescript}</li>
    </ul>
    <footer>
      <p>The gif is from <a href='http://en.wikipedia.org/wiki/LOL#/media/File:Roflcopter.gif'>Wikipedia</a></p>
      <hr>
      <p>
      Built by <a href="https://github.com/scanf">@scanf</a>
      </p>
    </footer>
  </body>
</html>
`;
  console.log("Serving on http://0.0.0.0:8000");
  for await (const req of s) {
    console.log("request to " + req.url);
    const data = new TextEncoder().encode(page);
    req.respond({ body: data });
  }
}

main();
