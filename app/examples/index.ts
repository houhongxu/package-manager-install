import { packageManagerInstall } from "../../packages/package-manager-install/lib/packageManagerInstall";

packageManagerInstall({
  packages: ["@types/ms"],
  options: ["--save-dev"],
});
