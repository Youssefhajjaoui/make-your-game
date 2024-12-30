export class Player {
    constructor() {
        this.score = 0;
        this.ispause = false;
        this.game = null;
        this.menuButton = null;
        this.menuBar = null;
    }

    listnermenu() {
        if (this.menuButton) {
            this.menuButton.remove();
        }

        this.menuButton = document.createElement('button');
        this.menuButton.textContent = 'menu';
        this.menuButton.classList.add('menu-button');

        this.menuButton.addEventListener('click', () => {
            this.game.isPaused = true;

            this.menuBar = document.createElement('div');
            this.menuBar.classList.add('menu-bar');

            const restart = document.createElement('a');
            restart.href = '/src';
            restart.textContent = 'restart';
            restart.classList.add('menu-item');

            const continueBtn = document.createElement('button');
            continueBtn.textContent = 'continue';
            continueBtn.classList.add('menu-item');

            continueBtn.addEventListener('click', () => {
                this.game.isPaused = false;
                if (this.menuBar) {
                    this.menuBar.remove();
                    this.menuBar = null;
                }
            });

            
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