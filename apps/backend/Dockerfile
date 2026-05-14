# Application build stage
FROM golang:1.26.1-alpine AS app-builder
WORKDIR /app
RUN apk add --no-cache make;
COPY . .
RUN make -d deps;
RUN make -d build;

# Application runtime 
FROM debian:13
RUN apt-get update && apt-get install -y ffmpeg
COPY --from=app-builder /app/bin/server .
COPY --from=app-builder /app/resources/ resources/
EXPOSE 8080
CMD ["./server"]
