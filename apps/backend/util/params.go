package util

import (
	"encoding/json"
	"errors"
	"io"
	"strconv"
)

func ParseIdParam(param string) (int64, error) {
	var id int64

	if param != "" {
		if id, err := strconv.ParseInt(param, 10, 64); err == nil {

			return id, nil
		}
	}
	return id, errors.New("Invalid ID parameter")
}

func ParseParams[T any](body io.ReadCloser) (T, error) {
	var params T

	err := json.NewDecoder(body).Decode(&params)

	return params, err
}
