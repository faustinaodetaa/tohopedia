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

func (r *mutationResolver) CreateReview(ctx context.Context, input model.NewReview) (*model.Review, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	userId := ctx.Value("auth").(*service.JwtCustomClaim).ID

	model := &model.Review{
		ID:          uuid.NewString(),
		UserID:      userId,
		Score:       input.Score,
		Description: input.Description,
		Image:       input.Image,
		Anonymous:   input.Anonymous,
		ProductID:   input.Product,
	}

	err := db.Create(model).Error
	return model, err
}

func (r *queryResolver) Review(ctx context.Context, productID string) ([]*model.Review, error) {
	db := config.GetDB()

	var models []*model.Review
	return models, db.Where("product_id = ?", productID).Find(&models).Error
}

func (r *reviewResolver) User(ctx context.Context, obj *model.Review) (*model.User, error) {
	db := config.GetDB()
	var user *model.User
	if err := db.Where("id = ?", obj.UserID).Find(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (r *reviewResolver) Product(ctx context.Context, obj *model.Review) (*model.Product, error) {
	db := config.GetDB()
	var product *model.Product
	if err := db.Where("id = ?", obj.ProductID).Find(&product).Error; err != nil {
		return nil, err
	}

	return product, nil
}

// Review returns generated.ReviewResolver implementation.
func (r *Resolver) Review() generated.ReviewResolver { return &reviewResolver{r} }

type reviewResolver struct{ *Resolver }
