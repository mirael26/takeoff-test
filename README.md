# takeoff-test
## Описание

Приложение с двумя страницами: страница логина и страница контактов.
Контакты можно добавлять, удалять, редактировать.

Серверная часть сделана с помощью fake-json-server

## Установка и запуск

* установите [NodeJS](https://nodejs.org/), если он еще не установлен

### server:

* скачайте проект с помощью команды: ```git clone https://github.com/mirael26/fake-json-server```
* перейдите в скачанную папку с проектом
* для установки зависимостей введите команду: ```npm i```
* чтобы запустить сервер, введите команду ```json-server db.json -m ./node_modules/json-server-auth```

### frontend: 
* скачайте данный репозиторий архивом или с помощью команды: ```git clone https://github.com/mirael26/takeoff-test```
* перейдите в скачанную папку с проектом
* для установки зависимостей введите команду: ```npm i```
* чтобы начать работу, введите команду: ```npm start``` (режим разработки)
* чтобы собрать проект, введите команду ```npm run build``` (режим сборки)

node v16.13.0
