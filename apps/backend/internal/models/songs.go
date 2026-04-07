package models

type Song struct {
	ID      string `json:"id"`
	UserID  string `json:"user_id"`
	Title   string `json:"title"`
	Artist  string `json:"artist"`
	FileUrl string `json:"file_url"`
}
