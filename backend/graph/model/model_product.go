package model

import (
	"time"
)

type Category struct {
	ID       string     `json:"id"`
	Name     string     `json:"name"`
	Products []*Product `json:"products"`
}

type Product struct {
	ID          string          `json:"id"`
	Name        string          `json:"name"`
	Images      []*ProductImage `json:"images"`
	Description string          `json:"description"`
	Price       int             `json:"price"`
	Discount    float64         `json:"discount"`
	Stock       int             `json:"stock"`
	Metadata    string          `json:"metadata"`
	CreatedAt   time.Time       `json:"createdAt"`
	CategoryID  string          `json:"categoryID" gorm:"size:191"`
	Category    *Category       `json:"category"`
	ShopID      string          `json:"shopID" gorm:"size:191"`
	Shop        *Shop           `json:"shop"`
	SoldCount   int             `json:"soldCount"`
	IsReviewed  bool            `json:"isReviewed"`
}

type ProductImage struct {
	ID        string   `json:"id"`
	Image     string   `json:"image"`
	ProductID string   `json:"productID" gorm:"size:191"`
	Product   *Product `json:"product"`
}
