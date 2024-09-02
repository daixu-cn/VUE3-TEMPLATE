import fs from "fs"
import path from "path"

export default function () {
  return {
    name: "create-version",
    buildEnd() {
      const versionPath = path.join(__dirname, "../../public/version.json")
      fs.writeFile(versionPath, JSON.stringify({ version: new Date() }), "utf8", () => {})
    },
  }
}
