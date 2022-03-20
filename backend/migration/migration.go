package migration

import (
	"github.com/faustinaodetaa/backend/config"

	"github.com/faustinaodetaa/backend/graph/model"
)

func MigrateTable() {
	db := config.GetDB()

	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Shop{})
	db.AutoMigrate(&model.Category{})
	db.AutoMigrate(&model.Product{})
	db.AutoMigrate(&model.ProductImage{})
	db.AutoMigrate(&model.Cart{})
	db.AutoMigrate(&model.Address{})
	db.AutoMigrate(&model.Review{})
	db.AutoMigrate(&model.Courier{})
	db.AutoMigrate(&model.Wishlist{})
	db.AutoMigrate(&model.Voucher{})
	db.AutoMigrate(&model.Transaction{})
	db.AutoMigrate(&model.TransactionDetail{})

}
