package router

import (
	"log"
	"net/http"
	"tunetalk/internal/db"
	"tunetalk/internal/handlers"
	"tunetalk/internal/middleware"
	"tunetalk/internal/repositories"
	"tunetalk/internal/ws"
	"tunetalk/router/routes"

	"github.com/go-chi/chi"
	"github.com/rs/cors"
)

func SetupRouter(wsService *ws.Core) *chi.Mux {
	db := db.GetDB()
	r := chi.NewRouter()

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
	})

	r.Use(corsMiddleware.Handler)

	r.Get("/health", func(w http.ResponseWriter, req *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	roomsRepo := repositories.NewRoomsRepository(db)
	coreH := handlers.NewCoreHandler(wsService, roomsRepo)

	// websocket route
	r.Get("/ws", coreH.Connect)

	r.Route("/api", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Use(middleware.Auth)
			r.Route("/rooms", func(r chi.Router) {
				routes.CreateRoomsRoute(r, db)
			})
		})
		r.Route("/users", func(r chi.Router) {
			routes.CreateUsersRoute(r, db)
		})
	})

	log.Println("Router setup complete")

	return r
}
