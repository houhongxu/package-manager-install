import { PackageManager } from './types'

export const PKG_MANAGER_FILES = [
  { lockFile: 'yarn.lock', packageManager: 'yarn' },
  { lockFile: 'pnpm-lock.yaml', packageManager: 'pnpm' },
  { lockFile: 'package-lock.json', packageManager: 'npm' },
]

export const PKG_MANAGER_NAMES: PackageManager[] = ['pnpm', 'yarn', 'npm']
