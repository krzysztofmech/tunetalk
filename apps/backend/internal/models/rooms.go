package models

type Room struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	CreatorID   int    `json:"creator_id"`
	CurrentSong []byte `json:"current_song"`
}

type RoomWithUser struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	CreatorID   int    `json:"creator_id"`
	CreatorName string `json:"creator_name"`
	CurrentSong []byte `json:"current_song"`
}
