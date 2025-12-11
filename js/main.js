
// Выпадающее окно с выборомм города
$(".city-drop-down__value").click(function (event) {
  toggleMenu();
  event.stopPropagation();
});

$('.city-drop-down__item').click(function () {
  $('.city-drop-down__value').html($(this).text());
  toggleMenu(); // При выборе города меню закрывается
});

// ДОБАВЛЕН ОБРАБОТЧИК КЛИКА ДЛЯ КНОПКИ ЗАКРЫТИЯ
$('.close-btn').click(function (event) {
  closeMenu();
  event.stopPropagation(); // Останавливаем всплытие, чтобы не сработал window.addEventListener
});


function toggleMenu() {
  let menu = $(".city-drop-down__dropped");
  if (!menu.hasClass('active')) {
    window.addEventListener('click', closeMenu);
  } else {
    window.removeEventListener('click', closeMenu);
  }
  menu.toggleClass("active");
}

function closeMenu() {
  $(".city-drop-down__dropped").removeClass("active")
  window.removeEventListener('click', closeMenu); // Убедитесь, что слушатель окна тоже удаляется принудительно
}

$('.city-drop-down__dropped').click(function (event) {
  event.stopPropagation();
});


$('.x-input__field').on('input', function () {
  let search = $(this).val();
  searchData(search);
});

function searchData(search) {
  let towns = $('.city-drop-down__item');
  towns.each(function () {
    if ($(this).text().indexOf(search) === -1) {
      $(this).addClass('item_hide');
    } else {
      $(this).removeClass('item_hide');
    }
  });
}



const swiper = new Swiper(".myswiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
});



// Функция обратного вызова Intersection Observer
const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 1. Получаем ID целевого элемента из data-атрибута текущего триггера
      const targetId = entry.target.getAttribute('data-target-id');

      // 2. Находим целевой элемент (тот, который нужно анимировать) по ID
      const targetElement = document.getElementById(targetId);

      // 3. Если элемент найден, добавляем ему класс анимации
      if (targetElement) {
        targetElement.classList.add('is-visible');
      }

      // (Опционально) Прекращаем наблюдение за этим конкретным триггером
      observer.unobserve(entry.target);
    }
  });
};

// Параметры Observer'а
const observerOptions = {
  root: null,
  threshold: 0.1
};

// Создаем единственный экземпляр Intersection Observer
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Находим ВСЕ элементы, которые должны служить триггерами
const triggerElements = document.querySelectorAll('.trust__card-right');

// Запускаем наблюдение за каждым найденным триггером в цикле
triggerElements.forEach(trigger => {
  observer.observe(trigger);
});



wow = new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 0,
  mobile: true,
  live: true
})
wow.init();

// Пример инициализации
flatpickr("#my-date-picker", {
  // Ваши опции здесь

  mode: "range"
});



document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.price__inner');
  const steps = form.querySelectorAll('.step-content');
  const progressSteps = form.querySelectorAll('.progress-bar2 .steps');
  let currentStep = 0;

  function showStep(index) {
    // 1. Показываем только активный контент шага
    steps.forEach((step, i) => {
      step.classList.remove('active');
      if (i === index) {
        step.classList.add('active');
      }
    });

    // 2. Управляем классами 'active' для прогресс-баров:
    //    Устанавливаем класс 'active' для всех шагов до текущего включительно.
    progressSteps.forEach((progressStep, i) => {
      if (i <= index) {
        progressStep.classList.add('active');
      } else {
        // !!! ЭТА ЧАСТЬ УБИРАЕТ КЛАСС ПРИ НАЖАТИИ "НАЗАД" !!!
        progressStep.classList.remove('active');
      }
    });
  }



  // Добавьте функцию валидации текущего шага
  function validateStep(stepIndex) {
    const currentStepEl = steps[stepIndex];
    const inputs = currentStepEl.querySelectorAll('input[required]');
    let isValid = true;

    // Проверка радиокнопок
    if (currentStepEl.querySelector('.options')) {
      const radioGroup = currentStepEl.querySelector('input[type="radio"]');
      if (radioGroup && !currentStepEl.querySelector('input[name="' + radioGroup.name + '"]:checked')) {
        isValid = false;
        // Здесь можно добавить отображение сообщения об ошибке
      }
    }

    // Проверка остальных полей
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        // input.reportValidity(); // Показывает стандартный браузерный попап с ошибкой
        // Здесь можно добавить кастомное отображение ошибки
      }
    });

    return isValid;
  }

  form.addEventListener('click', (e) => {
    if (e.target.classList.contains('next-btn')) {
      if (validateStep(currentStep)) {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }

      }
      else {
        alert('Пожалуйста, сделайте выбор, чтобы продолжить.');
      }
    }
    if (e.target.classList.contains('prev-btn')) {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }

    if (e.target.classList.contains('submit-btn')) {
      if (validateStep(currentStep)) {
        alert('Форма отправлена!');
        // Здесь можно добавить код для отправки данных на сервер

      }
      else {
        alert('Пожалуйста, заполните все поля, чтобы продолжить.');
      }
    }

  });

  showStep(currentStep);
});



