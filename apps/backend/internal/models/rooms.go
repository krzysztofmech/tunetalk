package models

type Room struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	CreatorID int    `json:"creatorId"`
}

type RoomWithUser struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	CreatorID   int    `json:"creatorId"`
	CreatorName string `json:"creatorName"`
}
