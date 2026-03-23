package validators

import (
	"errors"
	"tunetalk/internal/repositories"
)

func ValidateCreateRoomParams(p repositories.CreateRoomParams) error {
	if p.Name == "" {
		return errors.New("CreateRoom - name is required")
	}

	return nil
}

func ValidateUpdateRoomParams(p repositories.UpdateRoomParams) error {
	if p.Name == "" {
		return errors.New("UpdateRoom - Name is required")
	}

	return nil
}
