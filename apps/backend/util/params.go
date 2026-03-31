package util

import (
	"encoding/json"
	"errors"
	"io"
	"strconv"
)

func ParseIdParam(param string) (int, error) {
	var id int

	if param != "" {
		if id, err := strconv.Atoi(param); err == nil {

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
