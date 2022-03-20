package model

type Review struct {
	ID          string   `json:"id"`
	UserID      string   `json:"userID" gorm:"size:191"`
	User        *User    `json:"user"`
	Score       int      `json:"score"`
	Description string   `json:"description"`
	Image       string   `json:"image"`
	Anonymous   bool     `json:"anonymous"`
	ProductID   string   `json:"productID" gorm:"size:191"`
	Product     *Product `json:"product"`
}
