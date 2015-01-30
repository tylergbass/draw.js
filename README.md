#draw.js

draw.js is a javascript library providing drawing methods for both Canvas and SVG using a unified api. Check out the documentation down below or try it out yourself.

##Compatibility
This library is compatible with the latest versions of Firefox and Chrome, IE 9 or later, and probably Safari and Opera as well.

##Initialization
To use draw.js, you must first initialize the element you want to use. To do so, use the `draw.make()` function, passing it the element and optionally the desired render method, currently either `svg` or `canvas`.
```javascript
element = document.getElementById("draw");
d = draw.make(element, "canvas");
```
The variable `d` is then assigned to the newly created draw object. You do not need to assign the variable, though, as you can also just access the draw object using the element. In the case of this example, `element.draw.rect()` would work just as well as `d.draw.rect()`. Wait, what is this `rect()` function? It draws rectagles, as explained in this next section.

##Drawing Shapes
You can now use the draw functions through the variable you assigned. Using the code from the previous section, you can access the draw functions via `d.draw`. Currently implemented in draw.js are `rect()`, `line()`, `arc()`, and `text()`.

###`rect()`
The `rect()` function, like all other shape-drawing functions, takes parameters in the form of objects. The parameters that `rect()` can take are as follows:
```javascript
d.draw.rect({
	x: 15,   //horizontal position
	y: 10,   //vertical position
	w: 20,   //width
	h: 30,   //height
	r: 0.15, //rotation (in revolutions)
	fill: "lightslategrey",
	stroke: {
		color: "darkslategrey",
		width: 4,
		join: "miter" //bevel, round, or miter
	}
});
```
Note that since these parameters are in the form of an object, they can be in any order. Additionally, note that the rotation is specified in [revolutions](https://en.wikipedia.org/wiki/Turn_%28geometry%29) instead of radians or degrees. This is because I like revolutions. Deal with it.

###`line()`
The `line()` function can be used to create lines, polylines, and polygons. The parameter `points`, used to define the location of points, takes an array.
```javascript
d.draw.line({
	points: [
		{x: 10, y: 10},
		{x: 25, y: 40},
		{x: 40, y: 10}
	],
	fill: "lightslategrey",
	stroke: {
		color: "darkslategrey",
		width: 4,
		join: "miter"
	}
});
```
To get a simple line from this function, just provide only two points. If you want the shape to be closed instead of open as this one is, add a last point that is the same as the first.

###`arc()`
The `arc()` function is used to make circles and arcs. Remember that angles are in revolutions!
```javascript
d.draw.arc({
	x: 25,
	y: 25,
	radius: 15,
	start: 0,
	end: 0.75,
	fill: "lightslategrey",
	stroke: {
		color: "darkslategrey",
		width: 4,
		join: "miter"
	}
});
```
If you want a full circle instead of an arc, make sure that the end is 1 revolution greater than the start. Also, when drawing arcs or circles, make sure that your start value is smaller than your end value.

###`text()`
The `text()` function renders text.
```javascript
d.draw.text({
	x: 10,
	y: 30,
	r: 0,
	fill: "lightslategrey",
	stroke: {
		color: "darkslategrey",
		width: 2,
		join: "miter"
	},
	text: "ptchoooo",
	font: "Courier New",
	size: 16
});
```

###Fills and Strokes
If you want to draw a shape with no fill or no stroke, you may simply omit the entire fill or stroke part, like this:
```javascript
d.draw.rect({
	x: 15,
	y: 10,
	w: 20,
	h: 30,
	fill: "lightslategrey"
});

d.draw.rect({
	x: 50,
	y: 10,
	w: 20,
	h: 30,
	stroke: {
		color: "darkslategrey",
		width: 4,
		join: "miter",
	}
});

d.draw.arc({
	x: 25,
	y: 25,
	radius: 15,
	start: 0,
	end: 0.75,
	stroke: {
		color: "darkslategrey",
		width: 4,
		cap: "round"
	}
});
```
The colors used for fill and stroke values are very much the same as can be used in CSS, including hexadecimal, rgb(), hsl(), and [named colors](http://www.w3.org/TR/css3-color/#svg-color). Transparency can also be achieved using rgba() or hsla().

##Changing the Renderer
Depending on which method renders faster or what needs arise, you may need to change renderers between canvas and SVG. This can be done by two methods. One method will clear the current shapes immediately, whereas the other will allow you to clear the shapes whenever it is convenient, such as when the next frame of an animation is rendered. Either way, the current contents will need to be removed for the new drawing method to go into effect.
```javascript
d.changeRenderer("svg"); //immediately clears the frame and starts using svg
d.renderer = "svg";      //will change to svg next time d.clearFrame() is called
```
Additionally, you can read the `d.renderer` property to get the current renderer.
##Implementing Animation
Here is a simple example of how to implement an animation using draw.js.
```javascript
d = draw.make(document.getElementById("draw")); //initialize the element
i = 0; //initialize a variable so we know what frame we're on
function frame() {  //create the function to make the frame
	d.clearFrame(); //clear previous shapes
	d.draw.rect({
		x: 15,
		y: 15,
		w: 20,
		h: 20,
		r: i / 40, //making the rotation change every frame
		fill: "lightslategrey",
		stroke: {
			color: "darkslategrey",
			width: 4
		} //the default join is miter, so it doesn't need to be specified
	});
	i++; //increase counter
	setTimeout(frame, 100); //render the next frame
};
frame(); //start the first frame
```
