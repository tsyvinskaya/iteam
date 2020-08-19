import { Component, OnInit } from '@angular/core';
import { timer,Observable } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  constructor() { }

  source;
  timer: number = 0;
  tick: number = 0;
  subscribeTimer: number;
  abc;
  timerOn: boolean = false;
  pause: boolean = false;
  waitClick;
hh:number=0;
mm:number=0;
ss:number=0;


  ngOnInit(): void {
    this.source = timer(0, 1000);
  }
  observableTimer() {
    this.timer = this.tick;
    this.abc = this.source.subscribe(value => {
      this.subscribeTimer = value;
      this.tick = this.timer + this.subscribeTimer;
      this.timerOn = true;
    });
  };

  StartStopTimer() {
    if (this.timerOn === false && this.pause === false) {
      this.tick = 0;
      this.observableTimer();
    }
    else if (this.timerOn === false && this.pause === true) {
      this.observableTimer();
      this.pause = false;
    } else {
      this.abc.unsubscribe();
      this.timerOn = false;
    }
  };

  waitfunc() {
    if (this.waitClick !== undefined) {
      let secondClick = new Date();
      let t = +secondClick - (+this.waitClick);
      this.waitClick = undefined;
      if (t <= 300) { this.WaitTimer(); }
    } else {
      this.waitClick = new Date();
    }
  }

  WaitTimer() {
    this.abc.unsubscribe();
    this.timer = this.subscribeTimer;
    this.timerOn = false;
    this.pause = true;
  };

  reset() {
    this.abc.unsubscribe();
    this.tick = 0;
    this.observableTimer();
  }
 get = function (id) {
    return document.getElementById(id);
}
//   count() {
//     if (this.hh == 0 && this.mm ==0&& this.ss==0) {
//         this.get("timer").innerHTML = "00:00:00";
//     }
//     else if (this.mm < 10 && this.ss < 10) {
//       this.get("timer").innerHTML = "0" + this.hh.toString() + ":0" + this.mm.toString() + ":0" + this.ss.toString();
//     }
//     else if (sec > 10 && ms < 10) {
//       this.get("timer").innerHTML = "0" + min.toString() + ":" + sec.toString() + ":0" + ms.toString();
//     }
//     else if (sec<10) {
//       this.get("timer").innerHTML = "0" + min.toString() + ":0" + sec.toString() + ":" + ms.toString();
//     }
//     else if (min < 10) {
//       this.get("timer").innerHTML = "0" + min.toString() + ":" + sec.toString() + ":" + ms.toString();
//     }
//     this.ss++;
//     if (this.ss>99) {
//       this.ss>= 0;
//       this.mm++;
//         if (this.mm>59) {
//           this.mm = 0;
//           this.hh++;
//         }
//     }
// }
// this.mm = new Observable<string>(observer => {
//   if (observer.next(this.tick))>59 {
//     this.mm++};
// });

timeMask(tick){
  this.mm = Math.floor(tick / 60);
  if (this.mm<10){
  return "0" + this.mm}
  else {
    return this.mm
  }
}


}
