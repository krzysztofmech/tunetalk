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
	docker compose -f docker/compose.yaml up --build -d tunetalk-db
up-db-api:
# start only database and backend api (for Next app development)
	docker compose -f docker/compose.yaml up --build -d tunetalk-db tunetalk-backend
db-it:
# connect to database running in container
	docker exec -it docker-tunetalk-db-1 mysql -h localhost -u tunetalk -ptunetalk-password tunetalk-test-db
