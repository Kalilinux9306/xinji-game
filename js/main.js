document.addEventListener('DOMContentLoaded', () => {
    window.game = new GameEngine();
    window.game.init();
    console.log('心迹游戏引擎已初始化');
});