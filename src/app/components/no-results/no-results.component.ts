import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-no-results',
  standalone: true,
  imports: [
        CommonModule, 
        FormsModule,
  ],
  templateUrl: './no-results.component.html',
  styleUrl: './no-results.component.css'
})
export class NoResultsComponent {
  @Input() results: any[] = []; // Lista de resultados
  @Input() isLoading: boolean = false; // Estado de carga
}
