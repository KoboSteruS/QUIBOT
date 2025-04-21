#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Утилита для тестирования маршрутов Flask-приложения.
Запускайте перед деплоем для проверки корректности маршрутизации.
"""

import requests
import sys
import argparse
from termcolor import colored

def test_routes(base_url, with_colors=True):
    """Тестирует маршруты приложения и выводит результаты."""
    
    # Определяем маршруты для проверки
    routes = [
        # (путь, ожидаемый код статуса, описание)
        ('/', 301, 'Перенаправление с корня на /lessons'),
        ('/lessons', 200, 'Главная страница (lessons)'),
        ('/lessons/static/css/styles.css', 200, 'Загрузка CSS'),
        ('/lessons/static/js/script.js', 200, 'Загрузка JavaScript'),
        ('/lessons/services', 200, 'Страница услуг'),
        ('/lessons/api/services', 200, 'API услуг'),
        ('/lessons/api/reviews', 200, 'API отзывов'),
        ('/lessons/nonexistent', 404, 'Несуществующий маршрут')
    ]
    
    results = []
    for route, expected_status, description in routes:
        full_url = f"{base_url.rstrip('/')}{route}"
        try:
            response = requests.get(full_url, allow_redirects=False)
            status = response.status_code
            
            success = status == expected_status
            
            if with_colors:
                status_str = colored(str(status), 'green' if success else 'red')
                expected_str = colored(str(expected_status), 'green')
                result_str = colored('✓ OK', 'green') if success else colored('✗ FAILED', 'red')
            else:
                status_str = str(status)
                expected_str = str(expected_status)
                result_str = '✓ OK' if success else '✗ FAILED'
                
            results.append({
                'url': full_url,
                'status': status,
                'expected': expected_status,
                'success': success,
                'description': description,
                'display': f"{result_str} {full_url} → {status_str} (expected: {expected_str}) - {description}"
            })
            
        except requests.RequestException as e:
            if with_colors:
                results.append({
                    'url': full_url,
                    'success': False,
                    'display': colored(f"✗ ERROR {full_url} - {str(e)}", 'red')
                })
            else:
                results.append({
                    'url': full_url,
                    'success': False,
                    'display': f"✗ ERROR {full_url} - {str(e)}"
                })
    
    # Выводим результаты
    success_count = sum(1 for r in results if r.get('success', False))
    print("\n".join(r['display'] for r in results))
    print(f"\nИтого: {success_count}/{len(results)} успешных маршрутов")
    
    return success_count == len(results)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Тестирование маршрутов Flask-приложения')
    parser.add_argument('--url', default='http://localhost:5000',
                      help='Базовый URL для тестирования (по умолчанию: http://localhost:5000)')
    parser.add_argument('--no-color', action='store_true',
                      help='Отключить цветной вывод')
    
    args = parser.parse_args()
    
    print(f"Тестирование маршрутов для {args.url}...")
    success = test_routes(args.url, not args.no_color)
    
    if not success:
        print("\nОбнаружены проблемы с маршрутизацией!")
        sys.exit(1)
    else:
        print("\nВсе маршруты работают корректно!")
        sys.exit(0) 