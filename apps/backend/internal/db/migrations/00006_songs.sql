-- +goose Up
CREATE TABLE IF NOT EXISTS songs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL UNIQUE,
    artist VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    duration INT,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY fk_user_in_song (user_id),
    CONSTRAINT fk_user_in_song FOREIGN KEY (user_id) REFERENCES users(id)
);

-- +goose Down
DROP TABLE IF EXISTS songs;
