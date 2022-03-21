package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/faustinaodetaa/backend/config"
	"github.com/faustinaodetaa/backend/graph/model"
)

func (r *queryResolver) VoucherPerTransaction(ctx context.Context) ([]*model.DataMap, error) {
	db := config.GetDB()

	var models []*model.DataMap
	return models, db.Raw(`SELECT
													v.name, COUNT(*) as "count"
												FROM
													transactions th JOIN vouchers v ON th.voucher_id = v.id
												GROUP BY v.id, v.name`).Find(&models).Error
}

func (r *queryResolver) SoldPerCategory(ctx context.Context) ([]*model.DataMap, error) {
	db := config.GetDB()

	var models []*model.DataMap
	return models, db.Raw(`SELECT 
													c.name, COUNT(*) as "count" 
												FROM 
													transaction_details td 
													JOIN products p ON td.product_id = p.id 
													JOIN categories c ON p.category_id = c.id
												GROUP BY c.id, c.name`).Find(&models).Error
}

func (r *queryResolver) TransactionPerShipping(ctx context.Context) ([]*model.DataMap, error) {
	db := config.GetDB()

	var models []*model.DataMap
	return models, db.Raw(`SELECT
                                c.name,
                                COUNT(*) as "count"
                            FROM 
                                couriers c
                                JOIN transactions th ON c.id = th.courier_id
                            GROUP BY c.id, c.name`).Find(&models).Error
}

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *queryResolver) TransactionsPerDay(ctx context.Context) ([]*model.DataMap, error) {
	panic(fmt.Errorf("not implemented"))
}
