package repositories

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"tunetalk/internal/models"
)

type RoomsRepository struct {
	db *sql.DB
}

type CreateRoomParams struct {
	Name string `json:"name"`
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

func (r *RoomsRepository) GetRoomById(ctx context.Context, id int) (models.RoomWithUser, error) {
	const Query = `SELECT rooms.*, users.name AS creator_name FROM rooms INNER JOIN users ON rooms.creator_id = users.id WHERE rooms.id = ?`

	row := r.db.QueryRowContext(ctx, Query, id)

	var room models.RoomWithUser
	err := row.Scan(&room.ID, &room.Name, &room.CreatorID, &room.CreatorName)

	return room, err
}

func (r *RoomsRepository) CreateRoom(ctx context.Context, creatorID int, name string) (models.Room, error) {
	const CountQuery = `
	SELECT COUNT(*) FROM rooms;
	`

	rows, err := r.db.Query(CountQuery)

	if err != nil {
		return models.Room{}, err
	}
	var count int

	for rows.Next() {
		if err := rows.Scan(&count); err != nil {
			return models.Room{}, err
		}
	}

	const InsertQuery = `
	INSERT INTO rooms (name, creator_id)
	VALUES(?, ?)
	`

	room_name := fmt.Sprintf("%s's room #%v", name, count + 1)

	res, err := r.db.ExecContext(ctx, InsertQuery, room_name, creatorID)

	if err != nil {
		return models.Room{}, err
	}

	id, err := res.LastInsertId()

	if err != nil {
		return models.Room{}, err
	}

	const SelectQuery = `
	SELECT * FROM rooms WHERE id = ?;
	`

	row := r.db.QueryRowContext(ctx, SelectQuery, id)

	var room models.Room
	err = row.Scan(&room.ID, &room.Name, &room.CreatorID)

	return room, err
}

func (r *RoomsRepository) UpdateRoom(ctx context.Context, params UpdateRoomParams, id string) error {
	const Query = `UPDATE rooms SET name = ? WHERE id IN (?);`

	res, err := r.db.ExecContext(ctx, Query, params.Name, id)

	if err != nil {
		return err
	}

	if _, err := res.RowsAffected(); err != nil {
		return errors.New("UpdateRoom - no row has been updated - can't find room with the provided ID")
	}

	return err
}

func (r *RoomsRepository) DeleteRoom(ctx context.Context, id string) error {
	const Query = `DELETE FROM rooms WHERE id IN (?);`

	res, err := r.db.ExecContext(ctx, Query, id)

	if err != nil {
		return err
	}

	if _, err := res.RowsAffected(); err != nil {
		return errors.New("DeleteRoom - can't find room with the provided ID - no row has been deleted")
	}

	return err
}
