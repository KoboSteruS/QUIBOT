#!/bin/bash

# Скрипт для быстрого запуска приложения в отладочном режиме
# и проверки корректности маршрутов

# Проверяем наличие Python
if ! command -v python3 &> /dev/null; then
    echo "Python 3 не найден. Установите Python 3 для запуска приложения."
    exit 1
fi

# Создаем виртуальное окружение, если оно не существует
if [ ! -d "venv" ]; then
    echo "Создание виртуального окружения..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

# Проверяем наличие обязательных библиотек
echo "Проверка зависимостей..."
python3 -c "import flask, werkzeug, loguru" 2>/dev/null || {
    echo "Устанавливаем зависимости..."
    pip install flask werkzeug loguru
}

# Устанавливаем необходимые пакеты для тестирования
python3 -c "import requests, termcolor" 2>/dev/null || {
    echo "Устанавливаем пакеты для тестирования..."
    pip install requests termcolor
}

# Создаем необходимые директории
mkdir -p logs static/data

# Проверяем наличие JSON файлов для данных
if [ ! -f "static/data/services.json" ]; then
    echo "Создаем пустой файл services.json..."
    echo "{}" > static/data/services.json
fi

if [ ! -f "static/data/reviews.json" ]; then
    echo "Создаем пустой файл reviews.json..."
    echo "[]" > static/data/reviews.json
fi

# Функция для запуска приложения
run_app() {
    echo "Запуск Flask приложения в фоне..."
    python3 app.py &
    APP_PID=$!
    echo "PID приложения: $APP_PID"
    
    # Даем приложению время запуститься
    echo "Ожидание запуска приложения..."
    sleep 3
    
    # Проверяем, запущено ли приложение
    if ps -p $APP_PID > /dev/null; then
        echo "Приложение успешно запущено!"
        
        # Запускаем тест маршрутов
        echo "Проверка маршрутов..."
        python3 test_routes.py
        TEST_RESULT=$?
        
        # Останавливаем приложение
        echo "Остановка приложения..."
        kill $APP_PID
        
        # Выводим результат тестирования
        if [ $TEST_RESULT -eq 0 ]; then
            echo "Все маршруты работают корректно!"
        else
            echo "Обнаружены проблемы с маршрутами!"
            echo "Проверьте настройки в файлах app.py, nginx-config.conf и uwsgi.ini"
        fi
    else
        echo "Не удалось запустить приложение. Проверьте логи на наличие ошибок."
    fi
}

# Запускаем приложение и проверяем маршруты
run_app

echo ""
echo "Для запуска на сервере выполните следующие действия:"
echo "1. Отредактируйте пути в файлах nginx-config.conf и uwsgi.ini"
echo "2. Скопируйте nginx-config.conf в /etc/nginx/sites-available/"
echo "3. Создайте симлинк из sites-available в sites-enabled"
echo "4. Настройте и запустите uWSGI через systemd сервис"
echo ""
echo "Подробные инструкции см. в файле README.md" 