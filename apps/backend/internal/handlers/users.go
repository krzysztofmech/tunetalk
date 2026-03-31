package handlers

import (
	"fmt"
	"net/http"
	"tunetalk/internal/repositories"
	"tunetalk/internal/services"
	"tunetalk/internal/validators"
	"tunetalk/util"

	"github.com/go-chi/chi"
)

type UsersHandler struct {
	usersService *services.UsersService
}

func NewUsersHandler(usersService *services.UsersService) *UsersHandler {
	return &UsersHandler{
		usersService: usersService,
	}
}

func (h *UsersHandler) CreateUser(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	params, err := util.ParseParams[repositories.CreateUserParams](req.Body)
	if err != nil {
		util.WriteError(w, http.StatusBadRequest, "CreateUser - invalid params")
	}

	err = validators.ValidateCreateUserParams(params)
	if err != nil {
		util.WriteError(w, http.StatusBadRequest, err.Error())
		return
	}

	user, err := h.usersService.CreateUser(ctx, params)

	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, "CreateUser - failed to create a user")
		return
	}

	util.WriteJSON(w, http.StatusOK, user)
}

func (h *UsersHandler) GetUsers(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	users, err := h.usersService.GetUsers(ctx)

	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, "GetUsers - failed to get users")
		return
	}

	util.WriteJSON(w, http.StatusOK, users)
}

func (h *UsersHandler) GetUser(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	id, err := util.ParseIdParam(chi.URLParam(req, "id"))
	if err != nil {
		util.WriteError(w, http.StatusBadRequest, "GetUser - no id found in path")
		return
	}

	user, err := h.usersService.GetUser(ctx, id)

	if err != nil {
		util.WriteError(w, http.StatusNotFound, "GetUser - failed to get a user")
		return
	}

	util.WriteJSON(w, http.StatusOK, user)
}

func (h *UsersHandler) Login(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	id, err := util.ParseIdParam(chi.URLParam(req, "id"))

	if err != nil {
		util.WriteError(w, http.StatusBadRequest, "Me - no id found in path")
		return
	}

	user, err := h.usersService.GetUser(ctx, id)

	if err != nil {
		util.WriteError(w, http.StatusNotFound, "Me - no user found with provided id")
		return
	}

	cookie := &http.Cookie{
		Name:     "auth_cookie",
		Value:    fmt.Sprintf("%v|%s", user.ID, user.Name),
		MaxAge:   36000000,
		SameSite: http.SameSiteLaxMode,
		HttpOnly: true,
		Path:     "/",
	}

	http.SetCookie(w, cookie)
	util.WriteJSON(w, http.StatusOK, "Authorized")
}

func (h *UsersHandler) Me(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	cookie, err := req.Cookie("auth_cookie")

	if err != nil {
		util.WriteError(w, http.StatusBadRequest, "Me - no cookie found")
		return
	}

	storedUser, err := util.DecodeCookie(cookie.Value)
	if err != nil {
		util.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	user, err := h.usersService.GetUser(ctx, storedUser.ID)

	if err != nil {
		util.WriteError(w, http.StatusUnauthorized, "Me - user not found - you need to create an account")
		return
	}

	util.WriteJSON(w, http.StatusOK, user)
}
