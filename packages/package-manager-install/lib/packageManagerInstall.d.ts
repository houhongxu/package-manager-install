import { PackageManager } from "./types";
export declare function packageManagerInstall({ 
/**
 * 包数组
 */
packages, 
/**
 * 包管理工具参数
 */
options, 
/**
 * 自定义包管理工具
 */
packageManager, }: {
    packages?: string[];
    options?: string[];
    packageManager?: PackageManager;
}): Promise<void>;
