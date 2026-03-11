package handlers

import (
	"fmt"
	"net/http"
	"tunetalk/internal/repositories"
	"tunetalk/internal/ws"

	"github.com/gorilla/websocket"
)

type CoreHandler struct {
	core *ws.Core
	repo *repositories.RoomsRepository
}

func NewCoreHandler(c *ws.Core, repo *repositories.RoomsRepository) *CoreHandler {
	return &CoreHandler{
		core: c,
		repo: repo,
	}
}

func (h *CoreHandler) Connect(w http.ResponseWriter, r *http.Request) {
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
		EnableCompression: true,
	}

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Printf("error %s", err.Error())
		return
	}

	q := r.URL.Query()

	username := q.Get("username")
	clientId := q.Get("userId")
	roomId := q.Get("roomId")

	ctx := r.Context()
	room, err := h.repo.GetRoomById(ctx, roomId)

	if _, ok := h.core.Rooms[roomId]; !ok {
		h.core.Rooms[roomId] = &ws.Room{
			ID:      roomId,
			Name:    room.Name,
			Clients: make(map[string]*ws.Client),
		}
	}

	cl := &ws.Client{
		ID:       clientId,
		Username: username,
		RoomID:   roomId,
		Conn:     conn,
		Message:  make(chan *ws.Message),
	}

	h.core.Connect <- cl

	go cl.WriteMessage()
	cl.ReadMessage(h.core)
}
