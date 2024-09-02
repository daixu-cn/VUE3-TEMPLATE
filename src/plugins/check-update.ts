const timer = setInterval(check, 2000)

/**
 * @description 检查站点更新
 */
async function check() {
  if (!import.meta.env.PROD) return clearInterval(timer)

  const response = await fetch(`/version.json?timestamp=${Date.now()}`)
  const { version } = await response.json()

  if (!localStorage.getItem("version")) {
    localStorage.setItem("version", version)
  } else if (localStorage.getItem("version") !== version) {
    clearInterval(timer)
    alert("检测到有新版本,请刷新页面!")
    localStorage.setItem("version", version)
    location.reload()
  }
}

check()
