/////////////////////

var Animator=function(){var d=function(b){var a,d;a={interval:16,painters:[],sanity:null};for(d in a)this[d]=b[d]||a[d];this.main()},a=window.requestAnimationFrame||setTimeout;d.prototype.main=function(){var b=this;!1===this.interval||this.sanity&&!this.sanity()||(setTimeout(function(){b.main()},this.interval),this.move(),a(function(){b.draw()},this.interval))};d.prototype.move=function(){var b,a;for(b=0;b<this.painters.length;b++)a=this.painters[b],a.move&&a.move(this.interval)};d.prototype.draw=
function(){var a,c;for(a=0;a<this.painters.length;a++)c=this.painters[a],c.draw&&c.draw(this.interval)};return d}(),Painters={};
Painters.bubble=function(){var d=0,a=function(a){this.p=[0,0];this.v=[0,0];this.a=[0,0];this.e=Snap(a).circle(0,0,0);this.id=d++};a.prototype.init=function(a,c,d){this.e.stop();this.e.animate({r:this.radius},d);delete c[this.id];a[this.id]=this};a.prototype.term=function(a,c,d){this.e.stop();this.e.attr({r:0},d);delete a[this.id];c[this.id]=this};a.prototype.move=function(a){this.v[0]+=a*this.a[0];this.v[1]+=a*this.a[1];this.p[0]+=a*this.v[0];this.p[1]+=a*this.v[1];this.time-=a};a.prototype.draw=
function(){this.e.attr({cx:this.p[0],cy:this.p[1]})};return a}();
Painters.fizz=function(){var d=function(a){var b,c;b={selector:"",spawnRate:1,spawnArea:[[0,0],[1,1]],spawnTime:100,boundArea:[[0,0],[1,1]],boundTime:100,minRadius:0,maxRadius:1,v:[0,0],a:[0,0],_attached:{},_detached:{}};for(c in b)this[c]=a[c]||b[c]};d.prototype.bubble=function(){var a,b;for(a in this._detached){b=this._detached[a];break}b||(a=Painters.bubble,b=new a(this.selector));return b};d.prototype.init=function(){var a,b;Math.random()<this.spawnRate&&(a=this.bubble(),b=Math.random(),a.p[0]=
this.spawnArea[0][0]*b+this.spawnArea[1][0]*(1-b),b=Math.random(),a.p[1]=this.spawnArea[0][1]*b+this.spawnArea[1][1]*(1-b),b=Math.random(),a.radius=this.minRadius*b+this.maxRadius*(1-b),a.v[0]=this.v[0],a.v[1]=this.v[1],a.a[0]=this.a[0],a.a[1]=this.a[1],a.time=this.boundTime,a.init(this._attached,this._detached,this.spawnTime))};d.prototype.term=function(a){a.p[0]<this.boundArea[0][0]||a.p[0]>this.boundArea[1][0]||a.p[1]<this.boundArea[0][1]||a.p[1]>this.boundArea[1][1]?a.term(this._attached,this._detached):
0>a.time&&a.term(this._attached,this._detached)};d.prototype.move=function(a){var b,c;for(b=0;b<a;b++)this.init();for(c in this._attached)b=this._attached[c],b.move(a),this.term(b)};d.prototype.draw=function(a){var b,c;for(b in this._attached)c=this._attached[b],c.draw(a),this.term(c)};return d}();
Painters.wave=function(){var d=function(a){var b,c;b={pathLength:1,waveHeight:1,waveLength:1,waveOffset:0,velocity:0};for(c in b)this[c]=a[c]||b[c]};d.prototype.move=function(a){this.waveOffset+=this.velocity*a};d.prototype.draw=function(){var a,b,c,d,g,k,l,f=this.waveLength,e=2*f,h=this.waveHeight*(Math.floor(this.waveOffset/e)%2?-1:1),m=-1*h;c=this.waveOffset%e;a=c/e;d="q"+f*a+","+h*a+" "+e*a+",0";c=this.pathLength-c;b=Math.floor(c/e);k="q"+f+","+m+" "+e+",0";l="q"+f+","+h+" "+e+",0";g="";for(a=
0;a<b;a++)g+=a%2?l:k;a=c%e/e;this.path=d+g+("q"+f*a+","+(b%2?h:m)*a+" "+e*a+",0")};return d}();



 var blocks = [{
   "X": 0,
   "Y": -4.5,
   "Z": -4.5,
   "rX": 0,
   "rY": 180,
   "rZ": 0
 }, {
   "X": 0,
   "Y": -4.5,
   "Z": -1.5,
   "rX": 0,
   "rY": 540,
   "rZ": 0
 }, {
   "X": 0,
   "Y": -4.5,
   "Z": 1.5,
   "rX": 0,
   "rY": 180,
   "rZ": 0
 }, {
   "X": 0,
   "Y": -4.5,
   "Z": 4.5,
   "rX": 0,
   "rY": 0,
   "rZ": 0
 }, {
   "X": 4.5,
   "Y": -1.5,
   "Z": 0,
   "rX": 0,
   "rY": 90,
   "rZ": 0
 }, {
   "X": 1.5,
   "Y": -1.5,
   "Z": 0,
   "rX": 0,
   "rY": 90,
   "rZ": -180
 }, {
   "X": -1.5,
   "Y": -1.5,
   "Z": 0,
   "rX": 0,
   "rY": 90,
   "rZ": -180
 }, {
   "X": -4.5,
   "Y": -1.5,
   "Z": 0,
   "rX": 810,
   "rY": 0,
   "rZ": -450
 }, {
   "X": 0,
   "Y": 1.5,
   "Z": 4.5,
   "rX": 0,
   "rY": 0,
   "rZ": 0
 }, {
   "X": 0,
   "Y": 1.5,
   "Z": 1.5,
   "rX": 0,
   "rY": 0,
   "rZ": 0
 }, {
   "X": 0,
   "Y": 1.5,
   "Z": -1.5,
   "rX": 0,
   "rY": 0,
   "rZ": 0
 }, {
   "X": 0,
   "Y": 1.5,
   "Z": -4.5,
   "rX": 0,
   "rY": 0,
   "rZ": 0
 }, {
   "X": -4.5,
   "Y": 4.5,
   "Z": 0,
   "rX": 0,
   "rY": 90,
   "rZ": 0
 }, {
   "X": -1.5,
   "Y": 4.5,
   "Z": 0,
   "rX": 0,
   "rY": 90,
   "rZ": 0
 }, {
   "X": 1.5,
   "Y": 4.5,
   "Z": 0,
   "rX": 0,
   "rY": 90,
   "rZ": 0
 }, {
   "X": 4.5,
   "Y": 4.5,
   "Z": 0,
   "rX": 0,
   "rY": 90,
   "rZ": 0
 }];


 var delay = 1, maxDelay = 10;

 $('.shape').each(function(index) {
   if (delay != maxDelay) {
     delay += maxDelay / 4;
   } else {
     delay = 1;
   }
   asym = delay / maxDelay;
   var startX = blocks[index].X;
   var startY = blocks[index].Y;
   var startZ = blocks[index].Z;
   var startRX = blocks[index].rX;
   var startRY = blocks[index].rY;
   var startRZ = blocks[index].rZ;
   var endX, endY, endZ, asym;
   if (index < 4 || (index >= 8 && index <= 11)) {
     startX = startX - asym;
     endX = startX + 2 * asym;
     endY = startY + 0;
     endZ = startZ + 0;
   } else {
     startZ = startZ - asym;
     endX = startX + 0;
     endY = startY + 0;
     endZ = startZ + 2 * asym;
   }
   $(this).velocity({
     translateX: startX + 'em',
     translateY: startY + 'em',
     translateZ: startZ + 'em',
     rotateX: startRX + 'deg',
     rotateY: startRY + 'deg',
     rotateZ: startRZ + 'deg'
   }, {
     duration: 0,
     loop: false,
     easing: 'ease-in-out'
   }).velocity({
     translateX: endX + 'em',
     translateY: endY + 'em',
     translateZ: endZ + 'em'
   }, {
     delay: 0,
     duration: 1400,
     loop: true,
     easing: 'ease-in-out'
   });
 });


