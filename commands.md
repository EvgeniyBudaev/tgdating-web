Stop process

```
sudo lsof -i :15672
sudo lsof -i :5432
sudo lsof -i :3000
sudo lsof -i :80
sudo kill PID_number
```

PostGIS

```
pg_config --version // PostgreSQL 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
sudo apt-get update
sudo apt install postgis postgresql-14-postgis-3
sudo -u postgres psql -c "CREATE EXTENSION postgis;" tgbot
sudo systemctl restart postgresql
```

Docker
Список контейнеров

```
sudo docker ps -a
```

Логи контейнера
Флаг -f смотреть логи в реальном времени

```
docker-compose logs -f
```

Список всех образов

```
sudo docker image ls
```

Список всех volumes

```
sudo docker volume ls
```

Запуск контейнеров

```
docker-compose up -d
```

STOP все контейнеры

```
docker stop $(docker ps -a -q)
```

Удаление контейнера

```
sudo docker rm container_id
```

Удаление образа

```
sudo docker image rm id_image
```

Удаление volume

```
docker volume rm volume_name
sudo docker volume rm volume_name
```

Удаление всех контейнеров

```
docker rm -f $(docker ps -a -q)
sudo docker rm -f $(sudo docker ps -a -q)
```

Удаление всех образов

```
docker rmi -f $(docker images -q)
docker rm $(docker ps -a -q)
sudo docker rmi -f $(sudo docker images -q)
```

Удаление всех volumes

```
docker volume rm $(docker volume ls -qf dangling=true)
docker volume rm $(docker volume ls -q)
docker volume prune
docker volume prune -a
sudo docker volume prune
docker system prune -a // локальное удаление всех volumes
```

Сборка docker-образа

```
docker build . # Соберёт образ на основе Dockerfile
docker image ls # Отобразит информацию обо всех образах
```

Создание docker network

```
docker network create web-network
```

Вход на сервер

```
ssh root@91.236.199.58
```

Telegram
https://github.com/telegram-mini-apps/init-data-golang

```
go get github.com/telegram-mini-apps/init-data-golang
```

Узнать запущенные процессы

```
ps -aux | grep nginx
ps -aux | grep certbot
```

Установка certbot

```
sudo apt update
sudo apt upgrade -y
sudo apt-get install python3-certbot-nginx
```

Обновление сертификата

1. Вариант с DNS
   https://www.youtube.com/watch?v=VJPfdXN-dSc&list=LL&index=13

```
sudo apt update
sudo apt upgrade -y
sudo certbot certonly --manual --preferred-challenges dns -d telegram-dating.com -d *.telegram-dating.com
```

Копируем ключ, идем на в личный кабинет Домены - DNS серверы - Управление зоной - Меняем ключ
Копируем строку

```
_acme-challenge.telegram-dating.com.
```

Ждет когда ключ обновиться по адресу https://toolbox.googleapps.com/apps/dig/#TXT/_acme-challenge.telegram-dating.com.
Нажимаем в терминале Continue
Если терминал завис, то убиваем процесс
ps -aux | grep certbot
sudo kill PID_number
certbot certonly --manual -d telegram-dating.com -d \*.telegram-dating.com -v
Нажимаем в терминале Continue

2. Вариант с HTTP-01

Сделать скриншоты конфига nginx

```
sudo apt update
sudo apt upgrade -y
sudo certbot --nginx
sudo systemctl reload nginx
```

Бесплатный сертификат нужно обновлять минимум раз в три месяца. Certbot делает это по умолчанию,
если вы не меняли стандартных настроек. Убедиться, что всё обновляется, можно с помощью команды:

```
sudo certbot renew --dry-run
```

Проверить конфигурацию nginx, могла измениться. Если изменилась, то вернуть предыдущие настройки

Если по каким-то причинам автообновление не происходит, то можно выполнить следующую команду:

```
sudo certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start"
```

Эта команда обновит сертификат и перезапустит nginx.

Все сертификаты

```
sudo certbot certificates
```

Удалить сертификат

```
sudo certbot delete
```

Загрузка процессора в Linux

```
ps -aux --sort -pcpu
```
