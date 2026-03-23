package middleware

import (
	"net/http"
	"tunetalk/util"
)

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		cookie, err := req.Cookie("auth_cookie")
		if err != nil {
			AuthenticationFailed(w)
			return
		}

		if cookie.Value == "" {
			AuthenticationFailed(w)
			return
		}

		next.ServeHTTP(w, req)
	})
}

func AuthenticationFailed(w http.ResponseWriter) {
	util.WriteError(w, http.StatusUnauthorized, "Unauthorized")
}
