#!/bin/bash

cert() {
  openssl req -nodes -new -x509 -keyout server.key -out server.cert	
}

bookmarklet() {
  cat - | sed -e 's/^ *//g' | tr -d "\n" | awk '{printf("javascript:%s", $0)}'
}