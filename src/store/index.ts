import useUserStore from "@/store/user"
import useThemeStore from "@/store/theme"
import useLocaleStore from "@/store/locale"

export const user = useUserStore()
export const theme = useThemeStore()
export const locale = useLocaleStore()
