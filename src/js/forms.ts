import Validator from "./classes/Validator";
import axios from "axios";

export default function forms() {
  const forms = Array.from<HTMLFormElement>(
    document.querySelectorAll(".js-form")
  );

  const successModal = document.querySelector<HTMLElement>("#callback-success");
  const errorModal = document.querySelector<HTMLElement>("#callback-error");

  const closeModalBtns = Array.from(
    document.querySelectorAll<HTMLElement>(".js-modal-close")
  );

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      const modal = btn.closest<HTMLElement>(".js-modal");
      if (modal) modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    });
  });

  forms.forEach((form) => {
    const formValidator = new Validator(form);
    const controller = new AbortController();

    const handleFormSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      if (!formValidator || !form) return;
      formValidator.validate();

      if (formValidator.valid) {
        const formData = new FormData(form);

        axios
          .post(form.action, formData, {
            signal: controller.signal,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            document.body.classList.add("modal-open");
            successModal?.classList.add("active");
            if (form) {
              form.reset();
            }
          })
          .catch((err) => {
            document.body.classList.add("modal-open");
            errorModal?.classList.add("active");
            console.error(err);
          });
      }
    };
    form.addEventListener("submit", handleFormSubmit);
  });
}
