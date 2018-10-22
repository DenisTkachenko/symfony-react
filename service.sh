#!/bin/bash

action=$1

print_help() {
  printf '\nUsage:'
  printf '\nstart - Start docker services'
  printf '\nstop - Stop docker services\n\n'
}

service_start() {
mkdir logs
docker-compose -f conf.d/docker-compose.local.yml up -d
}

service_stop() {
docker-compose -f conf.d/docker-compose.local.yml stop
}

# Print help
if [ "$action" = "" -o "$action" == "--help" ]
then
  print_help
  exit
fi

# Service
if [ "$action" = "start" ]
   then
      if [ ! -d "logs" ]; then
         mkdir logs
      fi
      service_start
    exit
elif [ "$action" = "stop" ]
   then
      service_stop
    exit
else
  print_help
  exit
fi
