#!/bin/bash/

sudo ngrok service stop
sudo systemctl stop nginx

sudo git pull

sudo ngrok service start
sudo systemctl start nginx