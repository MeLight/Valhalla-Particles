/*
 * Particle class of the Valhalla project particles system.
 */

function Particle(values) {
	for(var prop in values) {
		this[prop] = values[prop];
	}
	this.size = {x: values.start_size.x, y:values.start_size.y};
	this.size_step = {x:(values.end_size.x - values.start_size.x)/values.life, y:(values.end_size.y - values.start_size.y)/values.life};
	this.init_life = this.life;
	this.curr_rgba = {r:values.start_rgba.r,g:values.start_rgba.g,b:values.start_rgba.b,a:values.start_rgba.a},
	this.rgba_step ={r: (values.end_rgba.r - values.start_rgba.r)/values.life,
		g: (values.end_rgba.g - values.start_rgba.g)/values.life,
		b: (values.end_rgba.b - values.start_rgba.b)/values.life,
		a: (values.end_rgba.a - values.start_rgba.a)/values.life};
	if(this.target) {
		//jerkx = 6.0f*(targetx-x - speedx*life - 0.5f*accelx*life*life)/(life*life*life)
		var life2 = values.life*values.life;
		var life3 = life2*values.life;
		this.jerkx = 6.0*(this.targetx - this.posx - this.speedx*values.life - 0.5*this.accelx*life2)/(life3);
		this.jerky = 6.0*(this.targety - this.posy - this.speedy*values.life - 0.5*this.accely*life2)/(life3);
	}
}

Particle.prototype.constructor = Particle;

Particle.prototype = {
	posx : 0,
	posy :0,
	speedx : 1,
	speedy : 1,
	size : {x:5, y:5},
	size_step : {x:0, y:0},
	life : 10,
	init_life : 10,
	curr_rgba : {r:255,g:255,b:255,a:255},
	rgba_step : {r:0,g:0,b:0,a:0},
	targetx : 0,
	targety : 0,
	jerkx : 0,
	jerky : 0,
	target : false
}

Particle.prototype.tick = function () {
	if(this.init_life == this.life) {
		this.life--;
		return;
	}
	if(this.target) {
		this.accelx += this.jerkx;
		this.accely += this.jerky;
	}
	this.speedx += this.accelx;
	this.speedy += this.accely;
	this.posx += this.speedx;
	this.posy += this.speedy;
	this.size.x += this.size_step.x;
	this.size.y += this.size_step.y;
	this.curr_rgba.r += this.rgba_step.r;
	this.curr_rgba.g += this.rgba_step.g;
	this.curr_rgba.b += this.rgba_step.b;
	this.curr_rgba.a += this.rgba_step.a;
	this.life--;
}

Particle.prototype.currRgbaCnvsFormat = function() {
	return Math.round(this.curr_rgba.r) + ", " + Math.round(this.curr_rgba.g) + ", " + Math.round(this.curr_rgba.b) + ", " +(this.curr_rgba.a/255);
}

Particle.prototype.getSize = function () {
	return {x:Math.round(this.size.x), y:Math.round(this.size.y)};
}

Particle.prototype.getPos = function () {
	return {x:Math.round(this.posx), y:Math.round(this.posy)};
}

Particle.prototype.toString = function() {
	return 'x: ' +this.posx + ', y: '+ this.posy +', spx: ' +this.speedx+', spy: '+this.speedy +', szx: ' +this.sizex + ', szy: ' +this.sizey;
}