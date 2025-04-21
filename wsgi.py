#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Файл WSGI для запуска приложения на сервере.
Этот файл настраивает запуск Flask-приложения с использованием WSGI-совместимого веб-сервера.
"""

import os
import sys

# Добавляем путь к текущей директории в sys.path для корректного импорта модулей
sys.path.insert(0, os.path.dirname(__file__))

# Импортируем объект application из модуля app
from app import application

# Для запуска с помощью uWSGI или Gunicorn
if __name__ == "__main__":
    # Этот блок кода выполняется, если файл запускается напрямую,
    # а не через WSGI-сервер
    from werkzeug.serving import run_simple
    run_simple('0.0.0.0', 5000, application, use_debugger=True, use_reloader=True) 