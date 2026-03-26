package util

import (
	"errors"
	"strconv"
	"strings"
	"tunetalk/internal/models"
)

func DecodeCookie(value string) (models.User, error) {
	parts := strings.Split(value, "|")

	if len(parts) != 2 {
		return models.User{}, errors.New("DecodeCookie - invalid cookie value")
	}

	id, err := strconv.Atoi(parts[0])
	if err != nil {
		return models.User{}, errors.New("DecodeCookie - invalid cookie value")
	}

	return models.User{
		ID:   id,
		Name: parts[1],
	}, nil
}
