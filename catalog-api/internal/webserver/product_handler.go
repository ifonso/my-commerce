package webserver

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/ifonso/my-commerce/catalog-api/internal/entity"
	"github.com/ifonso/my-commerce/catalog-api/internal/service"
)

type WebProductHandler struct {
	ProductService *service.ProductService
}

func NewWebProductHandler(productService *service.ProductService) *WebProductHandler {
	return &WebProductHandler{ProductService: productService}
}

func (wh *WebProductHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
	products, err := wh.ProductService.GetProducts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func (wh *WebProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
	}

	product, err := wh.ProductService.GetProduct(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(product)
}

func (wh *WebProductHandler) GetProductsByCategoryID(w http.ResponseWriter, h *http.Request) {
	categoryID := chi.URLParam(h, "category_id")
	if categoryID == "" {
		http.Error(w, "categoryID is required", http.StatusBadRequest)
	}

	products, err := wh.ProductService.GetProductsByCategoryID(categoryID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func (wh *WebProductHandler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	product := entity.Product{}
	err := json.NewDecoder(r.Body).Decode(&product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	result, err := wh.ProductService.CreateProduct(product.Name, product.Description, product.Price, product.CategoryID, product.ImageURL)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}