/* mouse movement */

 var steps = 100;
 $(document).mousemove(function(event) {
   var percentWidth = event.pageX / $(document).width();
   var percentHeight = event.pageY / $(document).height();
   var moveX = ((percentHeight - 0.5) * steps) - 26;
   var moveY = ((percentWidth - 0.5) * steps) + 36;
   $('.scene').css("transform", "rotateX(" + moveX + "deg) rotateY(" + moveY + "deg)");
 });


//////////////////////////////////

window.addEventListener("load", windowLoadHandler, false);
var sphereRad = 70;
var radius_sp=1;
//for debug messages
var Debugger = function() { };
Debugger.log = function(message) {
	try {
		console.log(message);
	}
	catch (exception) {
		return;
	}
}

function windowLoadHandler() {
	canvasApp();
}

function canvasSupport() {
	return Modernizr.canvas;
}

function canvasApp() {
	if (!canvasSupport()) {
		return;
	}
	
	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");
	
	var displayWidth;
	var displayHeight;
	var timer;
	var wait;
	var count;
	var numToAddEachFrame;
	var particleList;
	var recycleBin;
	var particleAlpha;
	var r,g,b;
	var fLen;
	var m;
	var projCenterX;
	var projCenterY;
	var zMax;
	var turnAngle;
	var turnSpeed;
	var sphereCenterX, sphereCenterY, sphereCenterZ;
	var particleRad;
	var zeroAlphaDepth;
	var randAccelX, randAccelY, randAccelZ;
	var gravity;
	var rgbString;
	//we are defining a lot of variables used in the screen update functions globally so that they don't have to be redefined every frame.
	var p;
	var outsideTest;
	var nextParticle;
	var sinAngle;
	var cosAngle;
	var rotX, rotZ;
	var depthAlphaFactor;
	var i;
	var theta, phi;
	var x0, y0, z0;
		
	init();
	
	function init() {
		wait = 1;
		count = wait - 1;
		numToAddEachFrame = 8;
		
		//particle color
		r = 70;
		g = 255;
		b = 140;
		
		rgbString = "rgba("+r+","+g+","+b+","; //partial string for color which will be completed by appending alpha value.
		particleAlpha = 1; //maximum alpha
		
		displayWidth = theCanvas.width;
		displayHeight = theCanvas.height;
		
		fLen = 320; //represents the distance from the viewer to z=0 depth.
		
		//projection center coordinates sets location of origin
		projCenterX = displayWidth/2;
		projCenterY = displayHeight/2;
		
		//we will not draw coordinates if they have too large of a z-coordinate (which means they are very close to the observer).
		zMax = fLen-2;
		
		particleList = {};
		recycleBin = {};
		
		//random acceleration factors - causes some random motion
		randAccelX = 0.1;
		randAccelY = 0.1;
		randAccelZ = 0.1;
		
		gravity = -0; //try changing to a positive number (not too large, for example 0.3), or negative for floating upwards.
		
		particleRad = 1;
		
		sphereCenterX = 0;
		sphereCenterY = 0;
		sphereCenterZ = -3 - sphereRad;
		
		//alpha values will lessen as particles move further back, causing depth-based darkening:
		zeroAlphaDepth = -750; 
		
		turnSpeed = 2*Math.PI/1200; //the sphere will rotate at this speed (one complete rotation every 1600 frames).
		turnAngle = 0; //initial angle
		
		timer = setInterval(onTimer, 10/24);
	}
	
	function onTimer() {
		//if enough time has elapsed, we will add new particles.		
		count++;
			if (count >= wait) {
						
			count = 0;
			for (i = 0; i < numToAddEachFrame; i++) {
				theta = Math.random()*2*Math.PI;
				phi = Math.acos(Math.random()*2-1);
				x0 = sphereRad*Math.sin(phi)*Math.cos(theta);
				y0 = sphereRad*Math.sin(phi)*Math.sin(theta);
				z0 = sphereRad*Math.cos(phi);
				
				//We use the addParticle function to add a new particle. The parameters set the position and velocity components.
				//Note that the velocity parameters will cause the particle to initially fly outwards away from the sphere center (after
				//it becomes unstuck).
				var p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002*x0, 0.002*y0, 0.002*z0);
				
				//we set some "envelope" parameters which will control the evolving alpha of the particles.
				p.attack = 50;
				p.hold = 50;
				p.decay = 100;
				p.initValue = 0;
				p.holdValue = particleAlpha;
				p.lastValue = 0;
				
				//the particle will be stuck in one place until this time has elapsed:
				p.stuckTime = 90 + Math.random()*20;
				
				p.accelX = 0;
				p.accelY = gravity;
				p.accelZ = 0;
			}
		}
		
		//update viewing angle
		turnAngle = (turnAngle + turnSpeed) % (2*Math.PI);
		sinAngle = Math.sin(turnAngle);
		cosAngle = Math.cos(turnAngle);

		//background fill
		context.fillStyle = "#000000";
		context.fillRect(2,0,displayWidth,displayHeight);
		
		//update and draw particles
		p = particleList.first;
		while (p != null) {
			//before list is altered record next particle
			nextParticle = p.next;
			
			//update age
			p.age++;
			
			//if the particle is past its "stuck" time, it will begin to move.
			if (p.age > p.stuckTime) {	
				p.velX += p.accelX + randAccelX*(Math.random()*2 - 1);
				p.velY += p.accelY + randAccelY*(Math.random()*2 - 1);
				p.velZ += p.accelZ + randAccelZ*(Math.random()*2 - 1);
				
				p.x += p.velX;
				p.y += p.velY;
				p.z += p.velZ;
			}
			
			/*
			We are doing two things here to calculate display coordinates.
			The whole display is being rotated around a vertical axis, so we first calculate rotated coordinates for
			x and z (but the y coordinate will not change).
			Then, we take the new coordinates (rotX, y, rotZ), and project these onto the 2D view plane.
			*/
			rotX =  cosAngle*p.x + sinAngle*(p.z - sphereCenterZ);
			rotZ =  -sinAngle*p.x + cosAngle*(p.z - sphereCenterZ) + sphereCenterZ;
			m =radius_sp* fLen/(fLen - rotZ);
			p.projX = rotX*m + projCenterX;
			p.projY = p.y*m + projCenterY;
				
			//update alpha according to envelope parameters.
			if (p.age < p.attack+p.hold+p.decay) {
				if (p.age < p.attack) {
					p.alpha = (p.holdValue - p.initValue)/p.attack*p.age + p.initValue;
				}
				else if (p.age < p.attack+p.hold) {
					p.alpha = p.holdValue;
				}
				else if (p.age < p.attack+p.hold+p.decay) {
					p.alpha = (p.lastValue - p.holdValue)/p.decay*(p.age-p.attack-p.hold) + p.holdValue;
				}
			}
			else {
				p.dead = true;
			}
			
			//see if the particle is still within the viewable range.
			if ((p.projX > displayWidth)||(p.projX<0)||(p.projY<0)||(p.projY>displayHeight)||(rotZ>zMax)) {
				outsideTest = true;
			}
			else {
				outsideTest = false;
			}
			
			if (outsideTest||p.dead) {
				recycle(p);
			}
			
			else {
				//depth-dependent darkening
				depthAlphaFactor = (1-rotZ/zeroAlphaDepth);
				depthAlphaFactor = (depthAlphaFactor > 1) ? 1 : ((depthAlphaFactor<0) ? 0 : depthAlphaFactor);
				context.fillStyle = rgbString + depthAlphaFactor*p.alpha + ")";
				
				//draw
				context.beginPath();
				context.arc(p.projX, p.projY, m*particleRad, 0, 2*Math.PI, false);
				context.closePath();
				context.fill();
			}
			
			p = nextParticle;
		}
	}
		
	function addParticle(x0,y0,z0,vx0,vy0,vz0) {
		var newParticle;
		var color;
		
		//check recycle bin for available drop:
		if (recycleBin.first != null) {
			newParticle = recycleBin.first;
			//remove from bin
			if (newParticle.next != null) {
				recycleBin.first = newParticle.next;
				newParticle.next.prev = null;
			}
			else {
				recycleBin.first = null;
			}
		}
		//if the recycle bin is empty, create a new particle (a new ampty object):
		else {
			newParticle = {};
		}
		
		//add to beginning of particle list
		if (particleList.first == null) {
			particleList.first = newParticle;
			newParticle.prev = null;
			newParticle.next = null;
		}
		else {
			newParticle.next = particleList.first;
			particleList.first.prev = newParticle;
			particleList.first = newParticle;
			newParticle.prev = null;
		}
		
		//initialize
		newParticle.x = x0;
		newParticle.y = y0;
		newParticle.z = z0;
		newParticle.velX = vx0;
		newParticle.velY = vy0;
		newParticle.velZ = vz0;
		newParticle.age = 0;
		newParticle.dead = false;
		if (Math.random() < 0.5) {
			newParticle.right = true;
		}
		else {
			newParticle.right = false;
		}
		return newParticle;		
	}
	
	function recycle(p) {
		//remove from particleList
		if (particleList.first == p) {
			if (p.next != null) {
				p.next.prev = null;
				particleList.first = p.next;
			}
			else {
				particleList.first = null;
			}
		}
		else {
			if (p.next == null) {
				p.prev.next = null;
			}
			else {
				p.prev.next = p.next;
				p.next.prev = p.prev;
			}
		}
		//add to recycle bin
		if (recycleBin.first == null) {
			recycleBin.first = p;
			p.prev = null;
			p.next = null;
		}
		else {
			p.next = recycleBin.first;
			recycleBin.first.prev = p;
			recycleBin.first = p;
			p.prev = null;
		}
	}	
}