// Function to update the background gradient dynamically based on the slider's value
//Функция динамического обновления градиента фона в зависимости от значения ползунка.
function updateSliderBackground(slider, valueDisplay, suffix = '') {
  const min = slider.min;
  const max = slider.max;
  const value = slider.value;
  const percentage = ((value - min) / (max - min)) * 100;

  // Update the displayed text value
  // Обновить отображаемое текстовое значение
  valueDisplay.textContent = value + suffix;

  // Update the gradient fill (progress bar effect)
  // Обновить градиентную заливку (эффект полосы прогресса)
  slider.style.background = `linear-gradient(to right, #4a69ff ${percentage}%, #d3d3d3 ${percentage}%)`;
}


// Get the elements for the first slider (Pages)
// Получить элементы для первого слайдера (Страницы)
const pagesSlider = document.getElementById('pages-slider');
const pagesValueDisplay = document.getElementById('pages-value');

// Get the elements for the second slider (Originality)
// Получить элементы для второго слайдера (Оригинальность)
const originalitySlider = document.getElementById('originality-slider');
const originalityValueDisplay = document.getElementById('originality-value');

// Add event listeners to update values and background when the user interacts with the sliders
// Добавьте прослушиватели событий для обновления значений и фона, когда пользователь взаимодействует с ползунками.
pagesSlider.addEventListener('input', () => {
  updateSliderBackground(pagesSlider, pagesValueDisplay, ' стр');
});

originalitySlider.addEventListener('input', () => {
  updateSliderBackground(originalitySlider, originalityValueDisplay, '%');
});

// Initial call to set the correct value displays and gradient fills on page load
// Первоначальный вызов для установки правильного значения отображения и градиентной заливки при загрузке страницы
updateSliderBackground(pagesSlider, pagesValueDisplay, ' стр');
updateSliderBackground(originalitySlider, originalityValueDisplay, '%');



const input = document.querySelector("#phone");
window.intlTelInput(input, {
  loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.5/build/js/utils.js"),
  initialCountry: "ru"
});

const input1 = document.querySelector("#phone1");
window.intlTelInput(input1, {
  loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.5/build/js/utils.js"),
  initialCountry: "ru"
});

