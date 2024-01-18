import { existsSync } from 'fs'
import path from 'path'
import { PackageManager } from './types'
import { PKG_MANAGER_FILES, PKG_MANAGER_NAMES } from './constants'
import spawn from 'cross-spawn'
import { lookpath } from 'lookpath'

export async function pkgManagerInstall({
  /**
   * 包数组
   */
  pkgs,
  /**
   * 包管理工具参数
   */
  options,
  /**
   * 自定义包管理工具
   */
  pkgManager,
}: {
  pkgs: string[]
  options?: string[]
  pkgManager?: PackageManager
}) {
  const cwd = process.cwd()

  const packageManager = pkgManager ?? (await getPkgManager(cwd))

  const args: string[] = ['install', ...pkgs, ...(options ?? [])]

  return new Promise<void>((resolve, reject) => {
    // 使用子进程防止下载包失败影响主进程
    const child = spawn(packageManager, args, { stdio: 'inherit' })

    child.on('close', (code) => {
      if (code !== 0) {
        reject({ command: `${packageManager} ${args.join(' ')}` })
        return
      }

      resolve()
    })
  })
}

async function getPkgManager(baseDir: string): Promise<PackageManager> {
  // 优先找lock文件
  for (const { lockFile, packageManager } of PKG_MANAGER_FILES) {
    if (existsSync(path.join(baseDir, lockFile))) {
      return packageManager as PackageManager
    }
  }

  // 其次找命令
  for (const name of PKG_MANAGER_NAMES) {
    const isExist = await checkPkgManager(name)

    if (isExist) {
      return name
    }
  }

  console.error('未找到包管理器 pnpm/yarn/npm')
  process.exit(0)
}

async function checkPkgManager(name: string) {
  const path = await lookpath(name)
  return Boolean(path)
}
