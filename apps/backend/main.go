package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"tunetalk/internal/db"
	"tunetalk/internal/db/migrations"
	"tunetalk/internal/router"
	"tunetalk/internal/storage"
	"tunetalk/internal/ws"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on environment variables")
	}

	if err := db.InitDB(); err != nil {
		log.Fatalf("Failed to initialize db: %v", err)
	}

	if err := migrations.RunMigrations(db.GetDB()); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	defer func() {
		if err := db.CloseDB(); err != nil {
			log.Printf("Error closing database: %v", err)
		}
	}()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-c
		log.Println("Shutting down server...")
		db.CloseDB()
		os.Exit(0)
	}()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)

	storage := storage.NewStorage()

	wsService := ws.NewCore()

	router := router.SetupRouter(wsService, storage)

	go wsService.Run()

	if err := http.ListenAndServe(":"+port, router); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
