package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/faustinaodetaa/backend/config"
	"github.com/faustinaodetaa/backend/graph/generated"
	"github.com/faustinaodetaa/backend/graph/model"
	"github.com/faustinaodetaa/backend/service"
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func (r *mutationResolver) CreateWishlist(ctx context.Context, input model.NewWishlist) (*model.Wishlist, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	userId := ctx.Value("auth").(*service.JwtCustomClaim).ID

	model := &model.Wishlist{
		ID:        uuid.NewString(),
		ProductID: input.Product,
		UserID:    userId,
	}
	err := db.Create(model).Error
	return model, err
}

func (r *mutationResolver) DeleteWishlist(ctx context.Context, id string) (*model.Wishlist, error) {
	db := config.GetDB()

	model := new(model.Wishlist)
	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return model, db.Delete(model, "id = ?", id).Error
}

func (r *queryResolver) Wishlists(ctx context.Context, user string) ([]*model.Wishlist, error) {
	db := config.GetDB()

	var models []*model.Wishlist
	return models, db.Where("user_id = ?", user).Find(&models).Error
}

func (r *wishlistResolver) Product(ctx context.Context, obj *model.Wishlist) (*model.Product, error) {
	db := config.GetDB()
	var product *model.Product
	if err := db.Where("id = ?", obj.ProductID).Find(&product).Error; err != nil {
		return nil, err
	}

	return product, nil
}

func (r *wishlistResolver) User(ctx context.Context, obj *model.Wishlist) (*model.User, error) {
	db := config.GetDB()
	var user *model.User
	if err := db.Where("id = ?", obj.UserID).Find(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

// Wishlist returns generated.WishlistResolver implementation.
func (r *Resolver) Wishlist() generated.WishlistResolver { return &wishlistResolver{r} }

type wishlistResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) Wishlists(ctx context.Context, user string) ([]*model.Wishlist, error) {
	db := config.GetDB()

	var models []*model.Wishlist
	return models, db.Where("user_id = ?", user).Find(&models).Error
}
