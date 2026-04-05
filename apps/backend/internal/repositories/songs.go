package repositories

import (
	"context"
	"database/sql"
)

type SongParams struct {
	UserID   int     `json:"user_id"`
	Title    string  `json:"title"`
	Artist   string  `json:"artist"`
	Duration float64 `json:"duration"`
}

type SongsRepository struct {
	db *sql.DB
}

func NewSongsRepository(db *sql.DB) *SongsRepository {
	return &SongsRepository{
		db: db,
	}
}

func (r *SongsRepository) CreateSong(ctx context.Context, params SongParams) error {
	const Query = `
	INSERT INTO songs (title, artist, user_id, duration) VALUES(?, ?, ?, ?)
	`

	_, err := r.db.ExecContext(
		ctx,
		Query,
		params.Title,
		params.Artist,
		params.UserID,
		params.Duration,
	)

	if err != nil {
		return err
	}

	return nil
}
