docker stop vhs-base-project-web-cms
docker rm vhs-base-project-web-cms
docker run --name vhs-base-project-web-cms -p 3003:3003 vhs-base-project-web-cms 
