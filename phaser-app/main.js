window.addEventListener('load', () => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#1d212d',
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    const game = new Phaser.Game(config);

    function preload() {
        // Load assets here
    }

    function create() {
        this.add.text(100, 100, 'Hello Phaser!', { fill: '#ffffff' });
        console.log('Game started');
    }

    function update() {
        // Game loop logic
    }
});
