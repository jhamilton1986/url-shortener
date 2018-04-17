run:
	docker-compose up

stop:
	docker-compose down

build:
	cd app && npm i
	cd client && npm i
