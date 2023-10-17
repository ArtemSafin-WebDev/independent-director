export default function OrderService(): void {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>(".contact-us__button-tab")]
  // contact-us__button-tab--active

  const tabs = [...document.querySelectorAll<HTMLElement>(".contact-us__tab")]
  tabs.forEach((tab: any) =>{
    let tabDataset = tab.dataset["tab"]
    tabs[1]!.style.display = "none"


      buttons.forEach((button: any) => {
        button.addEventListener("click", () => {
          tab!.style.display = "none"
          let buttonDataset = button.dataset["tab"]

          if(buttonDataset === tabDataset) {
            buttons.forEach((button) => {
              button.classList.remove("contact-us__button-tab--active")
            })

            button.classList.add("contact-us__button-tab--active")
            tab!.style.display = "grid"
          }
      })
    })
  })
}