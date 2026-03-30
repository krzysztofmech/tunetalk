package handlers

import (
	"encoding/json"
	"net/http"
	"tunetalk/internal/services"
	"tunetalk/internal/types"
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

	writeSDP(w, http.StatusOK, answer)
}

func writeSDP(w http.ResponseWriter, status int, v any) {
	var response = &types.ApiResponse{
		Success: true,
		Status:  status,
		Message: "",
		Data:    v,
	}

	w.Header().Set("Content-Type", "application/sdp")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(
		response,
	)
}
