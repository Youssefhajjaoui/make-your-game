export class Player {
    constructor() {
        this.score = 0;
        this.ispause = false;
        this.game = null;
        this.menuButton = document.querySelector('.menu-button');
        this.menuBar = null;
        this.lives = 3;
    }

    listnermenu() {
        this.menuButton.addEventListener('click', () => {
            // if (this.game.isPaused) {
            //     return
            // }
            // this.game.isPaused = true;

            // Create the menu bar
            this.menuBar = document.createElement('div');
            this.menuBar.classList.add('menu-bar');

            const restart = document.createElement('a');
            restart.href = '/src';
            restart.textContent = 'restart';
            restart.classList.add('menu-item');

            const continueBtn = document.createElement('button');
            continueBtn.textContent = 'continue';
            continueBtn.classList.add('menu-item');


            const closeMenu = () => {
                this.game.isPaused = false;
                if (this.menuBar) {
                    this.menuBar.remove();
                    this.menuBar = null;
                }
                document.removeEventListener('keydown', handleSpaceKey);
                return
            };
            const handleSpaceKey = (event) => {
                if (event.code === "Space") {
                    closeMenu();
                }
            };

            continueBtn.addEventListener('click', closeMenu);
            document.addEventListener('keydown', handleSpaceKey);


            this.menuBar.appendChild(restart);
            this.menuBar.appendChild(continueBtn);

            document.body.appendChild(this.menuBar);
        });

        document.body.appendChild(this.menuButton);
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