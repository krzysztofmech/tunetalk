dev-up:
	docker compose -f docker/compose.yaml up --build -d
dev-down:
	docker compose -f docker/compose.yaml down
dev-logs:
	docker compose -f docker/compose.yaml logs -f 
