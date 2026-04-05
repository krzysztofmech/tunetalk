package storage

import (
	"context"
	"fmt"
	"io"
	"log"
	"mime/multipart"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

const bucketName = "songs"

type UploadData struct {
	Title  string
	Artist string
	File   io.Reader
	Header *multipart.FileHeader
}

type Storage struct {
	client *minio.Client
}

func NewStorage() *Storage {
	endpoint := "localhost:9000"
	accessKeyID := "minioadmin"
	secretAccessKey := "minioadmin"
	useSSL := false

	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		log.Fatalln(err)
	}

	return &Storage{
		client: client,
	}
}

func (s *Storage) Upload(ctx context.Context, data UploadData) error {
	metadata := map[string]string{
		"artist": data.Artist,
		"title":  data.Title,
	}

	ok, err := s.client.BucketExists(ctx, bucketName)
	if err != nil {
		return err
	}
	if !ok {
		err := s.createBucket(ctx)
		if err != nil {
			return err
		}
	}

	if _, err := s.client.PutObject(
		ctx,
		bucketName,
		data.Title,
		data.File,
		data.Header.Size,
		minio.PutObjectOptions{ContentType: "audio/mpeg", UserMetadata: metadata},
	); err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func (s *Storage) DownloadSongByTitle(ctx context.Context, title string) (*minio.Object, error) {
	object, err := s.client.GetObject(
		ctx,
		bucketName,
		title,
		minio.GetObjectOptions{},
	)

	if err != nil {
		return nil, err
	}

	return object, nil
}

func (s *Storage) createBucket(ctx context.Context) error {
	err := s.client.MakeBucket(ctx, bucketName, minio.MakeBucketOptions{})
	if err != nil {
		return err
	}

	return nil
}
