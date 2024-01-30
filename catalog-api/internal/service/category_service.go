package service

import (
	"github.com/ifonso/my-commerce/catalog-api/internal/database"
	"github.com/ifonso/my-commerce/catalog-api/internal/entity"
)

type CategoryService struct {
	CategoryDB database.CategoryDB
}

func NewCategoryService(categoryDB database.CategoryDB) *CategoryService {
	return &CategoryService{CategoryDB: categoryDB}
}

func (c *CategoryService) GetCategories() ([]*entity.Category, error) {
	categories, err := c.CategoryDB.GetCategories()
	if err != nil {
		return nil, err
	}
	return categories, nil
}

func (c *CategoryService) CreateCategory(name string) (*entity.Category, error) {
	category := entity.NewCategory(name)
	_, err := c.CategoryDB.CreateCategory(category)
	if err != nil {
		return nil, err
	}
	return category, nil
}

func (c *CategoryService) GetCategory(id string) (*entity.Category, error) {
	category, err := c.CategoryDB.GetCategory(id)
	if err != nil {
		return nil, err
	}
	return category, nil
}
