dev-up:
	docker compose -f docker/compose.yaml up --build -d
dev-down:
	docker compose -f docker/compose.yaml down
dev-logs:
	docker compose -f docker/compose.yaml logs -f 
dev-it-db:
	docker exec -it docker-tunetalk-db-1 mysql -h localhost -u tunetalk -ptunetalk-password tunetalk-test-db
