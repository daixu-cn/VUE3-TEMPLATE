import type { ConfigEnv, CSSOptions } from "vite"
import PostcssPresetEnv from "postcss-preset-env"

export default function css(_config: ConfigEnv): CSSOptions {
  return {
    postcss: { plugins: [PostcssPresetEnv()] },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/scss/base/_variables.scss" as *;
          @use "@/assets/styles/scss/base/_mixins.scss" as *;
          @use "@/assets/styles/scss/base/_tools.scss" as *;
          @use "@/assets/styles/scss/base/_z-index.scss" as *;
          @use "@/assets/styles/scss/vendors/element-plus-light.scss";
          @use "@/assets/styles/scss/vendors/element-plus-dark.scss";
        `,
      },
    },
  }
}