///////////////////////////////

///////////////////////////////

console.clear();

const defaults = {
	numberGeneratorOptions: {
		dataPoints: 150, // Number of data points to generate
		interval: 100, // Number of ms between each data point
		initialValue: 1, // Initial data value
		volatility: 0.1, // Maximum percent change that can occur
	},
	ticker: {
		enable: true, // Enable or disable ticker
	},
	margins: {
		x: 5,
		y: 10,
	},
	blur: { // SVG blur filter options
		offset: {
			x: 0,
			y: 0,
		},
		amount: 2,
		opacity: 0.05,
		radius: 10,
	},
	transition: { // D3 transition options
		easing: d3.easeLinear, // https://github.com/d3/d3-ease
	},
};

// Exchange Rate Line Chart class
// @param {string} [el] ID selector for chart
// @param {arr} [data] Sample data
class ExchangeChart {
	constructor(
		selector = '',
		data = []
	) {
		Object.assign(this, defaults);

		this.selector = selector;
		this.el = document.getElementById(this.selector.replace('#', ''));
		this.data = data;
		this.resizeTimer;

		if (
			!this.selector.length ||
			!this.data.length ||
			!this.el
		) {
			if (!this.selector.length) {
				console.log('Error: No target element specified');
			}

			if (!this.el) {
				console.log('Error: Target element not found');
			}

			if (!this.data.length) {
				console.log('Error: No data provided');
			}

			return;
		}

		this.ranges = {};

		this.buildChart();
	}

