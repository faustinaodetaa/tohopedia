package model

type DataMap struct {
	Count      int    `json:"count"`
	Additional *int   `json:"additional"`
	Name       string `json:"name"`
}
