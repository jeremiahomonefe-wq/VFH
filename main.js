const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.innerHTML = open ? '&times;' : '&#9776;';
});

document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));

document.querySelectorAll('.filters button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.hidden = button.dataset.filter !== 'All' && item.dataset.category !== button.dataset.filter;
    });
  });
});

const lightbox = document.querySelector('.lightbox');
document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    lightbox.querySelector('img').src = item.querySelector('img').src;
    lightbox.classList.add('open');
  });
});
const closeLightbox = () => lightbox?.classList.remove('open');
lightbox?.querySelector('button')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

const form = document.querySelector('.enquiry-form');
const chooseEnquiry = (title) => {
  document.querySelectorAll('.enquiry-tabs button').forEach((button) => {
    button.classList.toggle('active', button.dataset.title === title);
  });
  document.querySelector('#form-title').textContent = title;
  document.querySelector('#interest').value = title;
};

document.querySelectorAll('.enquiry-tabs button').forEach((button) => {
  button.addEventListener('click', () => chooseEnquiry(button.dataset.title));
});

document.querySelectorAll('.contact-options article').forEach((card, index) => {
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  const choices = ['Custom Outfit', 'Training Application', 'Partnership Enquiry'];
  const activate = () => { chooseEnquiry(choices[index]); form?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  card.addEventListener('click', activate);
  card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') activate(); });
});

if (form) {
  form.id = 'training-form';
  if (location.hash === '#training-form') chooseEnquiry('Training Application');
  if (location.hash === '#partnership') chooseEnquiry('Partnership Enquiry');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let status = document.querySelector('.form-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'form-status full';
      status.setAttribute('aria-live', 'polite');
      form.append(status);
    }
    status.style.display = 'block';
    status.textContent = 'Thank you. Please use the WhatsApp link below to send your enquiry until the form is connected to email.';
  });
}
