package validators

import (
	"errors"
	"tunetalk/internal/repositories"
)

func ValidateCreateRoomParams(p repositories.CreateRoomParams) error {
	if p.Name == "" {
		return errors.New("CreateRoom - Name is required")
	}

	if p.CreatorID == "" {
		return errors.New("CreateRoom - CreatorID is required")
	}

	return nil
}

func ValidateUpdateRoomParams(p repositories.UpdateRoomParams) error {
	if p.Name == "" {
		return errors.New("UpdateRoom - Name is required")
	}

	return nil
}
