# Canvas-PaintApp

Не получилось отключать кисть при обратном отжатии клавиши Работает только при первом нажатии на Pen, добавляется класс кнопке. Потом делаю проверку на этот класс и получаю коллекцию, если её длина больше 0, то тогда можно рисовать, иначе console.log(...) Он почему-то при первом нажатии начинает рисовать и следующие переключения класса не останавливают кисть.

И проблема с ползунком, вернее со свойством ctx.lineWidth, оно вообще не хочет присваиваться, ни напрямую, ни через значение ползунка. Так он работает, значение изменяется, но вот присвоить ctx.lineWidth не получилось.

Фигуры еще не рисовал из-за этих проблем

И наверное нужно какую-то проверку на изменение цвета сделать, потому что, если не валидный приходит, он это значение в нижнее поле записывает, сама кисть продолжает предыдущим цветом рисовать

Ну и так мелкие недочеты есть по работе, которые нужно подправить.