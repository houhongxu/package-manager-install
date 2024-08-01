import { existsSync } from "fs";
import path from "path";
import { PackageManager } from "./types";
import { PACKAGE_MANAGER_FILES, PACKAGE_MANAGER_NAMES } from "./constants";
import spawn from "cross-spawn";
import { lookpath } from "lookpath";

export async function packageManagerInstall(
  /**
   * 包数组
   */
  packages?: string[],

  /**
   * 包管理工具参数
   */
  options?: string[],

  /**
   * 自定义包管理工具
   */
  packageManager?: PackageManager
) {
  const cwd = process.cwd();

  const formatedPackageManager =
    packageManager ?? (await getPackageManager(cwd));

  const args: string[] = ["install", ...(packages ?? []), ...(options ?? [])];

  return new Promise<void>((resolve, reject) => {
    // 使用子进程防止下载包失败影响主进程
    const child = spawn(formatedPackageManager, args, { stdio: "inherit" });

    child.on("close", (code) => {
      if (code !== 0) {
        reject({ command: `${packageManager} ${args.join(" ")}` });
        return;
      }

      resolve();
    });
  });
}

async function getPackageManager(baseDir: string): Promise<PackageManager> {
  // 优先找lock文件
  for (const { lockFile, packageManager } of PACKAGE_MANAGER_FILES) {
    if (existsSync(path.join(baseDir, lockFile))) {
      return packageManager as PackageManager;
    }
  }

  // 其次找命令
  for (const name of PACKAGE_MANAGER_NAMES) {
    const isExist = await checkPackageManager(name);

    if (isExist) {
      return name;
    }
  }

  console.error("未找到包管理器 pnpm/yarn/npm");
  process.exit(0);
}

async function checkPackageManager(name: string) {
  const path = await lookpath(name);

  return Boolean(path);
}
