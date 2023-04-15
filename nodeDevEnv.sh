#!/usr/bin/env bash

docker run /
  -it /
  --rm /
  --name sd-image-catalog /
  -p 4200:4200 /
  -p 3000:3000 /
  --volume .:/usr/src/app /
  --workdir /usr/src/app /
  node:18 /bin/bash