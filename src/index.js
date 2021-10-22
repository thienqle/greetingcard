import Phaser from 'phaser';

import importedImage0 from './assets/A0000.jpg'
import importedImage1 from './assets/A0001.jpg'
import importedImage2 from './assets/A0002.jpg'
import importedImage3 from './assets/A0003.jpg'
import importedImage4 from './assets/A0004.jpg'
import musicBackGround from './assets/Happy_Dreams_David_Fesliyan.mp3'
import particleYellow from './assets/yellow.png'

import cakeImg from './assets/cake.jpg';

const WIDTH=window.innerWidth     
const HEIGHT=window.innerHeight
// const WIDTH = 1024;
// const HEIGHT= 768;

var importedImages = [importedImage0,importedImage1,importedImage2,
                        importedImage3,importedImage4]

class MyGame extends Phaser.Scene
{
    
    constructor()
    {
        super();
    }

    preload ()
    {
        this.load.image('cake', cakeImg);
        this.load.image('spark',particleYellow);
        for(let i=0;i<=4;i++){
            this.load.image(`img${i}`, importedImages[i]);
        }
        this.load.audio('backgroundMusic',musicBackGround)
        
    }
      
    create ()
    {

        this.duration = 50;
        

        let cake = this.add.image(WIDTH/2,HEIGHT-HEIGHT/4, `cake`)
        
        cake.alpha = 0
        cake.setScale(WIDTH/cake.width);

        let particles = this.add.particles('spark');
        
        this.sound.play(`backgroundMusic`);
        const images = [];
       

        let img = this.add.image(WIDTH/2,HEIGHT/2, `img${0}`)
        img.alpha = 0
        // img.setScale(0.2)
        img.setScale(WIDTH/img.width);
        images.push(img)

        img = this.add.image(WIDTH/2,HEIGHT/2, `img${1}`)
        img.alpha = 0
        img.setScale(WIDTH/img.width);
        images.push(img)

        img = this.add.image(WIDTH/2,HEIGHT/2, `img${2}`)
        img.alpha = 0
        img.setScale(WIDTH/img.width);
        images.push(img)

        img = this.add.image(WIDTH/2,HEIGHT/2, `img${3}`)
        img.alpha = 0
        img.setScale(WIDTH/img.width);
        images.push(img)

        img = this.add.image(WIDTH/2,HEIGHT/2, `img${4}`)
        img.alpha = 0
        img.setScale(WIDTH/img.width);
        images.push(img)

        const shader = this.add.shader('HSL', 400, 300, 512, 512);
          
        
        // for(let i=0;i<=4;i++){
        //     this.tweens.add({
        //         targets: images,
        //         alpha: 1,
        //         duration: 5000,
        //         ease: "Power2",
        //         yoyo: true,
        //         loop: -1
        //     });
        // }

        let centerStr = `
Chúc mừng sinh nhật Bà Ngoại. 
Cả nhà May chúc bà ngoài 
Nhiều sức khỏe. 
Ăn được ngủ được. 
Happy birthday!
        
        `
        let CenterText =  this.add.text(10, 100, centerStr, { fill: '#FFFFFF' });
        let fontsize = 1
        CenterText.setFontSize(fontsize*WIDTH/(20*fontsize));
        CenterText.alpha = 0;
       
        let timeline = this.tweens.createTimeline();
        timeline.add({
                    targets: images[0],
                    alpha: 1, duration: this.duration, ease: "Power2", yoyo: true,reverse:false,
                    onStart: function() {
                                    
                        this.sound.play(`backgroundMusic`);
                    }.bind(this)
                });
        timeline.add({
                    targets: images[2],
                    alpha: 1, duration: this.duration, ease: "Power2", yoyo: true,reverse:false
                });
        timeline.add({
            targets: images[3],
            alpha: 1, duration: this.duration, ease: "Power2", yoyo: true,reverse:false
        });
        timeline.add({
            targets: images[4],
            alpha: 1, duration: this.duration, ease: "Power2", yoyo: true,reverse:false
        });

        timeline.add({
                    targets: images[1],
                    alpha: 1, duration: this.duration, ease: "Power2", yoyo: true,
                    reverse: false,
        });
        timeline.add({
            targets: cake,
            alpha: 1, duration: this.duration, ease: "Power2", yoyo: true,
            reverse: false,
            onComplete: function () {
                cake.alpha=1;
                let emitter = particles.createEmitter();
                emitter.setPosition(WIDTH/2,HEIGHT-HEIGHT/3);
                emitter.setSpeed(200);
                emitter.setBlendMode(Phaser.BlendModes.ADD);

            }
        });
        timeline.add({
            targets: CenterText,
            alpha: 1, duration: this.duration, ease: "Power2", yoyo: true,
            reverse: false,
            onComplete: function () {
                CenterText.alpha=1;
            }
        });
      
       timeline.play()
        
       

    }

    
}




const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: WIDTH,
    height: HEIGHT,
    scene: MyGame,
    // duration: 1000
};

const game = new Phaser.Game(config);