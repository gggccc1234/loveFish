var momObj = function () {
    this.x;
    this.y;
    this.angle;


    this.momtailtimer = 0;
    this.momtailcount = 0;
    this.momeyetimer = 0;
    this.momeyecount = 0;
    this.momeyeinterval = 1000;

    this.mombodycount = 0;
}
momObj.prototype.init = function () {
    this.x = canWidth*0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;

}
momObj.prototype.draw = function () {
    this.x = lerpDistance(mx, this.x, 0.99);
    this.y = lerpDistance(my, this.y, 0.99);
    var deltaX = mx - this.x;
    var deltaY = my - this.y;
    var beta = Math.atan2(deltaY, deltaX)+Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.6);
    this.momtailtimer += deltaTime;
    if (this.momtailtimer > 50) {
        this.momtailcount = (this.momtailcount + 1) % 8;
        this.momtailtimer = this.momtailtimer % 50;
    }
    this.momeyetimer += deltaTime;
    if (this.momeyetimer > this.momeyeinterval) {
        this.momeyecount = (this.momeyecount + 1) % 2;
        this.momeyetimer = this.momeyetimer % this.momeyeinterval;
        if (this.momeyecount == 0) {
            this.momeyeinterval = Math.random() * 1500 + 2000;
        }
        else {
            this.momeyeinterval = 200;
        }
    }
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var mtcount = this.momtailcount;
    ctx1.drawImage(momTail[mtcount], -momTail[mtcount].width * 0.5 + 30, -momTail[mtcount].height * 0.5);
    var mbcount = this.mombodycount;
    if (data.double == 1) {
        if (!eating) {
            ctx1.drawImage(momBodyOrange[mbcount], -momBodyOrange[mbcount].width * 0.5, -momBodyOrange[mbcount].height * 0.5);
        }
        else {
            eattime++;
            if (eattime > 15) {
                eating = false;
            }
            ctx1.drawImage(momEatOrange[mbcount], -momEatOrange[mbcount].width * 0.5, -momEatOrange[mbcount].height * 0.5);
        }
    }
    else {
        if (!eating) {
            ctx1.drawImage(momBodyBlue[mbcount], -momBodyBlue[mbcount].width * 0.5, -momBodyBlue[mbcount].height * 0.5);
        }
        else {
            eattime++;
            if (eattime > 15) {
                eating = false;
            }
        
            ctx1.drawImage(momEatBlue[mbcount], -momEatBlue[mbcount].width * 0.5, -momEatBlue[mbcount].height * 0.5);
        }
    }
   
    var mecount = this.momeyecount;
    ctx1.drawImage(momEye[mecount], -momEye[mecount].width * 0.5, -momEye[mecount].height * 0.5);
    ctx1.restore();
}