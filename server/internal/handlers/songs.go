package handlers

import (
	"net/http"
	"tunetalk/internal/services"
	"tunetalk/util"
)

type SongsHandler struct {
	songsService *services.SongsService
}

func NewSongsHandler(songsService *services.SongsService) *SongsHandler {
	return &SongsHandler{songsService: songsService}
}

func (h *SongsHandler) GetSong(w http.ResponseWriter, req *http.Request) {
	util.WriteJSON(w, http.StatusOK, map[string]string{"message": "GetSong endpoint hit"})
}
