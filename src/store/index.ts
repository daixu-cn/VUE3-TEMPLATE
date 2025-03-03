import useUserStore from "@/store/user"
import useThemeStore from "@/store/theme"
import useLocaleStore from "@/store/locale"

export default function () {
  return {
    user: useUserStore(),
    theme: useThemeStore(),
    locale: useLocaleStore(),
  }
}
