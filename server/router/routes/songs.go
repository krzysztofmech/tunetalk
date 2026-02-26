package router

import (
	"database/sql"
	"tunetalk/internal/handlers"
	"tunetalk/internal/repositories"
	"tunetalk/internal/services"

	"github.com/go-chi/chi"
)

func CreateSongsRoutes(r chi.Router, db *sql.DB) {
	repo := repositories.NewSongsRepository(db)
	s := services.NewSongsService(repo)
	h := handlers.NewSongsHandler(s)

	r.Get("/{id}", h.GetSong)
}
