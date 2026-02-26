package router

import (
	"log"
	"net/http"

	"github.com/go-chi/chi"
)

func SetupRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Get("/health", func(w http.ResponseWriter, req *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	log.Println("Router setup complete")

	return r
}
