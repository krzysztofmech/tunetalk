-- +goose Up
ALTER TABLE rooms ADD COLUMN creator_id CHAR(36) NOT NULL;
ALTER TABLE rooms
    ADD CONSTRAINT rooms_creator_id_fk
    FOREIGN KEY (creator_id) REFERENCES users(id);

-- +goose Down
ALTER TABLE rooms DROP FOREIGN KEY rooms_creator_id_fk;
ALTER TABLE rooms DROP COLUMN creator_id;
