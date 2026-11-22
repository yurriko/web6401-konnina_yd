
// Класс «Новогодняя анкета гостя»
class GuestRegistration {
  constructor(name, email, count, plan, wishes, consent) {
    this.name = name;
    this.email = email;
    this.count = count;
    this.plan = plan;
    this.wishes = wishes;
    this.consent = consent;
  }

  // Форматированный вывод в консоль
  print() {
    console.log(
        "===== Новогодняя анкета гостя =====\n" +
        `Имя:             ${this.name}\n` +
        `Почта:           ${this.email}\n` +
        `Количество гостей: ${this.count}\n` +
        `Развлечение:     ${this.plan}\n` +
        `Пожелания:       ${this.wishes || "нет"}\n` +
        `Согласие:        ${this.consent ? "да" : "нет"}\n` +
        "=================================="
    );
  }
}

const form = document.getElementById("guest-form");
const message = document.getElementById("form-message");

// Обрабатываем отправку формы
form.addEventListener("submit", function (event) {
  // Отменяем стандартную отправку и перезагрузку страницы
  event.preventDefault();

  // Создаём объект с введёнными данными
  const guest = new GuestRegistration(
      form.elements.namedItem("name").value,
      form.elements.namedItem("email").value,
      form.elements.namedItem("count").value,
      form.elements.namedItem("plan").value,
      form.elements.namedItem("wishes").value,
      form.elements.namedItem("consent").checked
  );

  // Выводим информацию об объекте в консоль
  guest.print();

  // Показываем сообщение об обработке анкеты
  message.textContent = "Анкета обработана!";
  message.classList.remove("form__message--hidden");

  // Очищаем поля
  form.reset();
});
