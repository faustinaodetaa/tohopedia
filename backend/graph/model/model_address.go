package model

type Address struct {
	ID         string `json:"id"`
	Location   string `json:"location"`
	City       string `json:"city"`
	Phone      string `json:"phone"`
	PostalCode int    `json:"postalCode"`
	UserID     string `json:"userID" gorm:"size:191"`
	User       *User  `json:"user"`
}
