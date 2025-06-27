window.addEventListener('load', () => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#5c94fc',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 500 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    const game = new Phaser.Game(config);

    let player;
    let cursors;
    let platforms;
    let coins;
    let score = 0;
    let scoreText;

    function preload() {
        // assets are generated at runtime
    }

    function create() {
        // create simple textures for player, ground and coin
        const g = this.add.graphics();
        g.fillStyle(0x00aa00, 1);
        g.fillRect(0, 0, 64, 32);
        g.generateTexture('ground', 64, 32);
        g.clear();
        g.fillStyle(0xff0000, 1);
        g.fillRect(0, 0, 32, 48);
        g.generateTexture('player', 32, 48);
        g.clear();
        g.fillStyle(0xffff00, 1);
        g.fillCircle(8, 8, 8);
        g.generateTexture('coin', 16, 16);
        g.destroy();

        this.physics.world.setBounds(0, 0, 1600, 600);
        this.cameras.main.setBounds(0, 0, 1600, 600);

        // create platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // create player
        player = this.physics.add.sprite(100, 450, 'player');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        // create coins
        coins = this.physics.add.group({
            key: 'coin',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 120 }
        });
        coins.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        scoreText.setScrollFactor(0);

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(coins, platforms);
        this.physics.add.overlap(player, coins, collectCoin, undefined, this);

        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(player, true, 0.05, 0.05);

        console.log('Game started');
    }

    function update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        } else {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

    function collectCoin(player, coin) {
        coin.disableBody(true, true);
        score += 10;
        scoreText.setText('score: ' + score);
    }
});
