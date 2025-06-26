// === Интерфейс для данных карточки из JSON ===
interface CardData {
  name: string;
  role: string;
  description: string;
  image: string;
}

// === Загрузка карточек из JSON ===
fetch('scripts/card.json')
  .then(response => response.json())
  .then((data: CardData[]) => {
    console.log('Данные из card.json:', data);
    renderCards(data);
  })
  .catch(error => {
    console.error('Ошибка загрузки JSON:', error);
  });

// === Создание карточки ===
function createCard(cardData: CardData): string {
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

// === Рендеринг карточек ===
function renderCards(cards: CardData[]): void {
  const cardContainer = document.querySelector<HTMLElement>('.creator__list');

  if (!cardContainer) return;

  cardContainer.innerHTML = '';

  cards.forEach(card => {
    const cardHTML = createCard(card);
    cardContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// === Инициализация Swiper ===
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, существует ли класс Swiper
  if ((window as any).Swiper) {
    new (window as any).Swiper('.swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } else {
    console.warn('Swiper не загружен');
  }
});

// === Модальное окно с формой ===
const form = document.getElementById('contactForm') as HTMLFormElement | null;
const modal = document.getElementById('formModal') as HTMLElement | null;
const openModalBtns = document.querySelectorAll<HTMLButtonElement>('.btn-signup');
const closeModalBtn = document.querySelector<HTMLSpanElement>('.exit-button');
const cancelBtn = document.querySelector<HTMLButtonElement>('.cansel-button');
const exitModalOverlay = document.querySelector<HTMLDivElement>('.modal-overlay');

function openModal(): void {
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
}

function closeModal(): void {
  if (!modal) return;
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  if (form) form.reset(); // Очистить форму после закрытия
}

openModalBtns.forEach(btn => {
  btn.addEventListener('click', openModal);
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', closeModal);
}

if (exitModalOverlay) {
  exitModalOverlay.addEventListener('click', closeModal);
}

// Закрыть форму при клике вне формы
document.addEventListener('click', (e: MouseEvent) => {
  if (modal && e.target === modal) {
    closeModal();
  }
});

// Обработка отправки формы
if (form) {
  form.addEventListener('submit', function (event: Event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formObject: Record<string, string> = {};

    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    console.log('Данные формы:', formObject);
    closeModal();
  });
}

// === Прелоадер ===
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector<HTMLElement>('.preloader');
  if (preloader) {
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      preloader.remove();
      document.body.style.overflow = '';
    }, 1000);
  }
});