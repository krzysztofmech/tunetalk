package services

import (
	"context"
	"tunetalk/internal/generated"
	"tunetalk/internal/repositories"
)

type RoomsService struct {
	repo *repositories.RoomsRepository
}

func NewRoomsService(repo *repositories.RoomsRepository) *RoomsService {
	return &RoomsService{
		repo: repo,
	}
}

func (s *RoomsService) GetRooms(ctx context.Context) ([]generated.Room, error) {
	return s.repo.GetRooms(ctx)
}
