import { PackageManager } from './types';
export declare function pkgManagerInstall({ 
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
pkgManager, }: {
    pkgs: string[];
    options?: string[];
    pkgManager?: PackageManager;
}): Promise<void>;
