# Yandex.Connect Dynamic DNS
> Управление DNS записями для работы с динамическим IP

### Модуль в данный момент не работает из-за отсутствия рабочего API Яндекс организаций.

_Для работы необходимо создать OAuth приложение в Яндекс — https://oauth.yandex.ru/_

В настройках приложения необходимо указать Callback URL для Веб-сервисов:
`https://oauth.yandex.ru/verification_code`

Разрешить ему права доступа (минимально для работы пакета):
* Яндекс.Коннект Directory API
  * Управление доменами организации
  * Чтение данных об организациях пользователя
  * Чтение данных о доменах организации
* Яндекс.Коннект: API DNS-хостинга
  * Управление доменами

## Конфигурирование
Создать файлы `production.json` и/или `development.json` в директории `config` в зависимости от необходимого окружения.

Тело файла:
```
{
  "client_id": "",         // ID приложения
  "client_secret": "",     // Пароль приложения
  "domain": "",            // Имя домена (без протокола и www) которым вы хотите управлять
  "username": "",          // Имя администратора организации в Яндекс.Коннект
  "password": ""           // Пароль администратора организации в Яндекс.Коннект
}
```

## Требования и запуск
*Для работы требуется NodeJS версии `8.0.0` и выше*

#### Установка:
Выполните `npm install` или `yarn`.

#### Запуск:
Выполните `npm start` или `yarn start`.

#### Отладка:
Укажите в окружении значение `DEBUG=true` для запуска puppeteer в режиме non-headless 

#### To Do:
- Возможность менять любые DNS записи
