#!/bin/bash

#ffmpeg -f avfoundation -list_devices true -i ""

#ffmpeg -y -f avfoundation -r 30 -i "0" -frames:v 1 ./output/snapshot.jpeg

#ffmpeg -y -f avfoundation -r 30 -i "0" ./output/videos.mp4

#Stream mpeg Buffer
#ffmpeg -y -f avfoundation -r 30 -i "0" -c:v libx264 -c:a aac -strict -2 -f mpeg -

#Stream MP4 Buffer
#ffmpeg -y -f avfoundation -r 30 -i "0" -c:v libx264 -c:a aac -strict -2 -f mp4 -

#Stream UDP
#ffmpeg -y -f avfoundation -r 30 -i "0:0" -c:v libx264 -c:a aac -strict -2 -f mpegts udp://localhost:1234

#Pi Stream mpeg Buffer
#sudo ffmpeg -y -r 30 -i "/dev/video2" -c:v libx264 -c:a aac -strict -2 -f mpeg -

#Cut Video
#ffmpeg -ss 00:00:00.0 -t 00:00:10.0 -i ./output/videos.mp4 ./output/videos2.mp4

# Record
#ffmpeg -y -f avfoundation -r 30 -i "0:0" -c:v libx264 -c:a aac -movflags faststart -vf "scale=1280:-1" ./output/videos.mp4

#ffmpeg -y -f avfoundation -r 30 -i "0" -c:v libx264 -movflags faststart -vf "scale=1280:-1" -strict -2 -f mpeg -
