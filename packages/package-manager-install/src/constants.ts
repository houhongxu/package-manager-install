import { PackageManager } from './types'

export const PACKAGE_MANAGER_FILES = [
  { lockFile: 'yarn.lock', packageManager: 'yarn' },
  { lockFile: 'pnpm-lock.yaml', packageManager: 'pnpm' },
  { lockFile: 'package-lock.json', packageManager: 'npm' },
]

export const PACKAGE_MANAGER_NAMES: PackageManager[] = ['pnpm', 'yarn', 'npm']
