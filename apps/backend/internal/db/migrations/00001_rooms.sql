-- +goose Up
CREATE TABLE IF NOT EXISTS rooms (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS rooms;
