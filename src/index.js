import Phaser from 'phaser';

import importedImage0 from './assets/A0000.jpg'
import importedImage1 from './assets/A0001.jpg'
import importedImage2 from './assets/A0002.jpg'
import importedImage3 from './assets/A0003.jpg'
import importedImage4 from './assets/A0004.jpg'
import musicBackGround from './assets/Happy_Dreams_David_Fesliyan.mp3'
import particleYellow from './assets/yellow.png'
import particlePink from './assets/pink.png'
import particleblue from './assets/blue.png'

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
        this.load.image('spark1', particlePink);
        this.load.image('spark2', particleblue);
        this.load.image('spark',particleYellow);
        for(let i=0;i<=4;i++){
            this.load.image(`img${i}`, importedImages[i]);
        }
        this.load.audio('backgroundMusic',musicBackGround)
        
    }
      
    create ()
    {

        this.duration = 3000;
        

        let cake = this.add.image(WIDTH/2,HEIGHT-HEIGHT/4, `cake`)
        
        cake.alpha = 0
        cake.setScale(WIDTH/cake.width);

        let particles = this.add.particles('spark');
        
        this.sound.play(`backgroundMusic`);
        const images = [];
       

        let img = this.add.image(WIDTH/2,HEIGHT/2, `img${0}`)
        img.alpha = 0
        // img.setScale(0.2)
        img.setScale((WIDTH+2)/img.width);
        images.push(img)

        img = this.add.image(WIDTH/2,HEIGHT/2, `img${1}`)
        img.alpha = 0
        img.setScale((WIDTH+2)/img.width);
        images.push(img)

        img = this.add.image(WIDTH/2,HEIGHT/2, `img${2}`)
        img.alpha = 0
        img.setScale((WIDTH+2)/img.width);
        images.push(img)

        img = this.add.image(WIDTH/2,HEIGHT/2, `img${3}`)
        img.alpha = 0
        img.setScale((WIDTH+2)/img.width);
        images.push(img)

        img = this.add.image(WIDTH/2,HEIGHT/2, `img${4}`)
        img.alpha = 0
        img.setScale((WIDTH+2)/img.width);
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
Chúc mừng sinh nhật, 
Bà Ngoại.

Cả nhà May chúc bà ngoại 
Nhiều sức khỏe. 
Ăn được ngủ được. 

Happy birthday!       
        `
        let textTop = HEIGHT/10
        let CenterText =  this.add.text(WIDTH/2,textTop+textTop/2+10, centerStr, { fill: '#FFFFFF' });
        let fontsize = 1
        CenterText.setFontSize(fontsize*WIDTH/(20*fontsize));
        CenterText.setOrigin(0.5,0.5);
        CenterText.setStroke('#FFFFFF',5); //thickness
        CenterText.setShadow(5, 5, 'rgba(255,255,0,0.5)', 15);
        CenterText.alpha = 0;
       
        let timeline = this.tweens.createTimeline();
        let fw = this.firework.bind(this);
        timeline.add({
                    targets: images[0],
                    alpha: 1,
                    duration: this.duration, ease: "Quad.easeInOut", yoyo: true,reverse:false,
                    onStart: function() {  
                        // this.sound.play(`backgroundMusic`);
                    }.bind(this),
                    // onComplete: function () {
                    //     images[0].alpha=0;
                    //     images[1].alpha=1;
                    // }
                });
        timeline.add({
            targets: images[1],
            alpha: 1,   
            angle: 360,
            _ease: 'Sine.easeInOut',
            ease: 'Power2',
            duration: this.duration*2, yoyo: true,
            reverse: true
        });
        timeline.add({
                    targets: images[2],
                    
            scaleX: 1,
            scaleY: 1,     
                    alpha : 1,
                     duration: this.duration, ease: "Cubic.easeInOut", yoyo: true,reverse:false,
                });
        timeline.add({
            targets: images[3],
            alpha: 1,
            duration: this.duration, ease: "Quart.easeInOut", yoyo: true,reverse:false
        });
        timeline.add({
            targets: images[4],
            alpha: 1,
            duration: this.duration, ease: "Quint.easeInOut", yoyo: true,reverse:false,
        });

       
        timeline.add({
            targets: cake,
            alpha: 1, duration: this.duration, ease: "Expo.easeInOut", yoyo: true,
            reverse: false,
            onComplete: function () {
                cake.alpha=1;
                let emitter = particles.createEmitter();
                emitter.setPosition(WIDTH/2,HEIGHT-HEIGHT/3);
                emitter.setSpeed(200);
                emitter.setBlendMode(Phaser.BlendModes.ADD);
                fw();
            }
        });
        timeline.add({
            targets: CenterText,
            alpha: 1, duration: this.duration, ease: 'Quad.easeIn', yoyo: false,
            reverse: false,
            onComplete: function () {
                CenterText.alpha=1;
                
            }
        });
      
       timeline.play()
        
       

    }

    firework(){
        var p0 = new Phaser.Math.Vector2(WIDTH/10, HEIGHT-HEIGHT/10);
        var p1 = new Phaser.Math.Vector2(WIDTH/10, HEIGHT/2);
        var p2 = new Phaser.Math.Vector2(WIDTH-WIDTH/10, HEIGHT/2);
        var p3 = new Phaser.Math.Vector2(WIDTH-WIDTH/10, HEIGHT-HEIGHT/10);

        var curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);

        var max = 28;
        var points = [];
        var tangents = [];

        for (var c = 0; c <= max; c++)
        {
            var t = curve.getUtoTmapping(c / max);

            points.push(curve.getPoint(t));
            tangents.push(curve.getTangent(t));
        }

        var tempVec = new Phaser.Math.Vector2();

        var spark0 = this.add.particles('spark1');
        var spark1 = this.add.particles('spark2');

    for (var i = 0; i < points.length; i++)
    {
        var p = points[i];

        tempVec.copy(tangents[i]).normalizeRightHand().scale(-32).add(p);

        var angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));

        var particles = (i % 2 === 0) ? spark0 : spark1;

        particles.createEmitter({
            x: tempVec.x,
            y: tempVec.y,
            angle: angle,
            speed: { min: -100, max: 500 },
            gravityY: 200,
            scale: { start: 0.4, end: 0.1 },
            lifespan: 800,
            blendMode: 'SCREEN'
        });
        }
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