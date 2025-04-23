start:
	docker compose up 
build:
	docker compose build
stop:
	docker compose down
clean:
	docker compose down --volumes
bash:
	docker compose exec -it app bash