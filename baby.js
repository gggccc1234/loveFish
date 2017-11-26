var babyObj = function () {
    this.x;
    this.y;
    this.angle;
    
    this.babytailtimer = 0;
    this.babytailcount = 0;

    this.babyeyetimer = 0;
    this.babyeyecount = 0;
    this.babyeyeinterval = 1000;

    this.babybodytimer = 0;
    this.babybodycount = 0;
}
babyObj.prototype.init = function () {
    this.x = canWidth*0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    
    
}
babyObj.prototype.draw = function () {
  
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.6);
    this.babytailtimer += deltaTime;
    if (this.babytailtimer > 50) {
        this.babytailcount = (this.babytailcount + 1) % 8;
        this.babytailtimer =this.babytailtimer% 50;
    }
    this.babyeyetimer += deltaTime;
    if (this.babyeyetimer > this.babyeyeinterval) {
        this.babyeyecount = (this.babyeyecount + 1) % 2;
        this.babyeyetimer = this.babyeyetimer % this.babyeyeinterval;
        if (this.babyeyecount == 0) {
            this.babyeyeinterval = Math.random() * 1500+2000;
        }
        else {
            this.babyeyeinterval = 200;
        }
    }
    this.babybodytimer += deltaTime;
    if (this.babybodytimer > 300) {
        this.babybodycount = this.babybodycount + 1;
        if (this.babybodycount > 19) {
            this.babybodycount = 19;
            data.gameOver = true;
        }
        this.babybodytimer = this.babybodytimer % 50;
    }
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var btcount = this.babytailcount;
    ctx1.drawImage(babyTail[btcount], -babyTail[btcount].width * 0.5 + 23, -babyTail[btcount].height * 0.5);
    var bbcount = this.babybodycount;
    ctx1.drawImage(babyBody[bbcount], -babyBody[bbcount].width * 0.5, -babyBody[bbcount].height * 0.5);
    var becount = this.babyeyecount;
    ctx1.drawImage(babyEye[becount], -babyEye[becount].width * 0.5, -babyEye[becount].height * 0.5);
    ctx1.restore();
}