	buildChart() {
		this.setEvents();
		this.setChartDimensions();
		this.setRanges();
		this.defineLine();
		this.initialiseChart();
		this.renderData(this.data);

		if (this.ticker.enable) {
			this.startTicker();
		}
	}

	setEvents() {
		window.addEventListener('resize', (e) => {
			e.preventDefault();
			
			clearTimeout(this.resizeTimer);

			this.resizeTimer = setTimeout(() => {
				clearInterval(this.tickerInterval);
				clearTimeout(this.tickerTimeout);

				this.setChartDimensions();

				if (this.ticker.enable) {
					this.startTicker();
				}
			}, 200);
		});
		
		this.button = document.getElementById('generate');

		this.button.addEventListener('click', (e) => {
			e.preventDefault();

			clearInterval(this.tickerInterval);
			clearTimeout(this.tickerTimeout);

			this.renderData(ExchangeChart.generateSampleData(defaults.numberGeneratorOptions));

			if (this.ticker.enable) {
				this.startTicker();
			}

			return false;
		});
	}
	
	setChartDimensions() {
		this.dimensions = {
			width: this.el.clientWidth,
			height: this.el.clientHeight,
		};
		
		if (this.svg) {
			this.svg
				.attr('width', this.dimensions.width)
				.attr('height', this.dimensions.height);
			
			this.wrapper
				.attr('width', this.dimensions.width)
				.attr('height', this.dimensions.height);
		}
	}

