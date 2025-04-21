# 1C:Analizator Landing Page

Адаптивный лендинг для сервиса управленческого учета для селлеров на маркетплейсах с использованием Flask.

## Описание проекта

Проект представляет собой одностраничный сайт для компании, предоставляющей услуги автоматизации учета для продавцов на маркетплейсах. Сайт включает следующие разделы:

- Главная секция с призывом к действию
- Преимущества системы
- Этапы внедрения
- Опыт команды
- Список доработок и услуг
- Стоимость услуг
- Отзывы клиентов
- Форма обратной связи

Кроме того, реализованы детальные страницы для каждой услуги с возможностью оформления заказа.

## Технологии

- Python 3.8+
- Flask (микрофреймворк для веб-приложений)
- HTML5
- CSS3 (с использованием переменных CSS и модульной структуры)
- JavaScript (vanilla, без фреймворков)
- Адаптивный дизайн для мобильных устройств и планшетов
- Анимации на CSS и JavaScript

## Структура проекта

```
├── app.py                # Основной Flask-приложение
├── static/               # Статические файлы
│   ├── css/              # CSS стили
│   │   ├── normalize.css # Нормализация стилей браузера
│   │   ├── styles.css    # Основные стили
│   │   ├── components.css # Стили компонентов
│   │   ├── animations.css # Стили анимаций
│   │   └── service-detail.css # Стили детальной страницы услуг
│   ├── js/               # JavaScript файлы
│   │   └── script.js     # Основной скрипт
│   ├── img/              # Изображения сайта
│   └── data/             # JSON данные
│       ├── services.json # Данные об услугах
│       └── reviews.json  # Данные об отзывах
└── templates/            # HTML шаблоны
    ├── index.html        # Главная страница
    └── service_detail.html # Шаблон детальной страницы услуги
```

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone <url-репозитория>
cd 1cLending
```

2. Создайте виртуальное окружение и активируйте его:
```bash
# Для Windows
python -m venv venv
venv\Scripts\activate

# Для macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Установите зависимости:
```bash
pip install -r requirements.txt
```

4. Запустите приложение:
```bash
python app.py
```

5. Откройте в браузере адрес http://127.0.0.1:5000/

## Функциональность

- **Адаптивный дизайн:** сайт корректно отображается на устройствах с разными размерами экрана.
- **Плавная анимация:** при прокрутке страницы элементы плавно появляются на экране.
- **Модальные окна:** быстрый просмотр информации об услугах без перезагрузки страницы.
- **Слайдер отзывов:** автоматический слайдер с отзывами клиентов.
- **Формы обратной связи:** возможность оставить заявку или заказать услугу.
- **Плавный скролл:** кнопки и ссылки в навигации плавно прокручивают страницу до нужного раздела.

## Кастомизация

### Изменение цветовой схемы

Цветовая схема настраивается через CSS-переменные в файле `static/css/styles.css`:

```css
:root {
    --color-primary: #2c3e50;     /* Основной цвет */
    --color-secondary: #1abc9c;   /* Акцентный цвет */
    --color-accent: #3498db;      /* Дополнительный акцент */
    /* другие переменные */
}
```

### Добавление/изменение услуг

Услуги настраиваются через JSON-файл `static/data/services.json`. Для добавления новой услуги добавьте новый объект в формате:

```json
"service_id": {
    "title": "Название услуги",
    "description": "Краткое описание",
    "details": "Подробное описание",
    "price": "от XX XXX ₽",
    "duration": "Срок выполнения"
}
```

### Добавление/изменение отзывов

Отзывы настраиваются через JSON-файл `static/data/reviews.json`. Для добавления нового отзыва добавьте новый объект в формате:

```json
{
    "id": X,
    "name": "Имя клиента",
    "company": "Название компании",
    "position": "Должность",
    "text": "Текст отзыва",
    "rating": 5,
    "date": "ДД.ММ.ГГГГ"
}
```

