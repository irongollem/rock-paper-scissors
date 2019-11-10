# rock-paper-scissors
rock-paper-scissors game

# How to
To play the game simply go to https://irongollem.github.io/rock-paper-scissors/ or clone this repository and run the index.html

If you want to run a server hosted version you can build a docker image using the following command from a machine that has docker installed:
```
docker build -t rock-paper-scissors:v1 .
```
Modify above command to reflect your image name.

To run the image simply do:
```
docker run -d -p 80:80 rock-paper-scissors:v1
```
If you modified the first command, then the same image name should be used in this command. Same goes for the port, where if you want the nginx server to run on any port other than port 80 simply change `80:80` into `<YOUR_PORT>:80`

For the tests to run you will need some dependancies. Simply grab them with `yarn` or `npm` by typing:
```bash
yarn install
# or npm install if you prefer npm, although the lock file assumes you use yarn
```

# Sidenote
The constraints of this project did not allow for any external
libraries other than testing. Therefore no server architecture
is required to play the base version of this game. 
