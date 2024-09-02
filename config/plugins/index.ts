import { loadEnv } from "vite"
import type { PluginOption, ConfigEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import ElementPlus from "unplugin-element-plus/vite"
import AutoImport from "unplugin-auto-import/vite"
import progress from "vite-plugin-progress"
import { visualizer } from "rollup-plugin-visualizer"
import viteCompression from "vite-plugin-compression"
import { createHtmlPlugin } from "vite-plugin-html"
import legacy from "@vitejs/plugin-legacy"
import version from "./version"
import { injectScripts, injectLinks } from "../inject-tags"

export default function plugins({ mode }: ConfigEnv): PluginOption[] {
  const env = loadEnv(mode, process.cwd(), "")
  const scripts = injectScripts([env.VITE_ICON_ICONFONT])
  const links = injectLinks([
    { rel: "stylesheet", type: "text/css", href: "/src/assets/styles/css/loading.css" },
  ])

  return [
    vue(),
    vueJsx(),
    progress(),
    legacy(),
    Components({
      dts: "./src/typings/components.d.ts",
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    AutoImport({ imports: ["vue"], dts: "./src/typings/auto-imports.d.ts" }),
    createHtmlPlugin({
      minify: true,
      entry: "src/main.ts",
      inject: { tags: [...scripts, ...links] },
    }),
    viteCompression({ threshold: 10240 }),
    visualizer({ filename: "statistic.html" }),
    ElementPlus({ useSource: true, defaultLocale: "zh-cn" }),
    version(),
  ]
}
