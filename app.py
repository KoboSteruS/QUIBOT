from flask import Flask, render_template, jsonify, redirect, url_for
import json
import os
from loguru import logger
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple

# Настройка логгера
logger.add("logs/app.log", rotation="500 MB", level="INFO", 
           format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}")

app = Flask(__name__)

# Загрузка данных из JSON-файла
def load_services_data():
    try:
        with open('static/data/services.json', 'r', encoding='utf-8') as file:
            logger.info("Данные услуг успешно загружены")
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        logger.error(f"Ошибка при загрузке данных услуг: {e}")
        return {}

# Загрузка данных отзывов из JSON-файла
def load_reviews_data():
    try:
        with open('static/data/reviews.json', 'r', encoding='utf-8') as file:
            logger.info("Данные отзывов успешно загружены")
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        logger.error(f"Ошибка при загрузке данных отзывов: {e}")
        return []

# Добавляем маршрут к корню, который перенаправляет к основному маршруту приложения
@app.route('/lessons')
def lessons_index():
    logger.info("Перенаправление с /lessons на корень")
    return redirect(url_for('index'))

@app.route('/')
def index():
    logger.info("Запрос главной страницы")
    return render_template('index.html')

@app.route('/services')
def all_services():
    logger.info("Запрос страницы со всеми доработками")
    return render_template('all-services.html')

@app.route('/api/services')
def get_services():
    logger.info("Запрос API данных услуг")
    return jsonify(load_services_data())

@app.route('/api/reviews')
def get_reviews():
    logger.info("Запрос API данных отзывов")
    return jsonify(load_reviews_data())

@app.errorhandler(404)
def page_not_found(e):
    logger.warning(f"Страница не найдена: {e}")
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    logger.error(f"Ошибка сервера: {e}")
    return render_template('500.html'), 500

# Настройка приложения для корректной работы под префиксом URL
# Оборачиваем Flask-приложение для работы с префиксом /lessons без необходимости его указывать в маршрутах
# Это позволит приложению отвечать на запросы к https://1c.analizator.mp/lessons
# и автоматически обрабатывать все дочерние маршруты
dummy_app = Flask('dummy')

# Добавляем к корню пустого приложения редирект на основное приложение
@dummy_app.route('/')
def dummy_index():
    return redirect('/lessons')

application = DispatcherMiddleware(dummy_app, {
    '/lessons': app
})

if __name__ == '__main__':
    os.makedirs('static/data', exist_ok=True)
    os.makedirs('logs', exist_ok=True)

    if not os.path.exists('static/data/services.json'):
        with open('static/data/services.json', 'w', encoding='utf-8') as f:
            json.dump({}, f, ensure_ascii=False)
            logger.info("Создан пустой файл services.json")

    if not os.path.exists('static/data/reviews.json'):
        with open('static/data/reviews.json', 'w', encoding='utf-8') as f:
            json.dump([], f, ensure_ascii=False)
            logger.info("Создан пустой файл reviews.json")

    logger.info("Приложение запущено")
    run_simple('0.0.0.0', 5000, application, use_debugger=True, use_reloader=True)