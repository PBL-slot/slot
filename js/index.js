let slot_frame = document.getElementById("slot-frame");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let start_btn = document.getElementById("start-btn");
let stop_btn = document.getElementsByClassName("stop-btn");

let sec = 100;          //スロットのリール回転速度(実行毎秒数)
let stopReelFlag = [];  //スロットのリール停止フラグ
let reelCounts = [];    //どの画像をどの位置にさせるか
let slotFrameHeight;    //フレームの大きさ
let slotReelsHeight;    //リール(画像)全体の大きさ
let slotReelItemHeight; //リール(画像)1個の大きさ
let slotReelStartHeight;//画像の初期値

let Slot = {
  init: function() {  //初期化
    stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
    //[false, false, false]　回転させていたら止まらない状態
    reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    //[0, 0, 0] 最初に中央にくる画像の設定
  },
  start: function () { //クリックイベント
    Slot.init();
    for (let index = 0; index < 3; index++) {
      Slot.animation(index); //スロット３つ動かす
    }
  },
  stop: function (i) { //ストップボタンのクリックイベント
    stopReelFlag[i] = true;  //animateのループから抜け出せる
    if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
      start_btn.removeAttribute("disabled"); //スタートボタンの機能を機能させる
    }
  },
  resetLocationInfo: function () { //最初の位置を設定
    slotFrameHeight = slot_frame.offsetHeight;
    //offsetHeight　= height + padding（上下） + border（上下)
    //console.log(slotFrameHeight); 502(=500 + 0 + 2)
    slotReelsHeight = reels[0].offsetHeight;
    //フレームの中にある画像全体の大きさ
    //console.log(slotReelsHeight); 2700(=270px×10個)
    slotReelItemHeight = reel[0].offsetHeight;
    //フレームの中にある１つ分の画像全体の大きさ
    //console.log(slotReelItemHeight); 270
    slotReelStartHeight = -slotReelsHeight; // -2700
    slotReelStartHeight = slotReelStartHeight + slotFrameHeight
                      //画像末端がフレームのトップ　　　画像末端がフレームの末端
                           - (slotFrameHeight / 2) + slotReelItemHeight * 3 / 2;
                           //画像末端がフレームの中央　　　　画像1.5枚分下げる
    for (let i = 0; i < reels.length; i++){
      reels[i].style.top = String(slotReelStartHeight) + "px";
    }
  },
  animation: function (index) { //スロットを動かす
    if (reelCounts[index] >= 8) {
      reelCounts[index] = 0;
    }
    //animate( CSSプロパティ, 速度, イージング関数名, アニメーション完了後に実行する関数 );
    $('.reels').eq(index).animate({
      'top': slotReelStartHeight + (reelCounts[index] * slotReelItemHeight)
                                  //indexが増えるたびに、画像１つ分下がる
    },{
      duration: sec, //回転速度
      easing: 'linear', //常に一定の速度
      complete: function () {
        if (stopReelFlag[index]) { //stopReelFlag[index]がtrueになるまでループ
          return;
        }
        reelCounts[index]++;
        Slot.animation(index);
      }
    });
  },
};

window.onload = function () {
  Slot.init();
  Slot.resetLocationInfo();
  start_btn.addEventListener("click", function(e){
    e.target.setAttribute("disabled", true)    //スタートボタンを無効化
    Slot.start();
    for(let i = 0; i < stop_btn.length; i++){
      stop_btn[i].removeAttribute("disabled"); //ストップボタンを機能させる
    }
  });
  for(let i = 0; i < stop_btn.length ; i++ ){
    stop_btn[i].addEventListener("click", function (e) {
      Slot.stop(e.target.getAttribute('data-val'));//どのボタンをストップさせるか
    })
  }
};