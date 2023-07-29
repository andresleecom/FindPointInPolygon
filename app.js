const express = require('express');
const app = express();
app.use(express.json());

class Polygon {
  constructor(polygon, pointOnEdge = true) {
    this.pointOnVertex = pointOnEdge;
    this.intersections = 0;
    this.vertices = polygon.map(this.formatPoint);
    this.verticesCount = this.vertices.length;
  }

  formatPoint(point) {
    return {
      x: parseFloat(point[0]),
      y: parseFloat(point[1])
    };
  }

  pointOnVertex(point) {
    return this.vertices.some(vertex => vertex.x === point.x && vertex.y === point.y);
  }

  isPointInPolygon(point) {
    this.intersections = 0;
    point = this.formatPoint(point);

    if (this.pointOnVertex === true && this.pointOnVertex(point) === true) {
      return true;
    }

    for (let i = 1; i < this.verticesCount; i++) {
      const vertex1 = this.vertices[i - 1];
      const vertex2 = this.vertices[i];

      if (vertex1.y === vertex2.y && vertex1.y === point.y && 
          point.x > Math.min(vertex1.x, vertex2.x) && point.x < Math.max(vertex1.x, vertex2.x)) {
        return this.pointOnVertex === true ? true : false;
      }
      if (point.y > Math.min(vertex1.y, vertex2.y) &&
          point.y <= Math.max(vertex1.y, vertex2.y) &&
          point.x <= Math.max(vertex1.x, vertex2.x) &&
          vertex1.y != vertex2.y) {
        const xinters = (point.y - vertex1.y) * (vertex2.x - vertex1.x) / 
                        (vertex2.y - vertex1.y) + vertex1.x;
        if (xinters == point.x) {
          return this.pointOnVertex === true ? true : false;
        }
        if (vertex1.x === vertex2.x || point.x <= xinters) {
          this.intersections++;
        }
      }
    }
    return this.intersections % 2 !== 0;
  }
}

app.post('/polygon', (req, res) => {
  const polygon = new Polygon(req.body.polygon, req.body.pointOnEdge);
  res.json(polygon);
});

app.post('/polygon/:id/point', async (req, res) => {
  const polygon = new Polygon(req.body.polygon, req.body.pointOnEdge);
  const isInPolygon = polygon.isPointInPolygon(req.body.point);
  res.json({ isInPolygon });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
