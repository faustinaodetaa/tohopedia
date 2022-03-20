package service

import (
	"context"

	"github.com/faustinaodetaa/backend/config"
	"github.com/faustinaodetaa/backend/graph/model"
	"github.com/faustinaodetaa/backend/tools"

	"github.com/google/uuid"
)

func UserCreate(ctx context.Context, input model.NewUser) (*model.User, error) {
	db := config.GetDB()

	input.Password = tools.HashPassword(input.Password)

	user := model.User{
		ID:        uuid.NewString(),
		Email:     input.Email,
		Password:  input.Password,
		Name:      input.Name,
		Role:      "member",
		Balance:   0,
		IsBlocked: false,
	}

	if err := db.Model(user).Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UserGetByID(ctx context.Context, id string) (*model.User, error) {
	db := config.GetDB()

	var user model.User
	if err := db.Model(user).Where("id = ?", id).Take(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UserGetByEmail(ctx context.Context, email string) (*model.User, error) {
	db := config.GetDB()

	var user model.User
	if err := db.Model(user).Where("email LIKE ?", email).Take(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func Users(ctx context.Context) ([]*model.User, error) {
	db := config.GetDB()

	var models []*model.User
	return models, db.Error
}
