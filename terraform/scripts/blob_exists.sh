#!/bin/bash
EXISTS=$(az storage blob exists --account-key $1 --account-name $2 --container-name $3 --name $4 --query exists)

if [ "$EXISTS" = "true" ]; then
  echo "{\"status\": \"ok\"}"
else
  echo Package $4 doesn\'t exist on $2/$3  > /dev/stderr
  exit 1
fi
