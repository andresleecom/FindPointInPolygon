# Simple find point in polygon

## Usage
```
$polygonPoints = [[1, 1], [3, 2], [4, 4], [5, 5], [2, 4], [1, 1]];

$polygon = new Polygon($polygonPoints, true);

$polygon->isPointInPolygon([2, 1]); // false
$polygon->isPointInPolygon([2, 2]); //true
$polygon->isPointInPolygon([3, 3.5]); // point on edge. based on constructor attribute
$polygon->isPointInPolygon([4, 5]); // false
$polygon->isPointInPolygon([1.5, 3]); // false
```

![alt text](https://github.com/BabicM/FindPointInPolygon/blob/master/points.png)
