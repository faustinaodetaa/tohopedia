package model

type Wishlist struct {
	ID        string   `json:"id"`
	ProductID string   `json:"productID" gorm:"size:191"`
	Product   *Product `json:"product"`
	UserID    string   `json:"userID" gorm:"size:191"`
	User      *User    `json:"user"`
}
