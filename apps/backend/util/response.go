package util

import (
	"encoding/json"
	"net/http"
	"tunetalk/internal/types"
)

func WriteJSON(w http.ResponseWriter, status int, v any) {
	var response = &types.ApiResponse{
		Success: true,
		Status:  status,
		Message: "",
		Data:    v,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(
		response,
	)
}

func WriteError(w http.ResponseWriter, status int, msg string) {
	var response = &types.ApiResponse{
		Success: false,
		Status:  status,
		Message: msg,
		Data:    nil,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(
		response,
	)
}
