import { RouterModule, Routes } from "@angular/router";
import { SearchComponent } from "./components/search/search.component";
import { NgModule } from "@angular/core";
import { PresentacionComponent } from "./components/presentacion/presentacion.component";

export const routes: Routes = [
  { path: '', component: PresentacionComponent }, // Componente de presentación inicial
  { path: 'buscar', component: SearchComponent }, // Componente de búsqueda
  { path: '**', redirectTo: '/buscar' } // Ruta para páginas no encontradas
 
 ];
 
 @NgModule({
     imports: [RouterModule.forRoot(routes, { useHash: true })], // Habilitar modo hash
     exports: [RouterModule],
   })
   export class AppRoutingModule {}
