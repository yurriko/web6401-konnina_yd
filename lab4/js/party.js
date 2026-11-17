"use strict";

/**
 * Заявка на новогоднюю вечеринку.
 * Хранит введённые в форму данные и умеет красиво выводить их в консоль.
 */
class PartyRequest {
  /**
   * @param {string} name      имя
   * @param {string} email     e-mail
   * @param {string} date      дата праздника (ГГГГ-ММ-ДД)
   * @param {number} guests    количество гостей
   * @param {string} format    формат праздника
   * @param {string} cook      кто готовит
   * @param {string[]} dishes  выбранные закуски
   * @param {string} comment   пожелания
   * @param {boolean} agree    согласие на обработку данных
   */
  constructor(name, email, date, guests, format, cook, dishes, comment, agree) {
    this.name = name;
    this.email = email;
    this.date = date;
    this.guests = guests;
    this.format = format;
    this.cook = cook;
    this.dishes = dishes;
    this.comment = comment;
    this.agree = agree;
    this.createdAt = new Date();
  }

  /** Дата в формате «31 декабря 2026 г.» */
  get formattedDate() {
    return new Date(`${this.date}T00:00`).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  /** Форматированный вывод заявки в консоль */
  print() {
    // Цвет берём из CSS-переменной, чтобы не дублировать палитру в JS
    const red = getComputedStyle(document.documentElement).getPropertyValue("--color-red");
    console.group(
      "%c🎄 Новая заявка на праздник",
      `color: ${red}; font-size: 16px; font-weight: bold;`,
    );
    console.log(`Имя:          ${this.name}`);
    console.log(`E-mail:       ${this.email}`);
    console.log(`Дата:         ${this.formattedDate}`);
    console.log(`Гостей:       ${this.guests}`);
    console.log(`Формат:       ${this.format}`);
    console.log(`Готовит:      ${this.cook}`);
    console.log(`Закуски:      ${this.dishes.length ? this.dishes.join(", ") : "—"}`);
    console.log(`Пожелания:    ${this.comment || "—"}`);
    console.log(`Согласие:     ${this.agree ? "да" : "нет"}`);
    console.log(`Создана:      ${this.createdAt.toLocaleString("ru-RU")}`);
    console.table({ ...this, createdAt: this.createdAt.toISOString() });
    console.groupEnd();
  }
}

const form = document.getElementById("party-form");
const result = document.getElementById("party-result");

form.addEventListener("submit", (event) => {
  // Отменяем перезагрузку страницы: «сервер» у нас – консоль
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);

  const request = new PartyRequest(
    data.get("name").trim(),
    data.get("email").trim(),
    data.get("date"),
    Number(data.get("guests")),
    data.get("format"),
    data.get("cook"),
    data.getAll("dishes"),
    data.get("comment").trim(),
    data.get("agree") === "on",
  );

  request.print();

  result.textContent = `Спасибо, ${request.name}! Заявка на ${request.formattedDate} принята – данные выведены в консоль`;
  result.hidden = false;
});
