import type { HtmlTagDescriptor } from "vite"

export function injectScripts(scripts: string[]): HtmlTagDescriptor[] {
  return scripts.map(src => {
    return {
      injectTo: "head",
      tag: "script",
      attrs: { src },
    }
  })
}

export function injectLinks(links: Record<string, string | boolean>[]): HtmlTagDescriptor[] {
  return links.map(attrs => {
    return {
      injectTo: "head",
      tag: "link",
      attrs,
    }
  })
}
