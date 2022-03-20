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
	db := config.GetDB()
	var user *model.User
	if err := db.Where("id = ?", obj.UserID).Find(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
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
		Title:      input.Title,
		Phone:      input.Phone,
		PostalCode: input.PostalCode,
		UserID:     userId,
		IsPrimary:  input.IsPrimary,
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
	model.Title = input.Title
	model.IsPrimary = input.IsPrimary

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

func (r *queryResolver) Address(ctx context.Context) (*model.Address, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Addresses(ctx context.Context, user string) ([]*model.Address, error) {
	db := config.GetDB()

	var models []*model.Address
	return models, db.Where("user_id = ?", user).Order("is_primary desc").Find(&models).Error
}

func (r *queryResolver) AddressByID(ctx context.Context, id string) (*model.Address, error) {
	db := config.GetDB()

	model := new(model.Address)
	return model, db.First(model, "id = ?", id).Error
}

// Address returns generated.AddressResolver implementation.
func (r *Resolver) Address() generated.AddressResolver { return &addressResolver{r} }

type addressResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *addressResolver) IsPrimary(ctx context.Context, obj *model.Address) (bool, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *queryResolver) GetAddress(ctx context.Context) (*model.Address, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *addressResolver) Title(ctx context.Context, obj *model.Address) (string, error) {
	panic(fmt.Errorf("not implemented"))
}
