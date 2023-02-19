$('.date').mask('99/99');
$('.cvv').mask('999');
$('.card').mask('9999999999999999');


// document.addEventListener('DOMContentLoaded', () => {

//     const mask = (dataValue, options) => { // создаем универсальную функцию
//         const elements = document.querySelectorAll(`[data-mask="${dataValue}"]`) // ищем поля ввода по селектору с переданным значением data-атрибута
//         if (!elements) return // если таких полей ввода нет, прерываем функцию

//         elements.forEach(el => { // для каждого из полей ввода
//             IMask(el, options) // инициализируем плагин imask для необходимых полей ввода с переданными параметрами маски
//         })
//     }

//     // Используем наше функцию mask для разных типов масок

//     // Маска для номера телефона
//     mask('cvv', {
//         mask: '000'
//     })

// })