	// Set ranges based on SVG canvas dimensions
	setRanges() {
		this.ranges.x = d3.scaleTime()
			.range([0, this.dimensions.width - this.margins.x]);

		this.ranges.y = d3.scaleLinear()
			.range([this.dimensions.height - (2 * this.margins.y), 0]);
	}

	// Define line function
	defineLine() {
		this.line = d3.line()
			.curve(d3.curveBasis)
			.x((data) => {
				return this.ranges.x(data.date);
			})
			.y((data) => {
				return this.ranges.y(data.value);
			});
	}

	// Set up SVG canvas
	initialiseChart() {
		this.svg = d3.select(this.selector)
			.append('svg')
				.attr('width', this.dimensions.width)
				.attr('height', this.dimensions.height);

		this.wrapper = this.svg
			.append('g')
				.attr('width', this.dimensions.width - this.margins.x)
				.attr('height', this.dimensions.height - (2 * this.margins.y))
				.attr('class', 'wrapper')
				.attr('transform', `translate(0, ${this.margins.y})`);

		// this.buildFilter();
		this.buildGuide();
		this.buildLine();
		this.buildEndCircle();
	}

	buildGuide() {
		// Create inspector guide
		this.wrapper
			.append('line')
				.attr('class', 'guide');
	}

	buildLine() {
		// Create chart line group
		this.wrapper
			.append('g')
				.attr('class', 'data');

		// Create chart line
		this.svg.select('.data')
			.append('path')
				.attr('class', 'line');
	}

