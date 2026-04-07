package ws

import (
	"encoding/json"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	RoomID   int    `json:"roomId"`
	Conn     *websocket.Conn
	Message  chan *Message
}

type Message struct {
	Type     string `json:"type"`
	Payload  string `json:"payload"`
	Sender   string `json:"sender"`
	SenderId int    `json:"senderId"`
	RoomId   int    `json:"roomId"`
}

func (cl *Client) ReadMessage(core *Core) {
	defer func() {
		core.Disconnect <- cl
		cl.Conn.Close()
	}()

	for {
		_, m, err := cl.Conn.ReadMessage()
		if err != nil {
			break
		}

		var msg *Message

		err = json.Unmarshal(m, &msg)

		if err != nil {
			continue
		}

		core.Broadcast <- msg

	}
}

func (cl *Client) WriteMessage() {
	defer func() {
		cl.Conn.Close()
	}()

	for {
		m, ok := <-cl.Message
		if !ok {
			return
		}

		cl.Conn.WriteJSON(m)
	}
}
