package routes

import (
	"database/sql"
	"tunetalk/internal/handlers"
	"tunetalk/internal/services"

	"github.com/go-chi/chi"
)

func CreateBroadcasterRoute(r chi.Router, db *sql.DB) {
	s := services.NewBroadcasterService()
	h := handlers.NewBroadcasterHandler(s)

	r.Post("/", h.Connect)
}
