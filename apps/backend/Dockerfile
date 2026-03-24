# Application build stage
FROM golang:1.26.1-alpine AS app-builder
WORKDIR /app
RUN apk add --no-cache make;
COPY Makefile go.mod go.sum main.go ./
COPY util/ util/
COPY router/ router/
COPY internal/ internal/
RUN make -d deps;
RUN make -d build;

# Application runtime 
FROM gcr.io/distroless/base-debian13
COPY --from=app-builder /app/bin/server .
EXPOSE 8080
CMD ["./server"]
