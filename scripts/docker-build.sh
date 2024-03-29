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
echo "Building image with Docker Buildx"
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64/v8 -t ilkhso/minarvas-owl:$version -q --push .

