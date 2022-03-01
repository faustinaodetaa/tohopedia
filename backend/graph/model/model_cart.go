package model

type Cart struct {
	ID        string   `json:"id"`
	Qty       int      `json:"qty"`
	ProductID string   `json:"productID" gorm:"size:191"`
	Product   *Product `json:"product"`
	UserID    string   `json:"userID" gorm:"size:191"`
	User      *User    `json:"user"`
}