	buildEndCircle() {
		// Create circle group
		this.wrapper
			.append('g')
				.attr('class', 'circle');

		// Create inspector circle shadow
		this.svg.select('.circle')
			.append('circle')
				.attr('class', 'circle-shadow')
				.attr('r', `${this.blur.radius}px`);

		// Create inspector circle
		this.svg.select('.circle')
			.append('circle')
				.attr('class', 'circle');
	}

	// Build SVG filters
	buildFilter() {
		this.svg
			.append('defs')
			.append('filter')
				.attr('id', 'shadow')
				.attr('x', '-100%')
				.attr('y', '-100%')
				.attr('width', '300%')
				.attr('height', '300%');

		this.svg.select('#shadow')
			.append('feGaussianBlur')
				.attr('in', 'SourceAlpha')
				.attr('stdDeviation', this.blur.amount);

		this.svg.select('#shadow')
			.append('feOffset')
				.attr('dx', this.blur.offset.x)
				.attr('dy', this.blur.offset.y)
				.attr('result', 'offsetblur');

		this.svg.select('#shadow')
			.append('feComponentTransfer')
			.append('feFuncA')
				.attr('type', 'linear')
				.attr('slope', this.blur.opacity);

		this.svg.select('#shadow')
			.append('feMerge')
			.attr('class', 'merge')
			.append('feMergeNode');

		this.svg.select('.merge')
			.append('feMergeNode')
			.attr('in', 'SourceGraphic');
	}

	// Renders all chart components and populates stats
	// @param {arr} [data] Sample data
	renderData(data) {
		this.data = data;

		// Set domains based on sample data
		this.ranges.x.domain(d3.extent(data, (data) => {
				return data.date;
			})
		);

		this.ranges.y.domain(d3.extent(data, (data) => {
				return data.value;
			})
		);

		this.renderGuide(data);
		this.renderLine(data);
		this.renderCircle(data);
		this.populateStats(data);
	}

	// Renders chart line
	renderLine() {
		this.svg.select('.line')
			.data([this.data])
			.interrupt()
			.transition()
				.duration(this.numberGeneratorOptions.interval * 2.5)
				.attr('d', this.line);
	}

	// Renders circle on latest value
	renderCircle() {
		const x = this.ranges.x(this.data[this.data.length - 1].date);
		const y = this.ranges.y(this.data[this.data.length - 1].value);

		this.point = this.svg.select('.circle')
			.interrupt()
			.transition()
				.duration(this.numberGeneratorOptions.interval * 2.5)
				.attr('transform', `translate(${x}, ${y})`);
	}

	// Renders horizontal guide for latest value
	renderGuide() {
		const y = this.ranges.y(this.data[this.data.length - 1].value);

		this.svg.select('.guide')
			.interrupt()
			.transition()
				.duration(this.numberGeneratorOptions.interval * 2.5)
				.attr('x1', 0)
				.attr('y1', y)
				.attr('x2', this.dimensions.width * 2)
				.attr('y2', y);
	}

	// renderInspector() {
	// 	const posX = d3.mouse()[];
	// }

	// Populates stats based on chart data
	populateStats() {
		const rate = document.getElementsByClassName('rate');
		const currency = rate[0].getAttribute('data-currency');
		const value = {
			current: this.data[this.data.length - 1].value,
			prev: this.data[this.data.length - 2].value,
		}
		const delta = value.current - value.prev;
		let changePercent = ExchangeChart.roundNumber(delta / value.prev * 100, 2);

		rate[0].innerHTML = ExchangeChart.roundNumber(value.current, 3, true);

		rate[0].setAttribute('data-change', `${currency}${ExchangeChart.roundNumber(value.prev, 3, true)} (${changePercent}%)`);

		if (changePercent.match(/0/gi).length === 1) {
			rate[0].removeAttribute('data-performance');
		} else if (delta > 0) {
			rate[0].setAttribute('data-performance', '+');
		} else if (delta < 0) {
			rate[0].setAttribute('data-performance', '-');
		}
	}

