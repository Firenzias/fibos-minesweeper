# Fibo's Minesweeper
Fibonacci's variant of minesweeper

This is a small project quest by one of IT company from Brno. This project is meant to demonstrate my skills regarding algoritmization and stuff.

**Technical Assessment**

_Create a grid of 50x50. When you click on a cell, all values in the cells in the same row and column are increased  by 1. If a cell is empty, it will get a value of 1. After each change a cell will briefly turn yellow. If 5 consecutive numbers in the Fibonacci sequence are next to each other, these cells will briefly turn green and will be cleared. Use the programming language of your choice._

## How to run it using podman
(If you use docker instead of podman, easily change the application from the command)

### `podman run -p 3000:3000 firenzias/fibos-minesweeper:latest`
Downloads the latest version of the app from Docker image repository and runs it on port 3000. Then you can head to:

`http://localhost:3000`


## How to run it using npm without building

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## How to build and deploy the code to Docker container registry

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

`podman build -t firenzias/fibos-minesweeper:latest .`

`podman push firenzias/fibos-minesweeper:latest`

## Additional thanks:
Thanks icon8 for nice φ favicon: https://icons8.com/icon/beEJQx3HelBF/phi

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
