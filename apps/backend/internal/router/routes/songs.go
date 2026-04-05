package routes

import (
	"database/sql"
	"tunetalk/internal/handlers"
	"tunetalk/internal/repositories"
	"tunetalk/internal/services"
	"tunetalk/internal/storage"

	"github.com/go-chi/chi"
)

func CreateSongsRoute(r chi.Router, db *sql.DB, storage *storage.Storage) {
	repo := repositories.NewSongsRepository(db)
	s := services.NewSongsService(repo, storage)
	h := handlers.NewSongsHandler(s)

	r.Post("/", h.Upload)
	r.Get("/{title}", h.DownloadSongByTitle)
}
