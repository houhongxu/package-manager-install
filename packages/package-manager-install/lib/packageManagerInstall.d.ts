import { PackageManager } from "./types";
export declare function packageManagerInstall(config?: {
    /**
     * 包数组
     */
    packages?: string[];
    /**
     * 包管理工具参数
     */
    options?: string[];
    /**
     * 执行目录
     */
    cwd?: string;
    /**
     * 自定义包管理工具
     */
    packageManager?: PackageManager;
}): Promise<void>;
