package model

import "time"

type Voucher struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Discount    float64   `json:"discount"`
	Tnc         string    `json:"tnc"`
	StartTime   time.Time `json:"startTime"`
	EndTime     time.Time `json:"endTime"`
	ShopID      string    `json:"shopID" gorm:"size:191"`
	Shop        *Shop     `json:"shop"`
	IsGlobal    bool      `json:"isGlobal"`
}
