package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/faustinaodetaa/backend/config"
	"github.com/faustinaodetaa/backend/graph/model"
	"github.com/google/uuid"
)

func (r *mutationResolver) CreateCourier(ctx context.Context, input model.NewCourier) (*model.Courier, error) {
	db := config.GetDB()

	model := &model.Courier{
		ID:            uuid.NewString(),
		Name:          input.Name,
		Price:         input.Price,
		EstimatedTime: input.EstimatedTime,
	}
	err := db.Create(model).Error
	return model, err
}

func (r *queryResolver) Couriers(ctx context.Context) ([]*model.Courier, error) {
	db := config.GetDB()

	var models []*model.Courier
	return models, db.Find(&models).Error
}
