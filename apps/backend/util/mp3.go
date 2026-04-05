package util

import (
	"io"

	"github.com/tcolgate/mp3"
)

func GetDuration(file io.Reader) (float64, error) {
	var duration float64

	d := mp3.NewDecoder(file)

	var f mp3.Frame
	skipped := 0

	for {

		if err := d.Decode(&f, &skipped); err != nil {
			if err == io.EOF {
				break
			}
			return 0, err
		}
		duration = duration + f.Duration().Seconds()
	}

	return duration, nil
}
