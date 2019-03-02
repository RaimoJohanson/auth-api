docker network create vetnet

docker run -d --name postgres -p 5432:5432 --network='vetnet' -v $HOME/volumes/vet/postgres:/var/lib/postgresql/data -e POSTGRES_USER='docker' -e POSTGRES_PASSWORD='super1user2password' -e POSTGRES_DB='vetbase' postgres:10-alpine