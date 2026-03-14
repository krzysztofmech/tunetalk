package handlers

import (
	"net/http"
	"tunetalk/internal/services"
	"tunetalk/util"
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
		util.WriteError(w, http.StatusInternalServerError, "failed to get rooms")
		return
	}

	util.WriteJSON(w, http.StatusOK, rooms)
}
