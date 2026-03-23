package util

import (
	"errors"
	"strings"
	"tunetalk/internal/models"
)

func DecodeCookie(value string) (models.User, error) {
	parts := strings.Split(value, "|")

	if len(parts) != 2 {
		return models.User{}, errors.New("DecodeCookie - invalid cookie value")
	}

	return models.User{
		ID:   parts[1],
		Name: parts[0],
	}, nil
}
