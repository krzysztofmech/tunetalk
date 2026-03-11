package repositories

import (
	"context"
	"database/sql"
	"tunetalk/internal/generated"
)

type RoomsRepository struct {
	db      *sql.DB
	queries *generated.Queries
}

func NewRoomsRepository(db *sql.DB, queries *generated.Queries) *RoomsRepository {
	return &RoomsRepository{
		db:      db,
		queries: queries,
	}
}

func (r *RoomsRepository) GetRooms(ctx context.Context) ([]generated.Room, error) {
	rooms, err := r.queries.GetRooms(ctx)
	if err != nil {
		return nil, err
	}

	return rooms, nil
}

func (r *RoomsRepository) GetRoomById(ctx context.Context, id string) (generated.Room, error) {
	room, err := r.queries.GetRoomById(ctx, id)
	if err != nil {
		return generated.Room{}, err
	}

	return room, nil
}
