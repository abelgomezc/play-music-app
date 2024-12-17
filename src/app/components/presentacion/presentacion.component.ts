import { Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import $ from 'jquery';
import 'swiper/swiper-bundle.css'; 
import Swiper from 'swiper';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [IonIcon,     ],
  templateUrl: './presentacion.component.html',
 styleUrl: './presentacion.component.css'
    // styleUrl: './stilos.scss'
 
})
export class PresentacionComponent implements AfterViewInit  {
 
 
  ngOnInit(): void {
   
  }

  navigateToBuscar(): void {
    this.router.navigate(['/buscar']);
  }
  constructor(private router: Router ,private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const slider = this.el.nativeElement.querySelector('.slider');

    this.renderer.listen('document', 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      const items = slider.querySelectorAll('.item');

      if (target.matches('.next')) {
        slider.appendChild(items[0]);
      }

      if (target.matches('.prev')) {
        slider.insertBefore(items[items.length - 1], items[0]);
      }
    });
  }


}
