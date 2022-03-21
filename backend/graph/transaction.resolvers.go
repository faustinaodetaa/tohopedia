package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"time"

	"github.com/faustinaodetaa/backend/config"
	"github.com/faustinaodetaa/backend/graph/generated"
	"github.com/faustinaodetaa/backend/graph/model"
	"github.com/faustinaodetaa/backend/service"
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func (r *mutationResolver) CreateTransaction(ctx context.Context, input model.NewTransaction) (*model.Transaction, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	userId := ctx.Value("auth").(*service.JwtCustomClaim).ID

	model := &model.Transaction{
		ID:        uuid.NewString(),
		UserID:    userId,
		AddressID: input.Address,
		CourierID: input.Courier,
		Date:      time.Now(),
		VoucherID: input.Voucher,
	}
	err := db.Create(model).Error
	return model, err
}

func (r *mutationResolver) CreateTransactionDetail(ctx context.Context, input model.NewTransactionDetail) (*model.TransactionDetail, error) {
	db := config.GetDB()

	model := &model.TransactionDetail{
		ID:            uuid.NewString(),
		TransactionID: input.Transaction,
		ProductID:     input.Product,
		Qty:           input.Qty,
		IsReviewed:    false,
	}
	err := db.Create(model).Error
	return model, err
}

func (r *mutationResolver) UpdateStatus(ctx context.Context, product string) (*model.TransactionDetail, error) {
	db := config.GetDB()
	model := new(model.TransactionDetail)

	if err := db.First(model, "product_id = ?", product).Error; err != nil {
		return nil, err
	}

	model.IsReviewed = true

	return model, db.Save(model).Error
}

func (r *queryResolver) UserTransaction(ctx context.Context, user string) ([]*model.Transaction, error) {
	db := config.GetDB()

	var models []*model.Transaction
	return models, db.Where("user_id = ?", user).Find(&models).Error
}

func (r *queryResolver) UserTransactionByID(ctx context.Context, transaction string) (*model.Transaction, error) {
	db := config.GetDB()

	var models *model.Transaction
	return models, db.Where("id = ?", transaction).Find(&models).Error
}

func (r *queryResolver) UserTransactionDetail(ctx context.Context, transaction string) ([]*model.TransactionDetail, error) {
	db := config.GetDB()

	var models []*model.TransactionDetail
	return models, db.Where("transaction_id = ?", transaction).Find(&models).Error
}

func (r *queryResolver) Transactions(ctx context.Context) ([]*model.Transaction, error) {
	db := config.GetDB()

	var models []*model.Transaction
	return models, db.Find(&models).Error
}

func (r *queryResolver) TransactionDetails(ctx context.Context, transaction string) ([]*model.TransactionDetail, error) {
	db := config.GetDB()

	var models []*model.TransactionDetail
	return models, db.Where("transaction_id = ?", transaction).Find(&models).Error
}

func (r *transactionResolver) User(ctx context.Context, obj *model.Transaction) (*model.User, error) {
	db := config.GetDB()
	var user *model.User
	if err := db.Where("id = ?", obj.UserID).Find(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (r *transactionResolver) Address(ctx context.Context, obj *model.Transaction) (*model.Address, error) {
	db := config.GetDB()
	var address *model.Address
	if err := db.Where("id = ?", obj.AddressID).Find(&address).Error; err != nil {
		return nil, err
	}

	return address, nil
}

func (r *transactionResolver) Courier(ctx context.Context, obj *model.Transaction) (*model.Courier, error) {
	db := config.GetDB()
	var courier *model.Courier
	if err := db.Where("id = ?", obj.CourierID).Find(&courier).Error; err != nil {
		return nil, err
	}

	return courier, nil
}

func (r *transactionResolver) Voucher(ctx context.Context, obj *model.Transaction) (*model.Voucher, error) {
	db := config.GetDB()
	var voucher *model.Voucher
	if err := db.Where("id = ?", obj.VoucherID).Find(&voucher).Error; err != nil {
		return nil, err
	}

	return voucher, nil
}

func (r *transactionDetailResolver) Transaction(ctx context.Context, obj *model.TransactionDetail) (*model.Transaction, error) {
	db := config.GetDB()
	var transaction *model.Transaction
	if err := db.Where("id = ?", obj.TransactionID).Find(&transaction).Error; err != nil {
		return nil, err
	}

	return transaction, nil
}

func (r *transactionDetailResolver) Product(ctx context.Context, obj *model.TransactionDetail) (*model.Product, error) {
	db := config.GetDB()
	var product *model.Product
	if err := db.Where("id = ?", obj.ProductID).Find(&product).Error; err != nil {
		return nil, err
	}

	return product, nil
}

// Transaction returns generated.TransactionResolver implementation.
func (r *Resolver) Transaction() generated.TransactionResolver { return &transactionResolver{r} }

// TransactionDetail returns generated.TransactionDetailResolver implementation.
func (r *Resolver) TransactionDetail() generated.TransactionDetailResolver {
	return &transactionDetailResolver{r}
}

type transactionResolver struct{ *Resolver }
type transactionDetailResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *transactionDetailResolver) ID(ctx context.Context, obj *model.TransactionDetail) (string, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *transactionDetailResolver) IsReviewed(ctx context.Context, obj *model.TransactionDetail) (bool, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *transactionDetailResolver) Status(ctx context.Context, obj *model.TransactionDetail) (string, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *transactionResolver) Status(ctx context.Context, obj *model.Transaction) (string, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *transactionResolver) Shop(ctx context.Context, obj *model.Transaction) (*model.Shop, error) {
	panic(fmt.Errorf("not implemented"))

}
