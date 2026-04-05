package services

import (
	"context"
	"log"
	"tunetalk/internal/repositories"
	"tunetalk/internal/storage"
	"tunetalk/util"

	"github.com/minio/minio-go/v7"
)

type SongsService struct {
	repo    *repositories.SongsRepository
	storage *storage.Storage
}

func NewSongsService(repo *repositories.SongsRepository, storage *storage.Storage) *SongsService {
	return &SongsService{
		repo:    repo,
		storage: storage,
	}
}

func (s *SongsService) Upload(ctx context.Context, userID int, data storage.UploadData) error {
	err := s.storage.Upload(ctx, data)
	if err != nil {
		return err
	}

	duration, err := util.GetDuration(data.File)
	if err != nil {
		return err
	}

	var params = repositories.SongParams{
		UserID:   userID,
		Title:    data.Title,
		Artist:   data.Artist,
		Duration: duration,
	}

	if err := s.repo.CreateSong(ctx, params); err != nil {
		return err
	}

	return nil
}

func (s *SongsService) DownloadSongByTitle(ctx context.Context, title string) (*minio.Object, error) {
	object, err := s.storage.DownloadSongByTitle(ctx, title)
	if err != nil {
		return nil, err
	}
	log.Println(object.Stat())

	return object, nil
}
