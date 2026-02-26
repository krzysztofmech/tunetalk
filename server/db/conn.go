package db

import (
	"database/sql"
	"fmt"
	"log"
	"tunetalk/util"
)

var db *sql.DB

func InitDB() error {
	user := util.GetEnv("DATABASE_USER", "mysql")
	password := util.GetEnv("DATABASE_PASSWORD", "mysql")
	host := util.GetEnv("DATABASE_HOST", "localhost")
	port := util.GetEnv("DATABASE_PORT", "3306")

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/gym",
		user, password, host, port,
	)

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

