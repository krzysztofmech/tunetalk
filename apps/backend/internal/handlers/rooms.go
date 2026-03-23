package handlers

import (
	"net/http"
	"tunetalk/internal/models"
	"tunetalk/internal/repositories"
	"tunetalk/internal/services"
	"tunetalk/internal/validators"
	"tunetalk/util"

	"github.com/go-chi/chi"
)

type RoomsHandler struct {
	roomsService *services.RoomsService
}

func NewRoomsHandler(roomsService *services.RoomsService) *RoomsHandler {
	return &RoomsHandler{
		roomsService: roomsService,
	}
}

func (h *RoomsHandler) GetRooms(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	rooms, err := h.roomsService.GetRooms(ctx)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, "GetRooms - failed to get rooms")
		return
	}

	util.WriteJSON(w, http.StatusOK, rooms)
}

func (h *RoomsHandler) GetRoomById(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	id := chi.URLParam(req, "id")
	if id == "" {
		util.WriteError(w, http.StatusBadRequest, "GetRoomById - no id found in path")
		return
	}

	room, err := h.roomsService.GetRoomById(ctx, id)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	util.WriteJSON(w, http.StatusOK, room)
}

func (h *RoomsHandler) CreateRoom(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	cookie, err := req.Cookie("auth_cookie")

	if err != nil {
		util.WriteError(w, http.StatusUnauthorized, err.Error())
		return
	}

	var room models.Room

	user, err := util.DecodeCookie(cookie.Value)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	room, err = h.roomsService.CreateRoom(ctx, user.ID, user.Name)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, "CreateRoom - failed to create a room")
		return
	}

	util.WriteJSON(w, http.StatusOK, room)
}

func (h *RoomsHandler) UpdateRoom(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	id := chi.URLParam(req, "id")
	if id == "" {
		util.WriteError(w, http.StatusBadRequest, "UpdateRoom - no id found in path")
		return
	}

	params, err := util.ParseParams[repositories.UpdateRoomParams](req.Body)
	if err != nil {
		util.WriteError(w, http.StatusBadRequest, "UpdateRoom - invalid params")
		return
	}

	err = validators.ValidateUpdateRoomParams(params)
	if err != nil {
		util.WriteError(w, http.StatusBadRequest, err.Error())
	}

	err = h.roomsService.UpdateRoom(ctx, params, id)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	util.WriteJSON(w, http.StatusOK, nil)
}

func (h *RoomsHandler) DeleteRoom(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	id := chi.URLParam(req, "id")
	if id == "" {
		util.WriteError(w, http.StatusBadRequest, "DeleteRoom - no id found in path")
	}

	err := h.roomsService.DeleteRoom(ctx, id)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, "DeleteRoom - failed to delete a room")
		return
	}

	util.WriteJSON(w, http.StatusOK, nil)
}
