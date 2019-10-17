#!/usr/bin/env bash

#Create the local repo
docker run -d -p 5000:5000 --restart=always --name registry registry:2

#Create the airline container image
cd airline

docker build -t airline .

docker tag airline localhost:5000/airline

docker push localhost:5000/airline

cd ..
#Create the auto container image

cd auto

docker build -t auto .

docker tag auto localhost:5000/auto

docker push localhost:5000/auto

cd ..

#Create the hotel container image
cd hotel

docker build -t hotel .

docker tag hotel localhost:5000/hotel

docker push localhost:5000/hotel

cd ..

#Create the agent container image
cd agent

docker build -t agent .

docker tag agent localhost:5000/agent

docker push localhost:5000/agent

cd ..

#Create the users container image
cd users

docker build -t users .

docker tag users localhost:5000/users

docker push localhost:5000/users

cd ..

#List the images in the registry

curl http://localhost:5000/v2/_catalog
