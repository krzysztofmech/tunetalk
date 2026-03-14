package routes

import (
	"database/sql"
	"tunetalk/internal/generated"
	"tunetalk/internal/handlers"
	"tunetalk/internal/repositories"
	"tunetalk/internal/services"

	"github.com/go-chi/chi"
)

func CreateRoomsRoute(r chi.Router, db *sql.DB, queries *generated.Queries) {
	repo := repositories.NewRoomsRepository(db, queries)
	s := services.NewRoomsService(repo)
	h := handlers.NewRoomsHandler(s)

	r.Get("/", h.GetRooms)
}
