class FlappyBird {

    constructor() {
        keyboard = Keyboard.getInstance();
        theChose = 0;
        this.PIPE_DELAY = 100;
        this.paused;
        this.pauseDelay;
        this.restartDelay;
        this.pipeDelay;
        this.characterDelay;
        this.scoreDelay;
        this.userDelay;
        this.bird;
        this.pipes;
        this.score;
        this.gameover;
        this.started;
        this.score_;
        this.setUser;
        this.theChose = 0;
        restart();
    }

    restart() {
        paused = false;
        started = false;
        gameover = false;
        score_ = false;
        setUser = false;
        
        score = 0;
        pauseDelay = 0;
        restartDelay = 0;
        pipeDelay = 0;
        characterDelay = 0;
        userDelay = 0;
        bird = new Bird(theChose);
    }

    update() {
        watchForStart();
        if (!started){
            watchForCharacter();
            watchScore();
            watchForUser();
            return;
        }

        watchForPause();
        watchForReset();

        if (paused)
            return;

        bird.update();

        if (gameover)
            return;

        movePipes();
        checkForCollisions();
    }

    getRenders() {
        var renders;
        renders.add(new Pipe());
        pipes.forEach(element => {
            renders.add(element.getRender());
        });
        renders.add(new Render(0, 0, "lib/foreground.png"));
        renders.add(bird.getRender());
        return renders;
    }

    this.void watchForStart() {
        if (!started && keyboard.isDown(KeyEvent.VK_SPACE)) {
            started = true;
        }
    }

    this.void watchForPause() {
        if (pauseDelay > 0)
            pauseDelay--;

        if (keyboard.isDown(KeyEvent.VK_P) && pauseDelay <= 0) {
            paused = !paused;
            pauseDelay = 10;
        }
    }

    this.void watchForReset() {
        if (restartDelay > 0)
            restartDelay--;

        if (keyboard.isDown(KeyEvent.VK_R) && restartDelay <= 0) {
            restart();
            setUser = false;
            restartDelay = 10;
            return;
        }
    }

    this.void movePipes() {
        pipeDelay--;

        if (pipeDelay < 0) {
            pipeDelay = PIPE_DELAY;
            Pipe northPipe = null;
            Pipe southPipe = null;

            // Look for pipes off the screen
            for (Pipe pipe : pipes) {
                if (pipe.x - pipe.width < 0) {
                    if (northPipe == null) {
                        northPipe = pipe;
                    } else if (southPipe == null) {
                        southPipe = pipe;
                        break;
                    }
                }
            }

            if (northPipe == null) {
                Pipe pipe = new Pipe("north");
                pipes.add(pipe);
                northPipe = pipe;
            } else {
                northPipe.reset();
            }

            if (southPipe == null) {
                Pipe pipe = new Pipe("south");
                pipes.add(pipe);
                southPipe = pipe;
            } else {
                southPipe.reset();
            }

            northPipe.y = southPipe.y + southPipe.height + 175;
        }

        for (Pipe pipe : pipes) {
            pipe.update();
        }
    }

    this.void checkForCollisions() {

        for (Pipe pipe : pipes) {
            if (pipe.collides(bird.x, bird.y, bird.width, bird.height)) {
                gameover = true;
                bird.dead = true;
            } else if (pipe.x == bird.x && pipe.orientation.equalsIgnoreCase("south")) {
                score++;
            }
        }

        // Ground + Bird collision
        if (bird.y + bird.height > App.HEIGHT - 80) {
            gameover = true;
            bird.y = App.HEIGHT - 80 - bird.height;
        }
    }

    this.void watchForCharacter() {
        if (keyboard.isDown(KeyEvent.VK_RIGHT) && characterDelay <=0) {
            theChose++;
            theChose = theChose == (bird.getCharacterlenght())? 0:theChose;
            restart();
            characterDelay = 15;
            setUser=false;
        }else if(keyboard.isDown(KeyEvent.VK_LEFT) && characterDelay <=0){
            theChose--;
            theChose = theChose < 0? (bird.getCharacterlenght()-1) :theChose;
            restart();
            setUser=false;
            characterDelay = 15;
        } else if (characterDelay > 0)
            characterDelay--;
    }

    this.void watchScore() {
        if (keyboard.isDown(KeyEvent.VK_S) && scoreDelay <=0) {
            score_ = !score_;
            scoreDelay = 15;
        }else if (scoreDelay > 0)
            scoreDelay--;
        
    }

    this.void watchForUser() {
        if (keyboard.isDown(KeyEvent.VK_U) && userDelay ==0) {
            setUser = true;
            userDelay = 15;
        }else if (userDelay > 0){
            userDelay--;
            setUser = false;
        }
        
    }
    
    public void setUserSta(boolean b){
        setUser = b;
    }
}
