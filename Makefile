.PHONY: deploy

deploy:
	heroku container:push -a denoboard web --recursive
	heroku container:release -a denoboard web