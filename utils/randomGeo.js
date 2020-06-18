module.exports = function randomGeo(center, radius) {
  var y0 = parseFloat(center.latitude);
  var x0 = parseFloat(center.longitude);
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  return (center = { ...center, latitude: y + y0, longitude: x + x0 });
};
