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

func (r *mutationResolver) CreateShop(ctx context.Context, input model.NewShop) (*model.Shop, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	userId := ctx.Value("auth").(*service.JwtCustomClaim).ID

	loc, _ := time.LoadLocation("Asia/Jakarta")
	model := &model.Shop{
		ID:          uuid.NewString(),
		Name:        input.Name,
		NameSlug:    input.NameSlug,
		Address:     input.Address,
		Slogan:      "",
		Description: "",
		Profile:     "",
		OpenHour:    time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), 10+7, 0, 0, 0, loc),

		CloseHour: time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), 20+7, 0, 0, 0, loc),
		IsOpen:    true,
		Points:    0,
		UserID:    userId,
		Phone:     input.Phone,
	}

	err := db.Create(model).Error
	return model, err
}

func (r *mutationResolver) UpdateShop(ctx context.Context, id string, input model.UpdateShop) (*model.Shop, error) {
	db := config.GetDB()
	model := new(model.Shop)

	// userId := ctx.Value("auth").(*service.JwtCustomClaim).ID
	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	model.Profile = input.Profile
	model.Name = input.Name
	model.NameSlug = input.NameSlug
	model.Slogan = input.Slogan
	model.Description = input.Description
	model.OpenHour = input.OpenHour
	model.CloseHour = input.CloseHour
	model.IsOpen = input.IsOpen
	// model.UserID = userId

	return model, db.Save(model).Error
}

func (r *queryResolver) GetShop(ctx context.Context) (*model.Shop, error) {
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "Error, token gaada",
		}
	}

	db := config.GetDB()

	var shop model.Shop
	userId := ctx.Value("auth").(*service.JwtCustomClaim).ID

	if err := db.Model(shop).Where("user_id = ?", userId).Take(&shop).Error; err != nil {
		return nil, err
	}

	return &shop, nil
}

func (r *queryResolver) ShopByID(ctx context.Context, id string) (*model.Shop, error) {
	db := config.GetDB()

	model := new(model.Shop)
	return model, db.First(model, "id = ?", id).Error
}

func (r *queryResolver) Shops(ctx context.Context) ([]*model.Shop, error) {
	db := config.GetDB()

	var models []*model.Shop
	return models, db.Find(&models).Error
}

func (r *shopResolver) User(ctx context.Context, obj *model.Shop) (*model.User, error) {
	db := config.GetDB()
	var user *model.User
	if err := db.Where("id = ?", obj.UserID).Find(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (r *shopResolver) Products(ctx context.Context, obj *model.Shop) (*model.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

// Shop returns generated.ShopResolver implementation.
func (r *Resolver) Shop() generated.ShopResolver { return &shopResolver{r} }

type shopResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *queryResolver) Shop(ctx context.Context, id string) (*model.Shop, error) {
	db := config.GetDB()

	var shop model.Shop
	userId := ctx.Value("auth").(*service.JwtCustomClaim).ID

	if err := db.Model(shop).Where("user_id = ?", userId).Take(&shop).Error; err != nil {
		return nil, err
	}

	return &shop, nil
}
func (r *shopResolver) Phone(ctx context.Context, obj *model.Shop) (string, error) {
	panic(fmt.Errorf("not implemented"))
}
