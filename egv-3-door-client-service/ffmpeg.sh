##Mac
#list devices
ffmpeg -f avfoundation -list_devices true -i ""

#snapshot
ffmpeg -y -f avfoundation -r 30 -i "0" -frames:v 1 ./output/snapshot.jpeg

#record videos
ffmpeg -y -f avfoundation -r 30 -i "0" ./output/videos.mp4

##PI
#list devices
v4l2-ctl --list-devices

#snapshot
sudo ffmpeg -y -r 0.5 -i "/dev/video0" -frames:v 1 ./output/snapshot.jpeg

#record videos
sudo ffmpeg -y -r 30 -re 1 -i "/dev/video4" ./output/videos.mp4