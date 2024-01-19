#!/bin/bash

# 1. package.json 에서 버전 추출
version="latest"

echo "Image version:$version"

# 2. 동일한 태그의 이미지가 존재하는지 확인하고 삭제
existing_image=$(docker images -q minarvas:$version)
if [ ! -z "$existing_image" ]; then
  echo "Removing existing image $existing_image"
  docker rmi $existing_image -f
fi

# 3. 이미지 빌드
docker build --platform linux/arm64/v8 -t minarvas:$version .

# 4. Docker Hub 에 이미지 푸시
echo "Tagging image with Docker Hub"
docker tag minarvas:$version ilkhso/minarvas-owl:$version
echo "Pushing image to Docker Hub"
docker push ilkhso/minarvas-owl:$version
