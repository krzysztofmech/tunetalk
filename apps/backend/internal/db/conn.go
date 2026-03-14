package db

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"tunetalk/util"
)

var db *sql.DB

func InitDB() error {
	user := util.GetEnv("DATABASE_USER", "mysql")
	password := util.GetEnv("DATABASE_PASSWORD", "mysql")
	host := util.GetEnv("DATABASE_HOST", "localhost")
	port := util.GetEnv("DATABASE_PORT", "3306")
	name := util.GetEnv("DATABASE_NAME", "tunetalk")

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s",
		user, password, host, port, name,
	)

	fmt.Printf(dsn)

	var err error
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	if err = db.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Database connected successfully")

	return nil
}

func CloseDB() error {
	if db != nil {
		return db.Close()
	}
	return nil
}

func GetDB() *sql.DB {
	return db
}
