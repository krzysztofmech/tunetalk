package repositories

import (
	"context"
	"database/sql"
	"tunetalk/internal/models"
)

type UsersRepository struct {
	db *sql.DB
}

type CreateUserParams struct {
	Name string `json:"name"`
}

func NewUsersRepository(db *sql.DB) *UsersRepository {
	return &UsersRepository{
		db: db,
	}
}

func (r *UsersRepository) CreateUser(ctx context.Context, params CreateUserParams) (models.User, error) {
	const InsertQuery = `INSERT INTO users (name)
	VALUES(?)`

	res, err := r.db.ExecContext(ctx, InsertQuery, params.Name)

	if err != nil {
		return models.User{}, err
	}

	id, err := res.LastInsertId()

	if err != nil {
		return models.User{}, err
	}

	const SelectQuery = `
	SELECT * FROM users WHERE id = ?;
	`

	row := r.db.QueryRowContext(ctx, SelectQuery, id)

	var user models.User

	err = row.Scan(&user.ID, &user.Name)

	return user, err
}

func (r *UsersRepository) GetUsers(ctx context.Context) ([]models.User, error) {
	const Query = `SELECT * FROM users`

	rows, err := r.db.QueryContext(ctx, Query)

	if err != nil {
		return nil, err
	}

	var users []models.User

	for rows.Next() {
		var user models.User

		if err := rows.Scan(&user.ID, &user.Name); err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UsersRepository) GetUser(ctx context.Context, id string) (models.User, error) {
	const Query = `SELECT * FROM users WHERE id = ?`
	row := r.db.QueryRowContext(ctx, Query, id)

	var user models.User

	err := row.Scan(&user.ID, &user.Name)

	if err != nil {
		return models.User{}, err
	}

	return user, nil
}
