export default function accordion(): void {
  const activeClass: string = "--active"
  const accordions = [...document.querySelectorAll<HTMLElement>(".js-accord")]

  function openAccordion(accordionContent: HTMLElement, height: number, ...args: HTMLElement[]): void {
    accordionContent.style.maxHeight = `${height}px`
    accordionContent.classList.add(activeClass)

    args.forEach((element: HTMLElement) => {
      element.classList.add(activeClass)
    })
  }

  function closeAccordion(accordionContent: HTMLElement, ...args: HTMLElement[]): void {
    accordionContent.style.maxHeight = `0px`
    accordionContent.classList.remove(activeClass)

    args.forEach((element: HTMLElement) => {
      element.classList.remove(activeClass)
    })
  }

  function initAccordion(accordions: HTMLElement[]): void {
    accordions.forEach((accordion: HTMLElement) => {
      let accordionContainers = [...accordion?.children] as HTMLElement[]

      accordionContainers.forEach((container) => {

        const accordionButton = container?.children[0] as HTMLElement
        const accordionContent = container?.children[1] as HTMLElement

        let intermediateValue = false

        accordionButton.addEventListener("click", () => {
          intermediateValue = !intermediateValue

          intermediateValue
            ? openAccordion(accordionContent, accordionContent.scrollHeight, accordionButton, container)
            : closeAccordion(accordionContent, accordionButton, container)
        })
      })
    })
  }

  if(!window.matchMedia("(max-width: 645px)").matches) {
    initAccordion(accordions)
  }
}