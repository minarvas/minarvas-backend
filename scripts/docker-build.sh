#!/bin/bash

# 1. package.json 에서 버전 추출
version=$(jq -r '.version' package.json)

# 2. 이미지 빌드
docker build -t minarvas:$version .

# 3. 동일한 태그의 이미지가 존재하는지 확인하고 삭제
existing_image=$(docker images -q minarvas:$version)
if [ ! -z "$existing_image" ]; then
  docker rmi $existing_image
fi

# 4. Docker Hub 에 이미지 푸시
docker tag minarvas:$version ilkhso/minarvas-owl:$version
docker push ilkhso/minarvas-owl:$version