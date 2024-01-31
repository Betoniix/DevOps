#!/bin/bash

pokemon=$1
URL="https://pokeapi.co/api/v2/pokemon/$pokemon"

if [[ ! -n $pokemon ]];
then
	echo "Missing parameter 'pokemon'"
	exit 1
fi

if [[ -z $pokemon ]];
then
	echo "Empty String passed"
	exit 1
fi

status=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [[ $status -eq 404 ]]; 
then
	echo "Pokemon was not found"
	exit 1
fi

content=$(curl -s $URL)

id=$(echo $content | jq '.id')
order=$(echo $content | jq '.order')
height=$(echo $content | jq '.height')
weight=$(echo $content | jq '.weight')

echo "$pokemon (No. $id)"
echo "Id = $order"
echo "Weight = $weight"
echo "Height = $height"
