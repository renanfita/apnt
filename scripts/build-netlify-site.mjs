import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const site = join(root, ".release-staging", "netlify-site");

const files = [
  "index.html",
  "download.html",
  "privacidade.html",
  "checklist.html",
  "mapa_descarte_brasil.html",
  "_headers",
  "_redirects",
  "robots.txt",
  "sitemap.xml",
  "netlify.toml",
];

const directories = ["assets", "vendor", "downloads"];

await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });

for (const file of files) {
  await cp(join(root, file), join(site, file));
}

for (const directory of directories) {
  await cp(join(root, directory), join(site, directory), { recursive: true });
}

console.log(`Site publico preparado em ${site}`);
