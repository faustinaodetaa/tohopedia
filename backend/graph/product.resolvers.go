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

func (r *categoryResolver) Products(ctx context.Context, obj *model.Category) ([]*model.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateCategory(ctx context.Context, input model.NewCategory) (*model.Category, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	model := &model.Category{
		ID:   uuid.NewString(),
		Name: input.Name,
	}
	err := db.Create(model).Error
	return model, err
}

func (r *mutationResolver) CreateProduct(ctx context.Context, input model.NewProduct) (*model.Product, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	shop := new(model.Shop)
	userId := ctx.Value("auth").(*service.JwtCustomClaim).ID

	if err := db.Where("user_id = ?", userId).Find(&shop).Error; err != nil {
		return nil, err
	}

	model := &model.Product{
		ID:          uuid.NewString(),
		Name:        input.Name,
		Images:      []*model.ProductImage{},
		Description: input.Description,
		Price:       input.Price,
		Discount:    input.Discount,
		Stock:       input.Stock,
		Metadata:    input.Metadata,
		CreatedAt:   time.Now(),
		CategoryID:  input.Category,
		ShopID:      shop.ID,
	}
	err := db.Create(model).Error
	return model, err
}

func (r *mutationResolver) CreateImage(ctx context.Context, input model.NewProductImage) (*model.ProductImage, error) {
	db := config.GetDB()
	if ctx.Value("auth") == nil {
		return nil, &gqlerror.Error{
			Message: "no token",
		}
	}

	product := new(model.Product)

	model := &model.ProductImage{
		ID:        uuid.NewString(),
		Image:     input.Image,
		ProductID: product.ID,
	}
	err := db.Create(model).Error
	return model, err
}

func (r *productResolver) Images(ctx context.Context, obj *model.Product) ([]*model.ProductImage, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *productResolver) Category(ctx context.Context, obj *model.Product) (*model.Category, error) {
	db := config.GetDB()
	var category *model.Category
	if err := db.Where("id = ?", obj.CategoryID).Find(&category).Error; err != nil {
		return nil, err
	}

	return category, nil
}

func (r *productResolver) Shop(ctx context.Context, obj *model.Product) (*model.Shop, error) {
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

func (r *productImageResolver) Product(ctx context.Context, obj *model.ProductImage) (*model.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Product(ctx context.Context, id string) (*model.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) GetAllCategory(ctx context.Context) ([]*model.Category, error) {
	db := config.GetDB()

	var models []*model.Category
	return models, db.Find(&models).Error
}

// Category returns generated.CategoryResolver implementation.
func (r *Resolver) Category() generated.CategoryResolver { return &categoryResolver{r} }

// Product returns generated.ProductResolver implementation.
func (r *Resolver) Product() generated.ProductResolver { return &productResolver{r} }

// ProductImage returns generated.ProductImageResolver implementation.
func (r *Resolver) ProductImage() generated.ProductImageResolver { return &productImageResolver{r} }

type categoryResolver struct{ *Resolver }
type productResolver struct{ *Resolver }
type productImageResolver struct{ *Resolver }
