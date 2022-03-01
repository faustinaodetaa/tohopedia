package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/faustinaodetaa/backend/graph/generated"
	"github.com/faustinaodetaa/backend/graph/model"
)

func (r *cartResolver) Product(ctx context.Context, obj *model.Cart) (*model.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *cartResolver) User(ctx context.Context, obj *model.Cart) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateCart(ctx context.Context, input model.NewCart) (*model.Cart, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateCart(ctx context.Context, id string, input model.UpdateCart) (*model.Cart, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteCart(ctx context.Context, id string) (*model.Cart, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) GetCart(ctx context.Context) (*model.Cart, error) {
	panic(fmt.Errorf("not implemented"))
}

// Cart returns generated.CartResolver implementation.
func (r *Resolver) Cart() generated.CartResolver { return &cartResolver{r} }

type cartResolver struct{ *Resolver }
