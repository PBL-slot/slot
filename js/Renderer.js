const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };
  
  export default class Controller extends Base {
   constructor() {
    super();
  
  　this.wheel = document.querySelector(".js-slot_wheel_inner"); 
    this.isUEv = true;
  
    this.speed = { value: 0 };
    this.num = { value: 0 };
    this.picHight = 40;
    this.len = 7;
  
    this.setEvents();
   }
  
   update() {
    this.num.value += this.speed.value;
    const y = -1 * ((this.num.value * this.picHight) % 280);
  
    this.wheel.style.transform = `translate3d(0px, ${y}px, 0px)`;
   }
  
   start() {
    this.tl = gsap.timeline();
  
    this.tl.to(this.speed, 5, {
     value: 0.4,
     ease: "expo.out",
    });
   }
  
   stop() {
    if (this.tl) this.tl.kill();
  
    // 現在何周目か + 1回転足す
    const lap = Math.ceil((this.num.value * this.picHight) / (this.picHight * this.len)) + 1; 
  
    this.tl = gsap.timeline();
  
    this.tl
    .set(this.speed, {
     value: 0,
    })
    .to(this.num, 4, {
     value: lap * this.len + randomInt(0, this.len),
     ease: "power3.out",
    });
   }
  
   setEvents() {
    super.setEvents();
   }
  }