## Лицензия

Проект распространяется под лицензией MIT.

# 1C:Analizator - Веб-приложение

Управленческий учёт для селлеров маркетплейсов. Веб-приложение на Flask.

## Инструкция по установке на сервер

### Предварительные требования

- Python 3.8+
- Nginx
- uWSGI
- Сертификаты SSL (Let's Encrypt)

### Шаг 1: Подготовка окружения

```bash
# Клонирование репозитория
git clone <url-репозитория> /path/to/your/app
cd /path/to/your/app

# Создание виртуального окружения
python3 -m venv venv
source venv/bin/activate

# Установка зависимостей
pip install -r requirements.txt

# Создание необходимых директорий
mkdir -p logs static/data
```

### Шаг 2: Настройка файлов конфигурации

1. **Отредактируйте пути в конфигурационных файлах**:
   - `uwsgi.ini`: замените `/path/to/your/app` на фактический путь к приложению
   - `nginx-config.conf`: 
     - Замените `/path/to/your/app` на фактический путь
     - Убедитесь, что пути к SSL-сертификатам верны

### Шаг 3: Настройка Nginx

1. Скопируйте файл конфигурации в директорию Nginx:

```bash
sudo cp nginx-config.conf /etc/nginx/sites-available/1c.analizator.mp
sudo ln -s /etc/nginx/sites-available/1c.analizator.mp /etc/nginx/sites-enabled/
```

2. Проверьте конфигурацию и перезапустите Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Шаг 4: Настройка uWSGI

1. Запуск uWSGI как сервиса:

```bash
# Создайте systemd сервис для uWSGI
sudo nano /etc/systemd/system/uwsgi-1canalizator.service
```

2. Содержимое файла сервиса:

```ini
[Unit]
Description=uWSGI service for 1C:Analizator
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/your/app
ExecStart=/path/to/your/app/venv/bin/uwsgi --ini uwsgi.ini
Restart=always
KillSignal=SIGQUIT
Type=notify
StandardError=syslog
NotifyAccess=all

[Install]
WantedBy=multi-user.target
```

3. Запуск и включение сервиса:

```bash
sudo systemctl start uwsgi-1canalizator
sudo systemctl enable uwsgi-1canalizator
```

### Шаг 5: Проверка работоспособности

1. Проверьте статус сервисов:

```bash
sudo systemctl status uwsgi-1canalizator
sudo systemctl status nginx
```

2. Проверьте логи на наличие ошибок:

```bash
tail -f /path/to/your/app/logs/uwsgi.log
tail -f /path/to/your/app/logs/app.log
tail -f /var/log/nginx/1c.analizator.mp.error.log
```

### Специфика настройки для работы по URL с префиксом /lessons

Приложение настроено для работы по URL с префиксом `/lessons` (https://1c.analizator.mp/lessons).

Основные моменты, которые это обеспечивают:

1. **В app.py** используется DispatcherMiddleware для монтирования приложения по пути `/lessons`
2. **В Nginx** настроено перенаправление с корня сайта на `/lessons`
3. **В uWSGI** прописана маршрутизация через `mount = /lessons=wsgi.py`

### Устранение неполадок

#### Проблема с 404 ошибкой

Если вы получаете ошибку 404 при доступе к сайту:

1. Проверьте маршрутизацию в файле app.py
2. Убедитесь, что настройки Nginx правильны и статические файлы доступны
3. Проверьте логи uWSGI и Nginx на наличие ошибок

#### Проблема с загрузкой статических файлов

Если статические файлы (CSS, JavaScript) не загружаются:

1. Проверьте настройки location в Nginx:

```nginx
location /lessons/static/ {
    alias /path/to/your/app/static/;
    # ...
}
```

2. Убедитесь, что пути указаны корректно

### Обновление приложения

```bash
cd /path/to/your/app
git pull
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart uwsgi-1canalizator
``` 