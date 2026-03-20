package router

import (
	"log"
	"net/http"
	"tunetalk/internal/db"
	"tunetalk/internal/handlers"
	"tunetalk/internal/repositories"
	"tunetalk/internal/ws"
	"tunetalk/router/routes"

	"github.com/go-chi/chi"
	"github.com/rs/cors"
)

func SetupRouter(wsService *ws.Core) *chi.Mux {
	db := db.GetDB()
	r := chi.NewRouter()
	r.Use(cors.AllowAll().Handler)

	r.Get("/health", func(w http.ResponseWriter, req *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	roomsRepo := repositories.NewRoomsRepository(db)
	coreH := handlers.NewCoreHandler(wsService, roomsRepo)

	// websocket route
	r.Get("/ws", coreH.Connect)

	r.Route("/api", func(r chi.Router) {
		r.Route("/rooms", func(r chi.Router) {
			routes.CreateRoomsRoute(r, db)
		})
	})

	log.Println("Router setup complete")

	return r
}