	startTicker() {
		this.tickerTimeout = setTimeout(() => {
			this.tickerInterval = setInterval(() => {
				this.tickData(this.data);
			}, this.numberGeneratorOptions.interval);
		}, 1000);
	}

	// Progresses data and updates chart
	tickData() {
		this.data.shift();
		this.data.push({
			date: ExchangeChart.progressDate(this.data, this.numberGeneratorOptions),
			value: ExchangeChart.progressValue(this.data, this.numberGeneratorOptions),
		});

		this.renderData(this.data);
	}

	// Generate a random data set, accounts for volatility which allows for some nice trend simulation
	// @param {obj} [options] Generator options (see defaults)
	// @returns {arr} [data] Sample data
	//
	// data = [
	// 	{
	// 		date: {dateObject},
	// 		value: {float}
	// 	},
	// 	...
	// ]
	static generateSampleData(options) {
		const data = [];
		let n = options.dataPoints;

		// Set first data point
		data.push({
			date: new Date(Date.now()),
			value: options.initialValue,
		});

		n--;

		// Loop and create remaining data points
		while (n > 0) {
			data.push({
				date: ExchangeChart.progressDate(data, options),
				value: ExchangeChart.progressValue(data, options),
			});

			n--;
		}

		return data;
	}

	// Calculates next date in data set
	// @param {arr} [data] Sample data
	// @param {obj} [options] Generator options
	// @returns {obj} Next date
	static progressDate(data, options) {
		return new Date(new Date(data[data.length - 1].date.getTime() + options.interval));
	}

	// Calculates next value in data set
	// @param {arr} [data] Sample data
	// @param {obj} [options] Generator options
	// @returns {float} Next value
	static progressValue(data, options) {
		const total = options.dataPoints;
		const volatility = options.volatility / 100;

		const random = ExchangeChart.getRandomNumber(0, 1, 3);
		let percentChange = 2 * volatility * random;

		if (percentChange > volatility) {
			percentChange -= 2 * volatility;
		}

		const changeValue = data[data.length - 1].value * percentChange;
		return data[data.length - 1].value + changeValue;
	}

	// Generates a random number
	// @param {int} [min] Minimum number
	// @param {int} [max] Maximum number
	// @param {int} [decimalPlaces] Number of decimal places
	// @returns {float} Random float
	static getRandomNumber(min, max, decimalPlaces) {
		return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
	}

	// Rounds a number to specified decimal places
	// @param {float} [n] Number to be rounded
	// @param {int} [decimalPlaces] Number of decimal places
	// @param {bool} [pad] Pad output string with trailing zeroes if required
	// @returns {string} Rounded number string
	static roundNumber(n, decimalPlaces, pad) {
		let rounded = (Math.round(n * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)).toString();

		if (pad) {
			let integerLength = rounded.indexOf('.') > -1 ? rounded.indexOf('.') : rounded.length;

			if (rounded.indexOf('-') > -1) {
				integerLength--;
			}

			if (rounded.indexOf('.') === -1) {
				rounded = `${rounded}.`;
			}

			const targetLength = decimalPlaces + integerLength + 1;

			if (rounded.length < targetLength) {
				for (let i = rounded.length; i < targetLength; i++) {
					rounded = `${rounded}0`;
				}
			}
		}

		return rounded;
	}

	static loadJSON(url, success, error) {
		const xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					if (success) {
						success(JSON.parse(xhr.responseText));
					} else {
						if (error) {
							error(xhr);
						}
					}
				} else {
					error(xhr.status);
				}
			}
		};

		xhr.open('GET', url, true);
		xhr.send();
	}
}

const exchangeChart = new ExchangeChart('#chart', ExchangeChart.generateSampleData(defaults.numberGeneratorOptions));

//////////////////////////////////////////

//////////////BOTTLE///////
/* jshint newcap: false */

/* globals Animator, Painters, Snap, dat */

