package validators

import (
	"errors"
	"tunetalk/internal/services"
)

func ValidateConnectParams(p services.ConnectParams) error {
	if p.SDP == "" {
		return errors.New("Connect - SDP is required")
	}

	return nil
}
