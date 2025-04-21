#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Файл WSGI для запуска приложения на сервере.
Этот файл настраивает запуск Flask-приложения с использованием WSGI-совместимого веб-сервера.
Приложение настроено для работы с префиксом URL /lessons.
"""

import os
import sys

# Добавляем путь к текущей директории в sys.path для корректного импорта модулей
sys.path.insert(0, os.path.dirname(__file__))

# Импортируем объект application из модуля app
# Важно: application - это диспетчер, который монтирует Flask-приложение по пути /lessons
from app import application

# Для локальной отладки
if __name__ == "__main__":
    # Этот блок кода выполняется, если файл запускается напрямую,
    # а не через WSGI-сервер
    from werkzeug.serving import run_simple
    
    print("=================================================")
    print("Запуск приложения в режиме отладки")
    print("Доступные URL:")
    print("- http://localhost:5000/ -> перенаправляет на /lessons")
    print("- http://localhost:5000/lessons -> главная страница")
    print("=================================================")
    
    # Запуск приложения на всех интерфейсах (0.0.0.0) на порту 5000
    run_simple('0.0.0.0', 5000, application, use_debugger=True, use_reloader=True) 