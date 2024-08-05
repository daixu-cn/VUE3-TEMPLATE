const timer = setInterval(check, 2000)

/**
 * @description 检查站点更新
 */
async function check() {
  if (!import.meta.env.PROD) return clearInterval(timer)

  const selectors = "script[data-identifier='APP-MAIN-SCRIPT']"
  const response = await fetch(`/?timestamp=${Date.now()}`)
  const content = await response.text()
  const parser = new DOMParser()
  const remote = parser
    .parseFromString(content, "text/html")
    .querySelector<HTMLScriptElement>(selectors)?.src

  const latest = document.querySelector<HTMLScriptElement>(selectors)?.src

  if (latest !== remote) notice()
}

function notice() {
  clearInterval(timer)
  alert("检测到有新版本，请刷新页面！")
  location.reload()
}

check()
