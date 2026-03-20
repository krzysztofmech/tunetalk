-- +goose Up
ALTER TABLE rooms 
ADD COLUMN creator_id CHAR(36) NOT NULL REFERENCES users(id)

-- +goose Down
ALTER TABLE IF EXISTS rooms 
DROP COLUMN IF EXISTS creator_id;
