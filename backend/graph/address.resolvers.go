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

func (r *addressResolver) User(ctx context.Context, obj *model.Address) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateAddress(ctx context.Context, input model.NewAddress) (*model.Address, error) {
	db := config.GetDB()

	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	userId := ctx.Value("auth").(*service.JwtCustomClaim).ID

	model := &model.Address{
		ID:         uuid.NewString(),
		Location:   input.Location,
		City:       input.City,
		Phone:      input.Phone,
		PostalCode: input.PostalCode,
		UserID:     userId,
	}

	err := db.Create(model).Error
	return model, err
}

func (r *mutationResolver) UpdateAddress(ctx context.Context, id string, input model.UpdateAddress) (*model.Address, error) {
	model := new(model.Address)
	db := config.GetDB()

	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	model.Location = input.Location
	model.City = input.City
	model.Phone = input.Phone
	model.PostalCode = input.PostalCode

	return model, db.Save(model).Error
}

func (r *mutationResolver) DeleteAddress(ctx context.Context, id string) (*model.Address, error) {
	model := new(model.Address)
	db := config.GetDB()

	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return model, db.Delete(model, "id = ?", id).Error
}

func (r *queryResolver) GetAddress(ctx context.Context) (*model.Address, error) {
	panic(fmt.Errorf("not implemented"))
}

// Address returns generated.AddressResolver implementation.
func (r *Resolver) Address() generated.AddressResolver { return &addressResolver{r} }

type addressResolver struct{ *Resolver }
