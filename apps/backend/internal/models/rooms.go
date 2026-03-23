package models

type Room struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatorID string `json:"creatorId"`
}

type RoomWithUser struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	CreatorID   string `json:"creatorId"`
	CreatorName string `json:"creatorName"`
}
