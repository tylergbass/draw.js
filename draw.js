/*
draw.js
v0.5.0

http://haveaswiss.com/apis/draw.js.php

rect, line, arc, text
*/

var draw = {
	make: function(element, renderer) {
		var d = element;
		d.changeRenderer = function(renderer) {
			d.renderer = renderer;
			while (d.firstChild) { //Gets rid of any of the element's children
				d.removeChild(d.firstChild);
			}
			if (renderer == "canvas") { //Replaces any content of element with the canvas
				canvas = document.createElement("canvas");
				canvas.width = d.scrollWidth;
				canvas.height = d.scrollHeight;
				d.appendChild(canvas);
			}
			if (renderer == "svg") { //Replaces any content of element with SVG container
				svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				svg.style.width = d.scrollWidth + "px";
				svg.style.height = d.scrollHeight + "px";
				d.appendChild(svg);
			}
		};
		renderer ? d.changeRenderer(renderer) : d.changeRenderer("svg"); //Defaults to svg as renderer
		d.clearFrame = function() {
			d.changeRenderer(d.renderer);
		};
		d.draw = {
			rect: function(s) { // takes {x: 0, y: 0, w: 10, h: 10, fill: "orange", stroke: {color: "blue", width: 4, join: "miter"}, r: .15}
				if (d.renderer == "canvas") {
					c = d.firstChild.getContext("2d");
					c.save();
					c.translate(s.x + (s.w/2), s.y + (s.h/2));
					s.r ? c.rotate(s.r * Math.PI * 2) : null;
					s.fill ? (
						c.fillStyle = s.fill,
						c.fillRect(-(s.w/2), -(s.h/2), s.w, s.h)
					) : null;
					s.stroke ? (
						s.stroke.color ? (
							c.strokeStyle = s.stroke.color
						) : (
							c.strokeStyle = "#000"
						),
						s.stroke.width ? (
							c.lineWidth = s.stroke.width
						) : (
							c.lineWidth = 1
						),
						s.stroke.join ? (
							c.lineJoin = s.stroke.join
						) : (
							c.lineJoin = "miter"
						),
						s.stroke.cap ? (
							c.lineCap = s.stroke.cap
						) : (
							c.lineCap = "butt"
						),
						c.strokeRect(-(s.w/2), -(s.h/2), s.w, s.h)
					) : null;
					c.restore();
				} else if (d.renderer = "svg") {
					svg = d.firstChild;
					while (svg === null) {
						d.changeRenderer("svg");
						svg = d.firstChild;
					}
					rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
					rect.setAttribute("x", s.x);
					rect.setAttribute("y", s.y);
					rect.setAttribute("width", s.w);
					rect.setAttribute("height", s.h);
					s.fill ? (
						rect.setAttribute("fill", s.fill)
					) : (
						rect.setAttribute("fill", "transparent")
					);
					s.stroke ? (
						s.stroke.color ? (
							rect.setAttribute("stroke", s.stroke.color)
						) : (
							rect.setAttribute("stroke", "#000")
						),
						s.stroke.width ? (
							rect.setAttribute("stroke-width", s.stroke.width)
						) : (
							rect.setAttribute("stroke-width", "1")
						),
						s.stroke.join ? (
							rect.setAttribute("stroke-linejoin", s.stroke.join)
						) : (
							rect.setAttribute("stroke-linejoin", "miter")
						),
						s.stroke.cap ? (
							polyline.setAttribute("stroke-linecap", s.stroke.cap)
						) : (
							polyline.setAttribute("stroke-linecap", "butt")
						)
					) : null;
					s.r ? (
						rotate = svg.createSVGTransform(),
						rotate.setRotate(s.r * 360, s.x + (s.w / 2), s.y + (s.h / 2)),
						tfmList = rect.transform.baseVal,
						tfmList.appendItem(rotate)
					) : null;
					svg.appendChild(rect);
				}
			},
			line: function(s) { //takes {points: [{x: 0, y: 0}, {x: 10, y: 10}], fill: "orange", stroke: {color: "blue", width: 4, join: "miter"}}
				if (d.renderer == "canvas") {
					c = d.firstChild.getContext("2d");
					s.fill ? (
						c.fillStyle = s.fill
					) : null;
					s.stroke ? (
						s.stroke.color ? (
							c.strokeStyle = s.stroke.color
						) : (
							c.strokeStyle = "#000"
						),
						s.stroke.width ? (
							c.lineWidth = s.stroke.width
						) : (
							c.lineWidth = 1
						),
						s.stroke.join ? (
							c.lineJoin = s.stroke.join
						) : (
							c.lineJoin = "miter"
						),
						s.stroke.cap ? (
							c.lineCap = s.stroke.cap
						) : (
							c.lineCap = "butt"
						)
					) : null;
					c.beginPath();
					for (var i = 0; i < s.points.length; i++) {
						c.lineTo(s.points[i].x, s.points[i].y);
					}
					c.fill();
					c.stroke();
				} else if (d.renderer = "svg") {
					svg = d.firstChild;
					while (svg === null) {
						d.changeRenderer("svg");
						svg = d.firstChild;
					}
					polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
					points = "";
					for (var i = 0; i < s.points.length; i++) {
						points += s.points[i].x + "," + s.points[i].y + " ";
					}
					polyline.setAttribute("points", points);
					s.fill ? (
						polyline.setAttribute("fill", s.fill)
					) : (
						polyline.setAttribute("fill", "transparent")
					);
					s.stroke ? (
						s.stroke.color ? (
							polyline.setAttribute("stroke", s.stroke.color)
						) : (
							polyline.setAttribute("stroke", "#000")
						),
						s.stroke.width ? (
							polyline.setAttribute("stroke-width", s.stroke.width)
						) : (
							polyline.setAttribute("stroke-width", "1")
						),
						s.stroke.join ? (
							polyline.setAttribute("stroke-linejoin", s.stroke.join)
						) : (
							polyline.setAttribute("stroke-linejoin", "miter")
						),
						s.stroke.cap ? (
							polyline.setAttribute("stroke-linecap", s.stroke.cap)
						) : (
							polyline.setAttribute("stroke-linecap", "butt")
						)
					) : null;
					svg.appendChild(polyline);
				}
			},
			arc: function(s) { //takes {x: 0, y: 0, radius: 10, start: 0, end: 0.5, fill: "orange", stroke: {color: "blue", width: 4, join: "miter"}}
				if (d.renderer == "canvas") {
					c = d.firstChild.getContext("2d");
					c.save();
					c.translate(s.x + (s.radius / 2), s.y + (s.radius / 2));
					c.beginPath();
					c.arc(-(s.radius / 2), -(s.radius / 2), s.radius, s.start * Math.PI * 2, s.end * Math.PI * 2);
					c.restore();
					s.fill ? (
						c.fillStyle = s.fill,
						c.fill()
					) : null;
					s.stroke ? (
						s.stroke.color ? (
							c.strokeStyle = s.stroke.color
						) : (
							c.strokeStyle = "#000"
						),
						s.stroke.width ? (
							c.lineWidth = s.stroke.width
						) : (
							c.lineWidth = 1
						),
						s.stroke.join ? (
							c.lineJoin = s.stroke.join
						) : (
							c.lineJoin = "miter"
						),
						s.stroke.cap ? (
							c.lineCap = s.stroke.cap
						) : (
							c.lineCap = "butt"
						),
						c.stroke()
					) : null;
				} else if (d.renderer = "svg") {
					svg = d.firstChild;
					while (svg === null) {
						d.changeRenderer("svg");
						svg = d.firstChild;
					}
					Math.abs(s.start - s.end) == 1 ? (
						s.start > s.end ? s.start -= 0.0001 : s.end -= 0.0001
					) : null;
					startx = s.x + (s.radius * Math.cos(s.start * Math.PI * 2));
					starty = s.y + (s.radius * Math.sin(s.start * Math.PI * 2));
					endx = s.x + (s.radius * Math.cos(s.end * Math.PI * 2));
					endy = s.y + (s.radius * Math.sin(s.end * Math.PI * 2));
					sweep = s.end - s.start <= .5 ? "0" : "1";
					data = "M " + startx + " " + starty + " A " + s.radius + " " + s.radius + " 0 " + sweep + " 1 " + endx + " " + endy;
					arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
					arc.setAttribute("d", data);
					s.fill ? (
						arc.setAttribute("fill", s.fill)
					) : (
						arc.setAttribute("fill", "transparent")
					);
					s.stroke ? (
						s.stroke.color ? (
							arc.setAttribute("stroke", s.stroke.color)
						) : (
							arc.setAttribute("stroke", "#000")
						),
						s.stroke.width ? (
							arc.setAttribute("stroke-width", s.stroke.width)
						) : (
							arc.setAttribute("stroke-width", "1")
						),
						s.stroke.join ? (
							arc.setAttribute("stroke-linejoin", s.stroke.join)
						) : (
							arc.setAttribute("stroke-linejoin", "miter")
						),
						s.stroke.cap ? (
							arc.setAttribute("stroke-linecap", s.stroke.cap)
						) : (
							arc.setAttribute("stroke-linecap", "butt")
						)
					) : null;
					svg.appendChild(arc);
				}
			},
			text: function(s) { //Takes {x: 0, y: 0, r: .15, fill: "steelblue", stroke: {color: "blue", width: 1, join: "miter"}, text: "ptchoooo", font: "Courier New", size: 16}
				s.size = s.size || 10;
				s.font = s.font || "sans-serif";
				if (d.renderer == "canvas") {
					c = d.firstChild.getContext("2d");
					c.save();
					c.translate(s.x, s.y);
					s.r ? c.rotate(s.r * Math.PI * 2) : null;
					c.font = s.size + "px " + s.font;
					s.fill ? (
						c.fillStyle = s.fill,
						c.fillText(s.text, 0, 0)
					) : null;
					s.stroke ? (
						s.stroke.color ? (
							c.strokeStyle = s.stroke.color
						) : (
							c.strokeStyle = "#000"
						),
						s.stroke.width ? (
							c.lineWidth = s.stroke.width
						) : (
							c.lineWidth = 1
						),
						s.stroke.join ? (
							c.lineJoin = s.stroke.join
						) : (
							c.lineJoin = "miter"
						),
						c.strokeText(s.text, 0, 0)
					) : null;
					c.restore();
				} else if (d.renderer = "svg") {
					svg = d.firstChild;
					while (svg === null) {
						d.changeRenderer("svg");
						svg = d.firstChild;
					}
					text = document.createElementNS("http://www.w3.org/2000/svg", "text");
					text.setAttribute("x", s.x);
					text.setAttribute("y", s.y);
					text.setAttribute("font-family", s.font);
					text.setAttribute("font-size", s.size);
					text.textContent = s.text;
					s.fill ? (
						text.setAttribute("fill", s.fill)
					) : (
						text.setAttribute("fill", "transparent")
					);
					s.stroke ? (
						s.stroke.color ? (
							text.setAttribute("stroke", s.stroke.color)
						) : (
							text.setAttribute("stroke", "#000")
						),
						s.stroke.width ? (
							text.setAttribute("stroke-width", s.stroke.width)
						) : (
							text.setAttribute("stroke-width", "1")
						),
						s.stroke.join ? (
							text.setAttribute("stroke-linejoin", s.stroke.join)
						) : (
							text.setAttribute("stroke-linejoin", "miter")
						)
					) : null;
					s.r ? (
						rotate = svg.createSVGTransform(),
						rotate.setRotate(s.r * 360, s.x, s.y),
						tfmList = text.transform.baseVal,
						tfmList.appendItem(rotate)
					) : null;
					svg.appendChild(text);
				}
			}
		};
		return d;
	}
};
