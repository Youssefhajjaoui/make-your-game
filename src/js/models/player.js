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
                this.overlay.style.display = 'none';
                this.menuBar.style.display = 'none';
                this.game.paddle.listener();
            };

            this.menuBar.querySelector('#restart').addEventListener('click', (event) => {
                event.preventDefault();
                window.location.reload();
            });
            this.menuBar.querySelector('#continue').addEventListener('click', closeMenu);
        });

    }
}