document.addEventListener('DOMContentLoaded', () => {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const fileList = document.getElementById('fileList');

  // Предотвращаем стандартное поведение браузера при перетаскивании (открытие файла)
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Подсветка зоны при перетаскивании (опционально, для стилизации через CSS)
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    uploadArea.classList.add('highlight'); // Добавить класс 'highlight' для CSS стилей
  }

  function unhighlight(e) {
    uploadArea.classList.remove('highlight'); // Удалить класс 'highlight'
  }

  // Обработка файлов, выбранных через стандартный диалог
  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handleFiles(files);
  });

  // Обработка файлов, перетащенных в зону
  uploadArea.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });

  // Основная функция обработки списка файлов
  function handleFiles(files) {
    for (const file of files) {
      if (file) {
        addFileToList(file);
      }
    }
  }

  // Функция добавления файла в список DOM
  function addFileToList(file) {
    // Создаем контейнер для нового файла
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');

    // Добавляем иконку (можно использовать SVG или CSS background)
    const icon = document.createElement('span');
    icon.classList.add('file-icon');
    icon.textContent = '📘'; // Замените на иконку документа

    // Добавляем имя файла
    const name = document.createElement('span');
    name.classList.add('file-name');
    name.textContent = file.name;

    // Добавляем кнопку удаления (крестик)
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = '✕';
    deleteButton.addEventListener('click', () => {
      fileItem.remove(); // Удаляем элемент из DOM
    });

    // Собираем все вместе и добавляем в список
    fileItem.appendChild(icon);
    fileItem.appendChild(name);
    fileItem.appendChild(deleteButton);
    fileList.appendChild(fileItem);
  }
});

function openForm1() {
  document.getElementById("succesModal").style.display = "flex";

}
function closeForm1() {
  document.getElementById("succesModal").style.display = "none";

}
function openForm2() {
  document.getElementById("registModal").style.display = "flex";

}
function closeForm2() {
  document.getElementById("registModal").style.display = "none";

}



/* var mixer = mixitup(container); */

var mixer = mixitup('#container', { // Используйте #ID
  load: {
    filter: '.category-a' // Используйте .класс для фильтра
  }
});

function closeModal() {
  document.getElementById('promoModal').style.display = 'none';
}

// Function to open the modal (you would call this from a button click on the main page)
function openModal() {
  document.getElementById('promoModal').style.display = 'flex';
}

// Optional: close modal when clicking outside of the content area
window.onclick = function (event) {
  const modal = document.getElementById('promoModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.promo__inner');
  const steps = form.querySelectorAll('.promo-step');
  /* const progressSteps = form.querySelectorAll('.progress-bar2 .steps'); */
  let currentStep = 0;

  function showStep(index) {
    // 1. Показываем только активный контент шага
    steps.forEach((step, i) => {
      step.classList.remove('active');
      if (i === index) {
        step.classList.add('active');
      }
    });

    /* // 2. Управляем классами 'active' для прогресс-баров:
    //    Устанавливаем класс 'active' для всех шагов до текущего включительно.
    progressSteps.forEach((progressStep, i) => {
      if (i <= index) {
        progressStep.classList.add('active');
      } else {
        // !!! ЭТА ЧАСТЬ УБИРАЕТ КЛАСС ПРИ НАЖАТИИ "НАЗАД" !!!
        progressStep.classList.remove('active');
      }
    }); */
  }



  // Добавьте функцию валидации текущего шага
  function validateStep(stepIndex) {
    const currentStepEl = steps[stepIndex];
    const inputs = currentStepEl.querySelectorAll('input[required]');
    let isValid = true;

    // Проверка радиокнопок
    if (currentStepEl.querySelector('.options')) {
      const radioGroup = currentStepEl.querySelector('input[type="radio"]');
      if (radioGroup && !currentStepEl.querySelector('input[name="' + radioGroup.name + '"]:checked')) {
        isValid = false;
        // Здесь можно добавить отображение сообщения об ошибке
      }
    }

    // Проверка остальных полей
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        // input.reportValidity(); // Показывает стандартный браузерный попап с ошибкой
        // Здесь можно добавить кастомное отображение ошибки
      }
    });

    return isValid;
  }

  form.addEventListener('click', (e) => {
    if (e.target.classList.contains('promo__button')) {
      if (validateStep(currentStep)) {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      }
      else {
        alert('Пожалуйста, сделайте выбор, чтобы продолжить.');
      }
    }
    if (e.target.classList.contains('prev-btn')) {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }

    if (e.target.classList.contains('submit-btn')) {
      if (validateStep(currentStep)) {
        alert('Промокод применен!');
        // Здесь можно добавить код для отправки данных на сервер
      }
      else {
        alert('Пожалуйста, заполните все поля, чтобы продолжить.');
      }
    }

  });

  showStep(currentStep);
});


  AOS.init();
