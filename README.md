# takeoff-test
Приложение с двумя страницами: страница логина и страница контактов.
Контакты можно добавлять, удалять, редактировать.
Серверная часть сделана с помощью fake-json-server

Запуск приложения:

server:
1. клонировать репозиторий https://github.com/mirael26/fake-json-server
2. запустить:
- npm i
- json-server db.json -m ./node_modules/json-server-auth

frontend: 
1. клонировать текущий репозиторий
2. запустить:
- npm i
- npm start / или / npm run build и открыть файл /dist/index.html

node v16.13.0