(function () {

	'use strict';

	// animation loop
	var animator = new Animator({});

	// svg sizes
	var size = 160,
		mask = 320;

	/**
	 * fluid wave
	 */
	var wave = new Painters.wave({
		pathLength: mask,
		waveLength: size / 2
	});
	// dynamic values
	wave.scaledWaveHeight = size / 8;
	wave.scaledVelocity = size / 300;
	// add to animation loop
	animator.painters.push(wave);
	// datgui name
	wave.datName = 'Fluid Wave';

	/**
	 * fluid fizz
	 */
	var fizz1 = new Painters.fizz({
		selector: '#flask #bubbles',
		spawnArea: [[-size * 3 / 8, 0], [size * 3 / 8, 0]],
		spawnTime: 100,
		boundArea: [[-size / 2, -size / 2], [size / 2, size / 2]],
		minRadius: size / 100,
		a: [0, -size / 600000]
	});
	// dynamic values
	fizz1.scaledSpawnRate = 0.12;
	fizz1.scaledBoundTime = 600;
	fizz1.scaledMaxRadius = size / 20;
	// add to animation loop
	animator.painters.push(fizz1);
	// datgui name
	fizz1.datName = 'Fluid Fizz';

	/**
	 * mask fizz
	 */
	var fizz2 = new Painters.fizz({
		selector: '#mask #bubbles',
		spawnArea: [[-size * 3 / 8, 0], [size * 3 / 8, 0]],
		spawnTime: 400,
		boundArea: [[-size / 2, -size / 2], [size / 2, size / 2]],
		minRadius: size / 100,
		a: [0, -size / 600000]
	});
	// dynamic values
	fizz2.scaledSpawnRate = 0.03;
	fizz2.scaledBoundTime = 1600;
	fizz2.scaledMaxRadius = size / 10;
	// add to animation loop
	animator.painters.push(fizz2);
	// datgui name
	fizz2.datName = 'Mask Fizz';

	/**
	 * fluid controller
	 */
	var fluid = {
		boil: 0.55,
		fill: 0.5,
		move: function () {
			var k;
			// scale values
			// for boil level
			k = this.boil;
			k = k > 1 ? 1 : k < 0 ? 0 : k;
			// fluid wave
			wave.waveHeight = wave.scaledWaveHeight * k;
			wave.velocity = wave.scaledVelocity * k;
			// fluid fizz
			fizz1.spawnRate = fizz1.scaledSpawnRate * k;
			fizz1.boundTime = fizz1.scaledBoundTime * k;
			fizz1.maxRadius = fizz1.scaledMaxRadius * k;
			// mask fizz
			fizz2.spawnRate = fizz2.scaledSpawnRate * k;
			fizz2.boundTime = fizz2.scaledBoundTime * k;
			fizz2.maxRadius = fizz2.scaledMaxRadius * k;
			// scale values
			// for fill level
			k = (1 - this.fill - 0.5);
			k = k > 0.5 ? 0.5 : k < -0.5 ? -0.5 : k;
			// fluid fizz
			fizz1.spawnArea[0][1] = k * size - wave.waveHeight;
			fizz1.spawnArea[1][1] = k * size + wave.waveHeight;
			// mask fizz
			fizz2.spawnArea[0][1] = size / 2 - wave.waveHeight;
			fizz2.spawnArea[1][1] = size / 2 + wave.waveHeight;
		},
		draw: function () {
			var k = (1 - this.fill - 0.5) * size,
				v = mask / 2;
			Snap('#flask #fluid').attr({
				'd':
				'M' + v + ',' + v +
				' ' + -v + ',' + v +
				' ' + -v + ',' + k +
				' ' + wave.path + 'Z'
			});

		}
	};
	// add to animation loop
	animator.painters.push(fluid);
	// datgui name
	fluid.datName = 'Fluid Controller';

}) ();



/////////////////////


TweenMax.to('#changingcolor-dots .st3', 10, {
    fill: '#f5f5f5',
    repeat: -1,
    ease: Power4.easeInOut,
    yoyo: true
});

///////////////////////////
$(function(){

  if ($(window).width() < 768) {

    if ($('.roadmap-timeline-content').hasClass('js--fadeInLeft')) {
      $('.roadmap-timeline-content').removeClass('js--fadeInLeft').addClass('js--fadeInRight');
    }

    sr.reveal('.js--fadeInRight', {
      origin: 'right',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });

  } else {
    
    sr.reveal('.js--fadeInLeft', {
      origin: 'left',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });

    sr.reveal('.js--fadeInRight', {
      origin: 'right',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });

  }
  
  sr.reveal('.js--fadeInLeft', {
      origin: 'left',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });

    sr.reveal('.js--fadeInRight', {
      origin: 'right',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });


});
