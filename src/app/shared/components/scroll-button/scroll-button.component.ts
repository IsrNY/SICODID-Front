import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'shared-scroll-button',
  template: `
    @if(show) {
      <button id="btn_up" class="btn" (click)="goToTop()"><i class="bi bi-arrow-up"></i></button>
    }
  `,
  styles: `
    button {
      width: 40px;
      height: 40px;
      transform: translate(20PX, -25px);
      text-align: center;
      font-size: px;
      color: white !important;
      font-weight: bold;
      border-radius: 50%;
      background-color: rgba(27, 0, 102, 0.575);
      border: rgba(27, 0, 102, 0.575) solid 2px;
      position: fixed;
      bottom: -15px;
      right: 30px;
      transition: all .2s ease-in;
      box-shadow: 0px 9px 15px rgba(0,0,0,0.7);
      padding: 0px;
    }
    button:hover {
      background-color: #6A5ACD;
      border: #6A5ACD solid 2px;
    }
  `
})
export class ScrollButtonComponent {

  public show:boolean = false;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if(scrollPosition > 150) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  goToTop() {
    let top = document.getElementById('scroll');

    if(top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
}
