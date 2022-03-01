package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/faustinaodetaa/backend/config"
	"github.com/faustinaodetaa/backend/directives"
	"github.com/faustinaodetaa/backend/graph"
	"github.com/faustinaodetaa/backend/graph/generated"

	// "github.com/faustinaodetaa/backend/graph/model"
	"github.com/faustinaodetaa/backend/middlewares"
	"github.com/faustinaodetaa/backend/migration"
	"github.com/go-chi/chi"

	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	// "gorm.io/driver/mysql"
	// "gorm.io/gorm"
)

const defaultPort = "8080"

func main() {
	migration.MigrateTable()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db := config.GetDB()
	sqlDB, _ := db.DB()
	defer sqlDB.Close()

	router := chi.NewRouter()

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		AllowedOrigins:  []string{"http://localhost:3000", "http://localhost:8080"},
		AllowOriginFunc: func(origin string) bool { return true },
		AllowedHeaders:  []string{"*"},
	}).Handler)

	router.Use(middlewares.AuthMiddleware)
	c := generated.Config{Resolvers: &graph.Resolver{}}
	c.Directives.Auth = directives.Auth
	// dsn := "root:@tcp(127.0.0.1:3306)/tohopedia?charset=utf8mb4&parseTime=True&loc=Local"
	// db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	// if err != nil {
	// 	panic(err)
	// }

	// db.AutoMigrate(&model.User{})

	// srv := handler.NewDefaultServer(
	// 	generated.NewExecutableSchema(
	// 		c,
	// 	),
	// )
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(c))
	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				// Check against your desired domains here
				return r.Host == "localhost:8080"
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
	})
	// srv := handler.NewDefaultServer(
	// 	generated.NewExecutableSchema(
	// 		generated.Config{
	// 			Resolvers: &graph.Resolver{},
	// 		},
	// 	),
	// )

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
