package handlers

import (
	"fmt"
	"log"
	"net/http"
	"tunetalk/internal/repositories"
	"tunetalk/internal/ws"
	"tunetalk/util"

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

	username := q.Get("name")

	clientId, err := util.ParseIdParam(q.Get("userId"))
	if err != nil {
		log.Print(q.Get("userId"))
		fmt.Printf("[WS] Connect - invalid userId")
		return
	}

	roomId, err := util.ParseIdParam(q.Get("roomId"))
	if err != nil {
		fmt.Printf("[WS] Connect - invalid roomId")
		return
	}

	ctx := r.Context()
	room, err := h.repo.GetRoomById(ctx, roomId)

	if _, ok := h.core.Rooms[roomId]; !ok {
		h.core.Rooms[roomId] = &ws.Room{
			ID:      roomId,
			Name:    room.Name,
			Clients: make(map[int]*ws.Client),
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
