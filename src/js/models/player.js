export class Player {
    constructor() {
        this.score = 0;
        this.game = null;
        this.menuButton = document.querySelector('.menu-button');
        this.menuBar = document.getElementById('pause-dashboard');
        this.lives = 3;
        this.overlay = document.querySelector('.overlay');
    }

    listnermenu() {
        this.menuButton.addEventListener('click', () => {
            this.game.isPaused = true;
            this.overlay.style.display = 'block';
            this.menuBar.style.display = 'block';   
            const closeMenu = () => {
                console.log('close');
                this.game.isPaused = false;
                this.overlay.style.display = 'none';
                this.menuBar.style.display = 'none';
            };
            const handleSpaceKey = (event) => {
                if (event.code === "Space") {
                    closeMenu();
                }
            };
            console.log(this.menuBar);
            this.menuBar.querySelector('#restart').addEventListener('click', ()=>{
                window.location.reload();
            });
           this.menuBar.querySelector('#continue').addEventListener('click', closeMenu);
            document.addEventListener('keydown', handleSpaceKey);
        });

    }


    cleanupMenu() {
        if (this.menuButton) {
            this.menuButton.remove();
            this.menuButton = null;
        }
        if (this.menuBar) {
            this.menuBar.remove();
            this.menuBar = null;
        }
    }
}