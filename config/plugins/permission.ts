/**
 * @description 生成权限类型文件
 */

import path from "path"
import fs from "fs"
import type { Plugin } from "vite"

async function generatePermissionPathsType() {
  try {
    const permissionsDir = path.resolve(__dirname, "../../src/router/permissions")
    const paths = fs
      .readdirSync(permissionsDir)
      .filter(file => file.endsWith(".tsx"))
      .flatMap(file => {
        const fileContent = fs.readFileSync(path.join(permissionsDir, file), "utf-8")
        return [...fileContent.matchAll(/path:\s*["']([^"']+)["']/g)].map(match => match[1])
      })

    const pathUnionType = paths.map(path => ` | "${path}"`).join("\n")
    const content = `declare global {type PermissionPaths =\n${pathUnionType};}export {}`
    fs.writeFileSync(path.resolve(__dirname, "../../src/typings/permission-type.d.ts"), content)
  } catch (error) {
    console.error("❌ Error while generating permissions paths type:", error)
  }
}

export default function (): Plugin {
  return {
    name: "generate-permission-type",
    buildStart() {
      generatePermissionPathsType()
    },
    handleHotUpdate({ file }) {
      if (/\/src\/router\/permissions\/.*\.tsx$/.test(file)) generatePermissionPathsType()
    },
  }
}
