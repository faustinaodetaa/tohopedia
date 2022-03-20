package model

import "time"

type Transaction struct {
	ID        string   `json:"id"`
	UserID    string   `json:"userID" gorm:"size:191"`
	User      *User    `json:"user"`
	AddressID string   `json:"addressID" gorm:"size:191"`
	Address   *Address `json:"address"`
	CourierID string   `json:"courierID" gorm:"size:191"`
	Courier   *Courier `json:"courier"`

	Date time.Time `json:"date"`
}

type TransactionDetail struct {
	TransactionID string       `json:"transactionID" gorm:"size:191"`
	Transaction   *Transaction `json:"transaction"`
	ProductID     string       `json:"productID" gorm:"size:191"`
	Product       *Product     `json:"product"`
	Qty           int          `json:"qty"`
}
