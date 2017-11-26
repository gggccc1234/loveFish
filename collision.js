function momFruitCollision() {
    if (!data.gameOver) {
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i] && fruit.l[i] > 14) {
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if (l < 900) {
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.mombodycount++;
                    if (mom.mombodycount > 7) {
                        mom.mombodycount = 7;
                    }
                    if (fruit.fruitType[i] == "blue") {
                        data.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                    eating = true;
                    eattime = 0;
                }
            }
        }
    }
}
function momBabyCollision() {
    var l = calLength2(mom.x, mom.y, baby.x, baby.y);
    if (data.fruitNum > 0&&!data.gameOver) {
        if (l < 900) {
            baby.babybodycount = 0;

            mom.mombodycount = 0;
            data.addScore();
            halo.born(baby.x,baby.y);
        }
    }
    
}