package ws

import (
	"encoding/json"
	"fmt"
	"log"

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
			fmt.Println("unmarshal error:", err)
			continue
		}

		core.Broadcast <- msg

	}
}

func (cl *Client) WriteMessage() {
	defer func() {
		log.Panicln("write message disconnect")
		cl.Conn.Close()
	}()

	for {
		m, ok := <-cl.Message
		fmt.Println("new message")
		if !ok {
			return
		}

		cl.Conn.WriteJSON(m)
	}
}
