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
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func (r *authOpsResolver) Login(ctx context.Context, obj *model.AuthOps, email string, password string) (interface{}, error) {
	return service.UserLogin(ctx, email, password)
}

func (r *authOpsResolver) Register(ctx context.Context, obj *model.AuthOps, input model.NewUser) (interface{}, error) {
	return service.UserRegister(ctx, input)
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateUser(ctx context.Context, id string, input model.UpdateUser) (*model.User, error) {
	db := config.GetDB()
	model := new(model.User)

	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	model.Email = input.Email
	model.Picture = input.Picture
	model.Name = input.Name
	model.Dob = input.Dob
	model.Gender = input.Gender
	model.Phone = input.Phone

	return model, db.Save(model).Error
}

func (r *mutationResolver) Auth(ctx context.Context) (*model.AuthOps, error) {
	return &model.AuthOps{}, nil
}

func (r *mutationResolver) UpdateBalance(ctx context.Context, id string, input model.UpdateBalance) (*model.User, error) {
	db := config.GetDB()
	model := new(model.User)

	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	model.Balance += input.Balance

	return model, db.Save(model).Error
}

func (r *mutationResolver) UpdateBlockStatus(ctx context.Context, id string, input model.UpdateBlockStatus) (*model.User, error) {
	db := config.GetDB()
	model := new(model.User)

	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	model.IsBlocked = input.IsBlocked

	return model, db.Save(model).Error
}

func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	return service.UserGetByID(ctx, id)
}

func (r *queryResolver) Protected(ctx context.Context) (string, error) {
	return "Success", nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	// var models []*model.User
	// return models, r.DB.Find(&models).Error
	db := config.GetDB()

	var models []*model.User
	return models, db.Find(&models).Error
	// return service.Users(ctx)
}

func (r *queryResolver) GetCurrentUser(ctx context.Context) (*model.User, error) {
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "Error, token gaada",
		}
	}

	id := ctx.Value("auth").(*service.JwtCustomClaim).ID

	return service.UserGetByID(ctx, id)
}

// AuthOps returns generated.AuthOpsResolver implementation.
func (r *Resolver) AuthOps() generated.AuthOpsResolver { return &authOpsResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type authOpsResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
