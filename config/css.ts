import type { ConfigEnv, CSSOptions } from "vite"
import PostcssPresetEnv from "postcss-preset-env"
import cssnano from "cssnano"

export default function css(_config: ConfigEnv): CSSOptions {
  return {
    postcss: { plugins: [PostcssPresetEnv(), cssnano()] },
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `
          @use "@/assets/styles/scss/base/_variables.scss" as *;
          @use "@/assets/styles/scss/base/_function.scss" as *;
          @use "@/assets/styles/scss/base/_mixins.scss" as *;
          @use "@/assets/styles/scss/vendors/element-plus-config.scss" as *;
          @use "@/assets/styles/scss/vendors/element-plus-light.scss" as *;
          @use "@/assets/styles/scss/vendors/element-plus-dark.scss" as *;
        `,
      },
    },
  }
}
