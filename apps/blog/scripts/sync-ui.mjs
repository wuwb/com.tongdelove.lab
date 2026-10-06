import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// apps/blog
const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.resolve(appDir, "../../packages/ui");
const targetDir = path.join(appDir, ".vendor/ui");

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(sourceDir))) {
    console.log("[sync-ui] packages/ui 不存在，保留已有的 .vendor/ui");
    return;
  }

  await rm(targetDir, { recursive: true, force: true });
  await mkdir(targetDir, { recursive: true });
  await cp(sourceDir, targetDir, {
    recursive: true,
    filter: (src) => !src.split(path.sep).includes("node_modules") && !src.includes(".turbo"),
  });

  // devDependencies 里有 workspace: 协议，独立安装时无法解析，直接剔除
  const pkgPath = path.join(targetDir, "package.json");
  const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
  delete pkg.devDependencies;
  delete pkg.scripts;
  await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  console.log("[sync-ui] packages/ui -> apps/blog/.vendor/ui 同步完成");
}

main().catch((error) => {
  console.error("[sync-ui] 同步失败:", error);
  process.exit(1);
});
