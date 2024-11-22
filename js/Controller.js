export default class Controller {
    constructor() {
    this.startbtn = document.querySelector(".js-slot_startbtn");
    this.stopbtn = document.querySelector(".js-slot_stopbtn");
    
    this.setup();
    this.setEvents();
    }
    
    setup() {
    this.renderer = new Renderer();
    }
    
    setEvents() {
    this.startbtn.addEventListener("click", (e) => {
    this.renderer.start();
    });
    
    this.stopbtn.addEventListener("click", (e) => {
    this.renderer.stop();
});
    }
    }