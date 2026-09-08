# MRGNV Design — лендинг-портфолио

Статичный сайт-визитка графического дизайнера. Без зависимостей: HTML + CSS + JS.

## Запуск

Двойной клик по `index.html` — или через локальный сервер:

```bash
python -m http.server 8000
# открыть http://localhost:8000
```

## Структура

```
mrgnv-design/
├── index.html      — страница
├── css/style.css   — стили (тёмная тема, бирюзовый акцент #2dd4bf, glassmorphism)
├── js/main.js      — меню, эффекты hero (орел/сферы/магнитные кнопки), форма
├── img/            — сюда класть работы
└── README.md
```

## Как добавить свои работы

1. Положи картинку в папку `img/` (например `img/work-1.jpg`).
2. В `index.html` найди блок `<figure class="work-card">` и замени заглушку:

```html
<figure class="work-card reveal">
  <img src="img/work-1.jpg" alt="Название проекта">
  <figcaption>
    <h3 class="work-card__title">Название проекта</h3>
    <span class="work-card__cat">Брендинг</span>
  </figcaption>
</figure>
```

## Как изменить контакты

В секции «Контакты» в `index.html` — актуальные ссылки:

- `mailto:morandvas@gmail.com`
- `https://t.me/morandvas`
- `https://instagram.com/mrgnv.av`
- `https://www.behance.net/andrewmorgunov`

Форма связи заменена визуальной карточкой: заявки принимаются через email,
Telegram, Instagram и Behance (ссылки в секции «Контакты»).

## Публикация (GitHub Pages)

1. Создай репозиторий на GitHub.
2. Загрузи файлы или через git:

```bash
git init
git add .
git commit -m "MRGNV Design"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

3. В настройках репозитория: **Settings → Pages → Branch: main** — готово.
   Сайт будет доступен по адресу `https://USERNAME.github.io/REPO/`.