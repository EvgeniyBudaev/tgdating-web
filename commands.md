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
