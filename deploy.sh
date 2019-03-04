# docker tag local-image:tagname reponame:tagname
# docker push reponame:tagname
cat ../docker_password.txt | docker login -u raimojohanson --password-stdin
docker build -t vet-api .
docker tag vet-api raimojohanson/vet-api
docker push raimojohanson/vet-api