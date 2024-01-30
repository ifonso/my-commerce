package database

import (
	"database/sql"

	"github.com/ifonso/my-commerce/catalog-api/internal/entity"
)

// Struct que tem conexão com o banco de dados
// de categorias
type CategoryDB struct {
	db *sql.DB
}

func NewCategoryDB(db *sql.DB) *CategoryDB {
	return &CategoryDB{db: db}
}

func (c *CategoryDB) GetCategories() ([]*entity.Category, error) {
	rows, error := c.db.Query("SELECT id, name FROM categories")
	if error != nil {
		return nil, error
	}

	defer rows.Close()

	categories := []*entity.Category{}

	for rows.Next() {
		var category entity.Category
		if err := rows.Scan(&category.ID, &category.Name); err != nil {
			return nil, err
		}
		categories = append(categories, &category)
	}
	return categories, nil
}

// Função responsável por criar uma categoria no banco de dados
// case ela execute com sucesso (id da categoria, nil)
// caso contrário (string vazia, error)
func (c *CategoryDB) CreateCategory(category *entity.Category) (*entity.Category, error) {
	_, err := c.db.Exec("INSERT INTO categories (id, name) VALUES (?, ?)", category.ID, category.Name)
	if err != nil {
		return nil, err
	}
	return category, nil
}

func (c *CategoryDB) GetCategory(id string) (*entity.Category, error) {
	category := entity.Category{}
	err := c.db.
		QueryRow("SELECT id, name FROM categories WHERE id = ?", id).
		Scan(&category.ID, &category.Name)

	if err != nil {
		return nil, err
	}

	return &category, nil
}
