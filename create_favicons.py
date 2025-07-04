from PIL import Image
import os

def create_favicon(input_path, output_dir, size):
    try:
        # Открываем изображение
        with Image.open(input_path) as img:
            # Конвертируем в RGBA для обеспечения прозрачности
            img = img.convert('RGBA')
            
            # Изменяем размер с сохранением пропорций
            img = img.resize((size, size), Image.Resampling.LANCZOS)
            
            # Создаем новое изображение с полностью прозрачным фоном
            new_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
            
            # Вычисляем позицию для центрирования
            position = ((size - img.size[0]) // 2,
                       (size - img.size[1]) // 2)
            
            # Накладываем изображение с учетом прозрачности
            new_img.paste(img, position, img)
            
            # Сохраняем PNG версию
            png_path = os.path.join(output_dir, "favicon.png")
            new_img.save(png_path, 'PNG')
            print(f"Created PNG: {png_path}")
            
            # Создаем и сохраняем уменьшенную ICO версию для поддержки старых браузеров
            ico_size = 32  # стандартный размер для ico
            ico_img = new_img.resize((ico_size, ico_size), Image.Resampling.LANCZOS)
            ico_path = os.path.join(output_dir, "favicon.ico")
            ico_img.save(ico_path, format='ICO', sizes=[(ico_size, ico_size)])
            print(f"Created ICO: {ico_path}")
            
    except Exception as e:
        print(f"Error creating favicon: {str(e)}")

def main():
    input_file = "static/img/logo.png"
    output_dir = "static/img"
    
    # Создаем favicon размером 98x98
    create_favicon(input_file, output_dir, 98)

if __name__ == "__main__":
    main() 