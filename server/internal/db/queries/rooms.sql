-- name: GetRooms :many
SELECT * FROM rooms;

-- name: GetRoomById :one
SELECT * FROM rooms WHERE id = ? LIMIT 1;
