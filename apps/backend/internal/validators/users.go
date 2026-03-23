package validators

import (
	"errors"
	"tunetalk/internal/repositories"
)

func ValidateCreateUserParams(p repositories.CreateUserParams) error {
	if p.Name == "" {
		return errors.New("CreateUser - name is required")
	}

	return nil
}
