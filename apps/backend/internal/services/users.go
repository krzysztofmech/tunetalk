package services

import (
	"context"
	"tunetalk/internal/models"
	"tunetalk/internal/repositories"
)

type UsersService struct {
	repo *repositories.UsersRepository
}

func NewUsersService(repo *repositories.UsersRepository) *UsersService {
	return &UsersService{
		repo: repo,
	}
}

func (s *UsersService) CreateUser(ctx context.Context, params repositories.CreateUserParams) (models.User, error) {
	return s.repo.CreateUser(ctx, params)
}

func (s *UsersService) GetUsers(ctx context.Context) ([]models.User, error) {
	return s.repo.GetUsers(ctx)
}

func (s *UsersService) GetUser(ctx context.Context, id string) (models.User, error) {
	return s.repo.GetUser(ctx, id)
}
