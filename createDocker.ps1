docker build -t training-app .
docker run -dp 3000:3000 -v training-db:/etc/training training-app