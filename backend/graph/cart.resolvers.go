package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/faustinaodetaa/backend/config"
	"github.com/faustinaodetaa/backend/graph/generated"
	"github.com/faustinaodetaa/backend/graph/model"
	"github.com/faustinaodetaa/backend/service"
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func (r *cartResolver) Product(ctx context.Context, obj *model.Cart) (*model.Product, error) {
	db := config.GetDB()
	var product *model.Product
	if err := db.Where("id = ?", obj.ProductID).Find(&product).Error; err != nil {
		return nil, err
	}

	return product, nil
}

func (r *cartResolver) User(ctx context.Context, obj *model.Cart) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateCart(ctx context.Context, input model.NewCart) (*model.Cart, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	userId := ctx.Value("auth").(*service.JwtCustomClaim).ID

	model := &model.Cart{
		ID:        uuid.NewString(),
		Qty:       input.Qty,
		ProductID: input.Product,
		UserID:    userId,
	}

	err := db.Create(model).Error
	return model, err
}

func (r *mutationResolver) UpdateCart(ctx context.Context, id string, input model.UpdateCart) (*model.Cart, error) {
	db := config.GetDB()
	model := new(model.Cart)

	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	model.Qty = input.Qty

	return model, db.Save(model).Error
}

func (r *mutationResolver) DeleteCart(ctx context.Context, id string) (*model.Cart, error) {
	db := config.GetDB()

	model := new(model.Cart)
	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return model, db.Delete(model, "id = ?", id).Error
}

func (r *queryResolver) GetCart(ctx context.Context) (*model.Cart, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) GetCartByUser(ctx context.Context, user string) ([]*model.Cart, error) {
	db := config.GetDB()

	var models []*model.Cart
	return models, db.Where("user_id = ?", user).Find(&models).Error
}

// Cart returns generated.CartResolver implementation.
func (r *Resolver) Cart() generated.CartResolver { return &cartResolver{r} }

type cartResolver struct{ *Resolver }
