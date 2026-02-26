package services

import (
	"gym/internal/repositories"
)

type SongsService struct {
	repo *repositories.WorkoutRepository
}

func NewSongsService(repo *repositories.WorkoutRepository) *SongsService {
	return &SongsService{repo: repo}
}
