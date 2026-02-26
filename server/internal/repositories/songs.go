package repositories

import (
	"database/sql"
)

type SongsRepository struct {
	db      *sql.DB
}

func NewSongsRepository(db *sql.DB) *SongsRepository {
	return &SongsRepository{db: db}
}


