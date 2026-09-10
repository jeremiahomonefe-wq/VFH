document.querySelector(".menu-toggle")?.addEventListener("click", (e) => {
  const n = document.querySelector("nav"),
    open = n.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
  e.currentTarget.textContent = open ? "×" : "☰";
});
document.querySelector("#year") &&
  (document.querySelector("#year").textContent = new Date().getFullYear());
document.querySelectorAll(".filters button").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll(".filters button")
      .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    document
      .querySelectorAll(".gallery-item")
      .forEach(
        (i) =>
          (i.hidden =
            b.dataset.filter !== "All" &&
            i.dataset.category !== b.dataset.filter),
      );
  }),
);
document.querySelectorAll(".gallery-item").forEach((i) =>
  i.addEventListener("click", () => {
    const l = document.querySelector(".lightbox");
    l.querySelector("img").src = i.querySelector("img").src;
    l.classList.add("open");
  }),
);
document
  .querySelector(".lightbox button")
  ?.addEventListener("click", () =>
    document.querySelector(".lightbox").classList.remove("open"),
  );
document.querySelector(".lightbox")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove("open");
});
document.querySelectorAll(".enquiry-tabs button").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll(".enquiry-tabs button")
      .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    document.querySelector("#form-title").textContent = b.dataset.title;
    document.querySelector("#interest").value = b.dataset.title;
  }),
);

// Give each visitor a clear primary next step without adding visual clutter.
const page = location.pathname.split("/").pop() || "index.html";
const navCta = document.querySelector(".nav-cta");
if (navCta) {
  const trainingPage = ["training.html", "facilities.html"].includes(page);
  navCta.textContent = trainingPage ? "Apply for Training" : "Book an Outfit";
  if (trainingPage) navCta.href = "contact.html#training-form";
}
if (page === "index.html") {
  const primary = document.querySelector(".hero .actions .button"),
    secondary = document.querySelector(".hero .actions .text-link");
  if (primary) {
    primary.textContent = "Book an Outfit";
    primary.href = "contact.html";
  }
  if (secondary) {
    secondary.innerHTML = "Apply for Training <span>↗</span>";
    secondary.href = "training.html";
  }
}
if (page === "about.html") {
  const partner = document.querySelector(".final-cta .button");
  if (partner) {
    partner.textContent = "Partner With Us";
    partner.href = "contact.html#enquiry";
  }
}
const enquiryForm = document.querySelector(".enquiry-form");
if (enquiryForm) {
  enquiryForm.id = "training-form";
  if (location.hash === "#training-form") enquiryForm.scrollIntoView();
  enquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let status = document.querySelector(".form-status");
    if (!status) {
      status = document.createElement("p");
      status.className = "form-status full";
      status.setAttribute("aria-live", "polite");
      enquiryForm.append(status);
    }
    status.style.display = "block";
    status.textContent =
      "Thank you. Please connect the form to your preferred email or CRM service before publishing.";
  });
}
