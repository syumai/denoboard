SHELL=/bin/bash
TARGET_SRC=$(shell shopt -s globstar && ls ./**/*.ts)

lint:
	deno fmt --check $(TARGET_SRC)

fmt:
	deno fmt $(TARGET_SRC)

deploy:
	heroku container:push -a denoboard web --recursive
	heroku container:release -a denoboard web

.PHONY: lint fmt deploy