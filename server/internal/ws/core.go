package ws

import (
	"fmt"
)

type Room struct {
	ID      string
	Name    string
	Clients map[string]*Client
}

type Core struct {
	Connect    chan *Client
	Disconnect chan *Client
	Broadcast  chan *Message
	Rooms      map[string]*Room
}

func NewCore() *Core {
	return &Core{
		Connect:    make(chan *Client),
		Disconnect: make(chan *Client),
		Broadcast:  make(chan *Message),
		Rooms:      make(map[string]*Room),
	}
}

func (c *Core) Run() {
	for {
		select {
		case cl := <-c.Connect:
			fmt.Printf("user %s connected", cl.Username)

			if room, ok := c.Rooms[cl.RoomID]; ok {
				if _, ok := room.Clients[cl.Username]; !ok {
					room.Clients[cl.Username] = cl
				}
				msg := &Message{
					ClientId: cl.ID,
					Username: cl.Username,
					Type:     "joined_room",
				}

				for _, client := range room.Clients {
					if client.ID != cl.ID {
						client.Message <- msg
					}
				}
			}
		case cl := <-c.Disconnect:
			fmt.Printf("user %s disconnected", cl.Username)
		case m := <-c.Broadcast:
			fmt.Printf("user %s broadcasted %s", m.Username, m.Payload)
			if room, ok := c.Rooms[m.RoomId]; ok {
				for _, cl := range room.Clients {
					if cl.ID != m.ClientId {
						cl.Message <- m
					}
				}
			}
		}
	}
}
