package handlers

import (
	"net/http"
	"tunetalk/internal/services"
	"tunetalk/internal/validators"
	"tunetalk/util"
)

type BroadcasterHandler struct {
	service *services.BroadcasterService
}

func NewBroadcasterHandler(service *services.BroadcasterService) *BroadcasterHandler {
	return &BroadcasterHandler{
		service: service,
	}
}

func (h *BroadcasterHandler) Connect(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	params, err := util.ParseParams[services.ConnectParams](req.Body)
	if err != nil {
		util.WriteError(w, http.StatusBadRequest, err.Error())
		return
	}

	err = validators.ValidateConnectParams(params)
	if err != nil {
		util.WriteError(w, http.StatusBadRequest, err.Error())
		return
	}

	answer, err := h.service.CreateAnswer(ctx, params)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	util.WriteJSON(w, http.StatusOK, answer)
}
