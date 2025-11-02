/**
 * Форматирует строку цифр в вид +7 (999) 999-99-99
 * Правильно обрабатывает ввод и удаление символов
 */
export function formatRuPhone(input: string): string {
  // Убираем все нецифровые символы
  let digits = input.replace(/\D/g, '');
  
  // Если пусто, возвращаем только префикс
  if (!digits) {
    return '+7';
  }
  
  // Если начинается с 8, заменяем на 7
  if (digits.startsWith('8')) {
    digits = '7' + digits.slice(1);
  }
  
  // Если не начинается с 7 или 8, добавляем 7 в начало
  if (!digits.startsWith('7')) {
    digits = '7' + digits;
  }
  
  // Ограничиваем до 11 цифр максимум (7 + 10 цифр номера)
  digits = digits.slice(0, 11);
  
  // Если только 7 без цифр номера, возвращаем просто +7
  if (digits === '7' || digits.length === 1) {
    return '+7';
  }
  
  // Убираем ведущую 7 для форматирования (она будет в префиксе +7)
  const phoneDigits = digits.slice(1);
  
  // Форматируем по частям: +7 (XXX) XXX-XX-XX
  let formatted = '+7';
  
  // Код оператора (первые 3 цифры)
  if (phoneDigits.length > 0) {
    formatted += ' (';
    formatted += phoneDigits.slice(0, 3);
    
    // Если есть 4+ цифры, закрываем скобку и добавляем следующие 3
    if (phoneDigits.length >= 4) {
      formatted += ') ' + phoneDigits.slice(3, 6);
    } else {
      // Если только 3 цифры, просто закрываем скобку
      formatted += ')';
    }
    
    // Последние 4 цифры (6-7 и 8-9)
    if (phoneDigits.length >= 7) {
      formatted += '-' + phoneDigits.slice(6, 8) + '-' + phoneDigits.slice(8, 10);
    } else if (phoneDigits.length > 6) {
      formatted += '-' + phoneDigits.slice(6);
    }
  }
  
  return formatted;
}

/** Возвращает цифры телефона в формате +7XXXXXXXXXX */
export function normalizeRuPhoneToE164(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('7')) return `+${digits}`;
  return `+7${digits.slice(-10)}`;
}


