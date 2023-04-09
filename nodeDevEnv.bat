docker run ^
  -it ^
  --rm ^
  -p 4200:4200 ^
  --volume %cd%:/usr/src/app ^
  --workdir /usr/src/app ^
  node:18 /bin/bash