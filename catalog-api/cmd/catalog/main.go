package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/ifonso/my-commerce/catalog-api/internal/database"
	"github.com/ifonso/my-commerce/catalog-api/internal/service"
	"github.com/ifonso/my-commerce/catalog-api/internal/webserver"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// TODO: colocar nas variáveis de ambiente
	PORT := ":8080"
	sqlURI := "root:root@tcp(localhost:3306)/my_commerce"
	db, err := sql.Open("mysql", sqlURI)

	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(*categoryDB)

	productDB := database.NewProductDB(db)
	productService := service.NewProductService(*productDB)

	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)
	webProductHandler := webserver.NewWebProductHandler(productService)

	c := chi.NewRouter()

	// Config middlewares
	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)

	// Category endpoints
	c.Get("/category/{id}", webCategoryHandler.GetCategory)
	c.Get("/category", webCategoryHandler.GetCategories)
	c.Post("/category", webCategoryHandler.CreateCategory)

	// Product endpoints
	c.Get("/product/{id}", webProductHandler.GetProduct)
	c.Get("/product", webProductHandler.GetProducts)
	c.Get("/product/category/{category_id}", webProductHandler.GetProductsByCategoryID)
	c.Post("/product", webProductHandler.CreateProduct)

	fmt.Println("Server running on port", PORT)
	http.ListenAndServe(PORT, c)
}
