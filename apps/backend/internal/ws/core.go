package ws

import (
	"fmt"
)

type Room struct {
	ID      int
	Name    string
	Clients map[int]*Client
}

type Core struct {
	Connect    chan *Client
	Disconnect chan *Client
	Broadcast  chan *Message
	Rooms      map[int]*Room
}

func NewCore() *Core {
	return &Core{
		Connect:    make(chan *Client),
		Disconnect: make(chan *Client),
		Broadcast:  make(chan *Message),
		Rooms:      make(map[int]*Room),
	}
}

func (c *Core) Run() {
	for {
		select {
		case cl := <-c.Connect:
			c.handleConnect(cl)
		case cl := <-c.Disconnect:
			fmt.Printf("user %s disconnected", cl.Username)
		case m := <-c.Broadcast:
			fmt.Printf("user %s broadcasted %s", m.Sender, m.Payload)
			if room, ok := c.Rooms[m.RoomId]; ok {
				for _, cl := range room.Clients {
					if cl.ID != m.SenderId {
						cl.Message <- m
					}
				}
			}
		}
	}
}

func (c *Core) handleConnect(cl *Client) {
	fmt.Printf("user %s connected", cl.Username)

	if room, ok := c.Rooms[cl.RoomID]; ok {
		if _, ok := room.Clients[cl.ID]; !ok {
			room.Clients[cl.ID] = cl
		}
		msg := &Message{
			SenderId: cl.ID,
			Sender:   cl.Username,
			Type:     JoinedRoomType,
		}

		for _, client := range room.Clients {
			if client.ID != cl.ID {
				client.Message <- msg
			}
		}
	}
}
