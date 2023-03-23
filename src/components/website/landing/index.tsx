/** Scrolls to a specific element accounting for the header height. */
export function scrollToElement(elemId: string) {
  const elem = document.getElementById(elemId)
  if (!elem) return

  const elemTop = elem.getBoundingClientRect().y
  const headerHeight =
    document.getElementsByTagName("header")[0]?.getBoundingClientRect()
      ?.height ?? 100

  window.scrollBy({ behavior: "smooth", top: elemTop - headerHeight * 1.5 })
}
