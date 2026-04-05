package handlers

import (
	"fmt"
	"io"
	"net/http"
	"tunetalk/internal/services"
	"tunetalk/internal/storage"
	"tunetalk/util"

	"github.com/go-chi/chi"
)

type SongsHandler struct {
	service *services.SongsService
}

func NewSongsHandler(service *services.SongsService) *SongsHandler {
	return &SongsHandler{
		service: service,
	}
}

func (h *SongsHandler) Upload(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	err := req.ParseMultipartForm(32 << 20)
	if err != nil {
		util.WriteError(w, http.StatusBadRequest, fmt.Errorf("Upload - file too large!!!: %w", err).Error())
		return
	}

	title := req.FormValue("title")
	artist := req.FormValue("artist")
	if title == "" || artist == "" {
		util.WriteError(w, http.StatusBadRequest, fmt.Errorf(`Upload - failed to get "title" and "arist" from form data: %w`, err).Error())
		return
	}

	file, header, err := req.FormFile("song")
	if err != nil {
		util.WriteError(w, http.StatusBadRequest, fmt.Errorf(`Upload - failed to get a "song" from form data: %w`, err).Error())
		return
	}

	cookie, err := req.Cookie("auth_cookie")
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, fmt.Errorf(`Upload - failed to get user from a provided cookie: %w`, err).Error())
		return
	}

	user, err := util.DecodeCookie(cookie.Value)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, fmt.Errorf(`Upload - failed to decode provided cookie: %w`, err).Error())
		return
	}

	var data = storage.UploadData{
		Title:  title,
		Artist: artist,
		File:   file,
		Header: header,
	}

	if err := h.service.Upload(ctx, user.ID, data); err != nil {
		util.WriteError(w, http.StatusInternalServerError, fmt.Errorf("Upload - failed to store a file: %w", err).Error())
		return
	}
}

func (h *SongsHandler) DownloadSongByTitle(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	title := chi.URLParam(req, "title")
	if title == "" {
		util.WriteError(w, http.StatusBadRequest, "DownloadSongByTitle - no title found in path")
		return
	}

	object, err := h.service.DownloadSongByTitle(ctx, title)
	if err != nil {
		util.WriteError(w, http.StatusNotFound, fmt.Errorf(`DownloadSongByTitle - no song found with provided title: %w`, err).Error())
	}

	defer object.Close()

	w.Header().Set("Content-Disposition", "attachment; filename="+title)
	w.Header().Set("Content-Type", "audio/mpeg")
	_, err = io.Copy(w, object)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, fmt.Errorf(`DownloadSongByTitle - failed to send file: %w`, err).Error())
		return
	}
}
