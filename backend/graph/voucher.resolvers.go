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
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func (r *mutationResolver) CreateVoucher(ctx context.Context, input model.NewVoucher) (*model.Voucher, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	model := &model.Voucher{
		ID:          uuid.NewString(),
		Name:        input.Name,
		Description: input.Description,
		Discount:    input.Discount,
		Tnc:         input.Tnc,
		StartTime:   input.StartTime,
		EndTime:     input.EndTime,
		ShopID:      *input.Shop,
		IsGlobal:    input.IsGlobal,
	}
	err := db.Create(model).Error
	return model, err
}

func (r *mutationResolver) RedeemVoucher(ctx context.Context, input model.RedeemVoucher) (*model.UserVoucher, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	model := &model.UserVoucher{
		ID:        uuid.NewString(),
		UserID:    input.User,
		VoucherID: input.Voucher,
	}

	err := db.Create(model).Error
	return model, err
}

func (r *queryResolver) Vouchers(ctx context.Context, shop string) ([]*model.Voucher, error) {
	db := config.GetDB()

	var models []*model.Voucher
	return models, db.Where("shop_id = ?", shop).Find(&models).Error
}

func (r *queryResolver) GlobalVoucher(ctx context.Context) ([]*model.Voucher, error) {
	db := config.GetDB()

	var models []*model.Voucher
	return models, db.Where("is_global = 1").Find(&models).Error
}

func (r *queryResolver) AllVoucher(ctx context.Context) ([]*model.Voucher, error) {
	db := config.GetDB()

	var models []*model.Voucher
	return models, db.Where("is_global = 0").Find(&models).Error
}

func (r *queryResolver) UserVouchers(ctx context.Context, user string) ([]*model.UserVoucher, error) {
	db := config.GetDB()

	var models []*model.UserVoucher
	return models, db.Where("user_id = ?", user).Find(&models).Error
}

func (r *userVoucherResolver) User(ctx context.Context, obj *model.UserVoucher) (*model.User, error) {
	db := config.GetDB()
	var user *model.User
	if err := db.Where("id = ?", obj.UserID).Find(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userVoucherResolver) Voucher(ctx context.Context, obj *model.UserVoucher) (*model.Voucher, error) {
	db := config.GetDB()
	var voucher *model.Voucher
	if err := db.Where("id = ?", obj.VoucherID).Find(&voucher).Error; err != nil {
		return nil, err
	}

	return voucher, nil
}

func (r *voucherResolver) Shop(ctx context.Context, obj *model.Voucher) (*model.Shop, error) {
	db := config.GetDB()
	var shop *model.Shop
	if err := db.Where("id = ?", obj.ShopID).Find(&shop).Error; err != nil {
		return nil, err
	}

	return shop, nil
}

// UserVoucher returns generated.UserVoucherResolver implementation.
func (r *Resolver) UserVoucher() generated.UserVoucherResolver { return &userVoucherResolver{r} }

// Voucher returns generated.VoucherResolver implementation.
func (r *Resolver) Voucher() generated.VoucherResolver { return &voucherResolver{r} }

type userVoucherResolver struct{ *Resolver }
type voucherResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *voucherResolver) StartTime(ctx context.Context, obj *model.Voucher) (*time.Time, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *voucherResolver) EndTime(ctx context.Context, obj *model.Voucher) (*time.Time, error) {
	panic(fmt.Errorf("not implemented"))
}
