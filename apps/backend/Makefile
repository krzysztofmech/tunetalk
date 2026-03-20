.PHONY: build run dev clean test install-air

# Build the application
build:
	go build -o bin/server main.go

# Run the application
run: build
	./bin/server

# Run in development mode with hot reload (requires air)
dev:
	air -c .air.toml

# Clean build artifacts
clean:
	rm -rf bin/ tmp/

# Install Air for hot reload
install-air:
	go install github.com/cosmtrek/air@latest

# Run tests
test:
	go test ./...

# Install dependencies
deps:
	go mod download
	go mod tidy

# Create migration
create-migration:
	cd internal/db/migrations && \
		goose -s create $(name) sql
