function Particle(posx, posy, speedx, speedy, start_size, end_size, life, accelx, accely, start_rgba, end_rgba,
targetx, targety, target) {
	this.posx = posx,
	this.posy = posy,
	this.speedx = speedx,
	this.speedy = speedy,
	this.size = {x:start_size.x, y:start_size.y},
	this.size_step = {x:(end_size.x - start_size.x)/life, y:(end_size.y - start_size.y)/life},
	this.init_life = this.life = life,
	this.accelx = accelx,
	this.accely = accely,
	this.targetx = targetx,
	this.targety = targety,
	this.target = target,
	this.curr_rgba = {r:start_rgba.r,g:start_rgba.g,b:start_rgba.b,a:start_rgba.a},
	this.rgba_step ={r: (end_rgba.r - start_rgba.r)/life,
		g: (end_rgba.g - start_rgba.g)/life,
		b: (end_rgba.b - start_rgba.b)/life,
		a: (end_rgba.a - start_rgba.a)/life};
	if(target) {
		//jerkx = 6.0f*(targetx-x - speedx*life - 0.5f*accelx*life*life)/(life*life*life)
		var life2 = life*life;
		var life3 = life2*life;
		this.jerkx = 6.0*(this.targetx - this.posx - this.speedx*life - 0.5*this.accelx*life2)/(life3);
		this.jerky = 6.0*(this.targety - this.posy - this.speedy*life - 0.5*this.accely*life2)/(life3);
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