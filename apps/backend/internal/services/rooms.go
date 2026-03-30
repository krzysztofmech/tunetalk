package services

import (
	"context"
	"tunetalk/internal/models"
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

func (s *RoomsService) GetRooms(ctx context.Context) ([]models.Room, error) {
	return s.repo.GetRooms(ctx)
}

func (s *RoomsService) GetRoomById(ctx context.Context, id int) (models.RoomWithUser, error) {
	return s.repo.GetRoomById(ctx, id)
}

func (s *RoomsService) CreateRoom(ctx context.Context, creatorID int, name string) (models.Room, error) {
	return s.repo.CreateRoom(ctx, creatorID, name)
}

func (s *RoomsService) UpdateRoom(ctx context.Context, params repositories.UpdateRoomParams, id string) error {
	return s.repo.UpdateRoom(ctx, params, id)
}

func (s *RoomsService) DeleteRoom(ctx context.Context, id string) error {
	return s.repo.DeleteRoom(ctx, id)
}
