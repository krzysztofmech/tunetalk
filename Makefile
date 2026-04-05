up:
# start everything in docker
	docker compose -f docker/compose.yaml up --build -d
down:
# shutdown everything started by compose
	docker compose -f docker/compose.yaml down
logs:
# log all apps running started by compose
	docker compose -f docker/compose.yaml logs -f 
up-db:
# start only database (for backend api development)
	docker compose -f docker/compose.yaml up --build -d tunetalk-db tunetalk-file-storage
up-file-storage:
# start only file-storage
	docker compose -f docker/compose.yaml up --build -d tunetalk-file-storage
up-db-api:
# start only database and backend api (for Next app development)
	docker compose -f docker/compose.yaml up --build -d tunetalk-db tunetalk-file-storage tunetalk-backend
db-it:
# connect to database running in container
	docker exec -it docker-tunetalk-db-1 mysql -h localhost -u tunetalk -ptunetalk-password tunetalk-test-db
db-clean:
# remove volume with database
	docker compose -f docker/compose.yaml down -v
