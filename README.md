# Simple find point in polygon (Node.js Version)

## Installation

You need to have Node.js and npm installed on your machine. Then you can clone this repository and install the dependencies.

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

## Usage

Start the server using `node app.js`.

```bash
node app.js
```

The server runs on port 3000 by default. This can be changed by setting the environment variable `PORT`.

Then you can make POST requests to the `/polygon` and `/polygon/:id/point` endpoints. Here are some examples using curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "polygon": [[1, 1], [3, 2], [4, 4], [5, 5], [2, 4], [1, 1]],
    "pointOnEdge": true
}' http://localhost:3000/polygon
```

This will create a new Polygon with the provided vertices and the `pointOnEdge` flag.

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "polygon": [[1, 1], [3, 2], [4, 4], [5, 5], [2, 4], [1, 1]],
    "pointOnEdge": true,
    "point": [2, 1]
}' http://localhost:3000/polygon/:id/point
```

This will check if the provided point is in the Polygon. It will return a JSON response with a key `isInPolygon` that is either `true` or `false`.

![alt text](https://github.com/BabicM/FindPointInPolygon/blob/master/points.png)

Please note: replace `<repository-url>` and `<repository-directory>` with the actual URL and directory name of your repository.

In the second curl example, replace `:id` with the id returned by the `/polygon` endpoint if you've added persistence. If not, it doesn't matter what you replace `:id` with because it doesn't affect functionality.
