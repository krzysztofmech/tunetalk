package repositories

import (
	"context"
	"database/sql"
	"errors"
	"tunetalk/internal/models"
)

type RoomsRepository struct {
	db *sql.DB
}

type CreateRoomParams struct {
	Name      string `json:"name"`
	CreatorID string `json:"creator_id"`
}

type UpdateRoomParams struct {
	Name string `json:"name"`
}

func NewRoomsRepository(db *sql.DB) *RoomsRepository {
	return &RoomsRepository{
		db: db,
	}
}

func (r *RoomsRepository) GetRooms(ctx context.Context) ([]models.Room, error) {
	const GetRooms = `SELECT id, name, creator_id FROM rooms`

	rows, err := r.db.QueryContext(ctx, GetRooms)

	if err != nil {
		return nil, err
	}
	var rooms []models.Room

	for rows.Next() {
		var room models.Room

		if err := rows.Scan(&room.ID, &room.Name, &room.CreatorID); err != nil {
			return nil, err
		}
		rooms = append(rooms, room)
	}

	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return rooms, nil
}

func (r *RoomsRepository) GetRoomById(ctx context.Context, id string) (models.Room, error) {
	const Query = `SELECT * FROM rooms WHERE id = ? LIMIT 1;`

	row := r.db.QueryRowContext(ctx, Query, id)

	var room models.Room
	err := row.Scan(&room.ID, &room.Name, &room.CreatorID)

	return room, err
}

func (r *RoomsRepository) CreateRoom(ctx context.Context, params CreateRoomParams) error {
	const Query = `INSERT INTO rooms (name, creator_id) VALUES(?, ?);`

	_, err := r.db.ExecContext(ctx, Query, params.Name, params.CreatorID)
	return err
}

func (r *RoomsRepository) UpdateRoom(ctx context.Context, params UpdateRoomParams, id string) error {
	const Query = `UPDATE rooms SET name = ? WHERE id IN (?);`

	res, err := r.db.ExecContext(ctx, Query, params.Name, id)

	rowsAffected, err := res.RowsAffected()
	if rowsAffected == 0 {
		return errors.New("UpdateRoom - can't find room with the provided ID - no row has been updated")
	}

	return err
}

func (r *RoomsRepository) DeleteRoom(ctx context.Context, id string) error {
	const Query = `DELETE FROM rooms WHERE id IN (?);`

	res, err := r.db.ExecContext(ctx, Query, id)

	rowsAffected, err := res.RowsAffected()
	if rowsAffected == 0 {
		return errors.New("DeleteRoom - can't find room with the provided ID - no row has been deleted")
	}

	return err
}
