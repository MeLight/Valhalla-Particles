function Emitter(ctx) {
	this.ctx = ctx;
	this.particles = new LinkedList();
}

Emitter.prototype = {
	draw : null,
	particles : null,
	posx : 20,
	posy : 20,
	min_speed : 1,
	max_speed : 10,
	start_size : {x:2, y:2},
	end_size :  {x:6, y:6},
	burst_count : 10,
	burst_rate : 21,
	radius : 0,
	min_angle : 0,
	max_angle : 360,
	emitter_rot : 0,
	emitter_angle : 0,
	accelx : 0,
	accely :0,
	life :20,
	shape : 'square',
	point_motion : true,
	curr_tick : 0,
	targetx : 0,
	targety : 0,
	target : false,
	start_rgba : {r:0,g:255,b:255,a:255},
	end_rgba : {r:255,g:0,b:255,a:255}
}

Emitter.prototype.setEmitterValues = function(values) {
	for(var prop in values) {
		this[prop] = values[prop];
	}
}

Emitter.prototype.getEffect = function () {
	return '{' +
	'min_speed : '+this.min_speed+', ' +
	'max_speed : '+this.max_speed+', ' +
	'start_size : {x:'+this.start_size.x+',y:'+this.start_size.y+'}, ' +
	'end_size : {x:'+this.end_size.x+',y:'+this.end_size.y+'}, ' +
	'burst_count : '+this.burst_count+', ' +
	'burst_rate : '+ this.burst_rate+', ' +
	'min_angle : '+this.min_angle+', ' +
	'max_angle : '+this.max_angle+', ' +
	'accelx : '+this.accelx+', ' +
	'accely : '+this.accely+', ' +
	'targetx : '+this.targetx+', ' +
	'targety : '+this.targety+', ' +
	'target : '+this.target+', ' +
	'life : '+this.life+', ' +
	'radius : '+this.radius+', ' +
	'shape : \''+this.shape+'\', ' +
	'point_motion : '+this.point_motion+', ' +
	'emitter_rot : '+this.emitter_rot+', ' +
	'start_rgba : {r:'+this.start_rgba.r+',g:'+this.start_rgba.g+', b:'+this.start_rgba.b+',a:'+this.start_rgba.a+'}, ' +
	'end_rgba : {r:'+this.end_rgba.r+',g:'+this.end_rgba.g+', b:'+this.end_rgba.b+',a:'+this.end_rgba.a+'}' +
	'}';
}

Emitter.prototype.tick = function() {
	if(this.curr_tick == 0) {
		this.burst();
	}
	if(this.emitter_rot != 0) {
		this.emitter_angle += this.emitter_rot;
	}
	var iter = this.particles.head;
	var i = 0;
	
	while(iter != null) {
		iter.data.tick();
		if(iter.data.life == 0) {
			var temp = iter.data;
			iter = iter.next;
			this.particles.remove(temp, true);
		}
		else{
			this.ctx.fillStyle ="rgba("+iter.data.currRgbaCnvsFormat()+")";
			if(this.shape == "ellipse") {
				this.ctx.save();
				this.ctx.translate(iter.data.getPos().x, iter.data.getPos().y);
				if(this.point_motion) this.ctx.rotate(Math.atan2(iter.data.speedy, iter.data.speedx));
				this.ctx.scale(iter.data.getSize().x, iter.data.getSize().y);
				this.ctx.beginPath();
				this.ctx.arc(0,0,1,0,Math.PI*2,true);
				this.ctx.closePath();
				this.ctx.fill();
				this.ctx.restore();
			}
			else {
				if(this.point_motion) {
					this.ctx.save();
					this.ctx.translate(iter.data.getPos().x, iter.data.getPos().y);
					this.ctx.rotate(Math.atan2(iter.data.speedy, iter.data.speedx));
					this.ctx.fillRect(0, 0, iter.data.getSize().x, iter.data.getSize().y);
					this.ctx.restore();
				}
				else {
					this.ctx.fillRect(iter.data.getPos().x, iter.data.getPos().y, iter.data.getSize().x, iter.data.getSize().y);
				}
			}

			
			iter = iter.next;
		}
		i++;
	}

	this.curr_tick++;
	if(this.curr_tick >= this.burst_rate) this.curr_tick = 0;
}

Emitter.prototype.set_start_rgba = function(r, g, b, a) {
	this.start_rgba = {r:r, g:g, b:b, a:a};
}

Emitter.prototype.set_end_rgba = function(r, g, b, a) {
	this.end_rgba =  {r:r, g:g, b:b, a:a};
}

Emitter.prototype.burst = function() {
	var angle_d = 2*Math.PI*((this.max_angle - this.min_angle)/360);
	var angle_min =  2*Math.PI*(this.min_angle/360);
	var emitter_ang = 2*Math.PI*(this.emitter_angle/360);
	var speed_d = this.max_speed - this.min_speed;
	for(var i = 0; i < this.burst_count; i++) {
		var randAngle = Math.random()*angle_d + angle_min + emitter_ang;
		var sin = Math.sin(randAngle);
		var cos = Math.cos(randAngle);
		var sp = Math.random()*(speed_d) + this.min_speed;
		this.particles.addFirst(new Particle(
			this.posx + (this.radius != 0 ? sin*this.radius : 0),
			this.posy + (this.radius != 0 ? cos*this.radius : 0),
			(sin*sp), (cos*sp),
			this.start_size, this.end_size,
			this.life,
			this.accelx, this.accely,
			this.start_rgba, this.end_rgba, this.targetx, this.targety, this.target)
		);
	}
}