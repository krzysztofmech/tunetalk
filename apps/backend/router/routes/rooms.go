package routes

import (
	"database/sql"
	"tunetalk/internal/handlers"
	"tunetalk/internal/repositories"
	"tunetalk/internal/services"

	"github.com/go-chi/chi"
)

func CreateRoomsRoute(r chi.Router, db *sql.DB) {
	repo := repositories.NewRoomsRepository(db)
	s := services.NewRoomsService(repo)
	h := handlers.NewRoomsHandler(s)

	r.Post("/", h.CreateRoom)
	r.Get("/", h.GetRooms)
	r.Get("/{id}", h.GetRoomById)
	r.Patch("/{id}", h.UpdateRoom)
	r.Delete("/{id}", h.DeleteRoom)
}
