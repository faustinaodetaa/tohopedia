package model

import (
	"time"
)

type Shop struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	NameSlug    string    `json:"nameSlug"`
	Address     string    `json:"address"`
	Slogan      string    `json:"slogan"`
	Description string    `json:"description"`
	Profile     string    `json:"profile"`
	OpenHour    time.Time `json:"openHour"`
	CloseHour   time.Time `json:"closeHour"`
	IsOpen      bool      `json:"isOpen"`
	Points      int       `json:"points"`
	UserID      string    `json:"userID" gorm:"size:191"`
	User        *User     `json:"user"`
	Products    *Product  `json:"products"`
	Phone       string    `json:"phone"`
}
