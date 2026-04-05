package routes

import (
	"database/sql"
	"tunetalk/internal/handlers"
	"tunetalk/internal/repositories"
	"tunetalk/internal/services"

	"github.com/go-chi/chi"
)

func CreateUsersRoute(r chi.Router, db *sql.DB) {
	repo := repositories.NewUsersRepository(db)
	s := services.NewUsersService(repo)
	h := handlers.NewUsersHandler(s)

	// TODO: Implement auth
	r.Get("/me", h.Me)
	r.Get("/login/{id}", h.Login)

	r.Get("/", h.GetUsers)
	r.Get("/{id}", h.GetUser)
	r.Post("/", h.CreateUser)
}
