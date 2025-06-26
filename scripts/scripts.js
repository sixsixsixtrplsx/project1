// === Загрузка карточек из JSON ===
fetch('scripts/card.json')
  .then(response => response.json())
  .then(data => {
    console.log('Данные из card.json:', data);
    renderCards(data);
  });

function createCard(cardData) {
  return `
    <a class="creator__item" href="#">
      <p class="creator__description">${cardData.description}</p>
      <div class="creator__user">
        <div class="card__icon">
          <img src="${cardData.image}" alt="${cardData.name}">
        </div>
        <div class="creator__info">
          <p class="creator__name">${cardData.name}</p>
          <p class="creator__role">${cardData.role}</p>
        </div>
      </div>
    </a>
  `;
}

function renderCards(cards) {
  const cardContainer = document.querySelector(".creator__list");

  if (!cardContainer) return;

  cardContainer.innerHTML = '';

  cards.forEach(card => {
    const cardHTML = createCard(card);
    cardContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// === Инициализация Swiper ===
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});

// === Модальная форма ===
// === Модальное окно с формой ===
const form = document.getElementById('contactForm');
const modal = document.getElementById('formModal');
const openModalBtns = document.querySelectorAll('.btn-signup');
const closeModalBtn = document.querySelector('.exit-button');
const cancelBtn = document.querySelector('.cansel-button');
const exitModalOverlay = document.querySelector('.modal-overlay');

function openModal() {
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  form.reset(); // Очистить форму после закрытия
}

openModalBtns.forEach(btn => {
  btn.addEventListener('click', openModal);
});

closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
exitModalOverlay.addEventListener('click', closeModal);

// Закрыть форму при клике вне её
document.addEventListener('click', function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Обработка отправки формы
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  console.log('Данные формы:', formObject); 
  closeModal();
});

// === Прелоадер ===
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    preloader.remove();
    document.body.style.overflow = '';
  }, 1000);
});