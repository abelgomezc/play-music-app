import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MusicSearchService } from '../../services/music-search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { NoResultsComponent } from "../no-results/no-results.component";



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NoResultsComponent
],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',


})
export class SearchComponent   implements OnInit {

  searchQuery = '';
  results: any[] = [];
  
  searchPerformed = false;
  isLoading: boolean = false; // Estado de carga
  inputFocus = false;
  selectedSound: any = null;  // Para almacenar la canción seleccionada


  constructor(private musicSearchService: MusicSearchService) {}

  ngOnInit(): void {
    this.musicasInicales();
  }
  
  // selectSong(sound: any) {
  //   this.selectedSound = sound;
  // }

  // selectSong(song: any, audioPlayer: HTMLAudioElement) {
  //   this.selectedSound = song; // Actualiza la canción seleccionada
  //   setTimeout(() => {
  //     // Forzamos la actualización del reproductor
  //     audioPlayer.load();
  //     audioPlayer.play().catch((error) => {
  //       console.error('Error al reproducir la canción:', error);
  //     });
  //   }, 0);

  // }
  search() {
    this.isLoading = true;
    if (!this.searchQuery.trim()) {
      this.isLoading = true;
      this.results = [];
      this.searchPerformed = true;
      this.isLoading = false; // Ocultar el spinner
      return;
    }

 
/// esta es con la api 
    this.musicSearchService.searchMusic(this.searchQuery).subscribe({
      next: (data) => {
       // this.results = data?.results || [];
         // Transformamos la respuesta
    // this.results = data.music.map((music: any) => ({
    //   title: music.title,
    //   artist: music.author,
    //   album: music.album,
    //   audioUrl: music.play_url.uri,
    //   coverImage: music.cover_large.url_list[0]
    // }));

    console.log(data);

    this.results = data.data.map((music: any) => ({
      title: music.title, // Asigna el título
      artist: music.artist.name, // Asigna el nombre del artista
      album: music.album.title, // Asigna el título del álbum
      audioUrl: music.preview, // Asigna la URL de previsualización
      coverImage: music.artist.picture_big // Usa la portada del álbum como imagen
    }));


        
        this.searchPerformed = true;
        this.isLoading = false; // Ocultar el spinner
        
      this.selectedSound = this.results[0];

      },
      error: (err) => {
        console.error('Error fetching music:', err);
        this.results = [];
        this.searchPerformed = true;
        this.isLoading = false; // Ocultar el spinner

      }
    });
  }

  isPlaying: boolean = false;
 
  @ViewChild('audioPlayer') audioPlayerRef: ElementRef | undefined;  // Referencia al audio
  audioPlayer: HTMLAudioElement | null = null;
  ngAfterViewInit() {
    // Esto asegura que se ha cargado la vista y podemos acceder al elemento 'audio'
    if (this.audioPlayerRef) {
      // Accedemos al reproductor de audio a través de `audioPlayerRef.nativeElement`
      this.audioPlayer = this.audioPlayerRef.nativeElement;
    }
  }

  selectSong(song: any) {
    this.selectedSound = song;  // Asigna la canción seleccionada
    this.isPlaying = false;  // Pausa la canción al seleccionar una nueva
 
    if (this.audioPlayerRef) {
      const audioElement = this.audioPlayerRef.nativeElement;
      
      // Pausa y carga el nuevo audio
      audioElement.pause();
      audioElement.load();
      
      // Esperamos a que el audio esté listo para reproducirse
      audioElement.oncanplaythrough = () => {
        this.playSong();  // Reproduce la canción una vez que esté completamente cargada
      };
    }
  }

  // Alterna entre reproducir y pausar
  togglePlayPause() {
    const audioElement = this.audioPlayerRef?.nativeElement;
    if (this.isPlaying) {
      audioElement?.pause();  // Pausar la canción
      this.isPlaying = false;
    } else {
      audioElement?.play();  // Reproducir la canción
      this.isPlaying = true;
    }
  }

  playSong() {
    if (this.audioPlayerRef) {
      const audioElement = this.audioPlayerRef.nativeElement;
      
      // Intentamos reproducir la canción
      audioElement.play().then(() => {
        this.isPlaying = true;  // Actualiza el estado a "Reproduciendo"
      }).catch((error: any) => {
        console.error("Error al reproducir la canción:", error);
      });
    }
  }
  // Siguiente canción
  nextSong() {
    const currentIndex = this.results.indexOf(this.selectedSound);
    const nextIndex = (currentIndex + 1) % this.results.length;
    this.selectedSound = this.results[nextIndex];
  
    // Si hay un reproductor de audio
    if (this.audioPlayerRef) {
      const audioElement = this.audioPlayerRef.nativeElement;
  
      // Pausar la canción actual
      audioElement.pause();
  
      // Cargar el nuevo audio sin interrumpir la reproducción directamente
      audioElement.src = this.selectedSound.audioUrl;  // Actualizar la URL del nuevo audio
      
      // Esperamos a que el audio esté listo para reproducirse
      audioElement.oncanplaythrough = () => {
        this.playSong();  // Reproduce la canción una vez que esté completamente cargada
      };
  
      // Llamar a load() para cargar el nuevo audio, pero no interrumpir la reproducción directamente
      audioElement.load();
    }
  }
  
  // Canción anterior
  previousSong() {
    const currentIndex = this.results.indexOf(this.selectedSound);
    const prevIndex = (currentIndex - 1 + this.results.length) % this.results.length;
    this.selectedSound = this.results[prevIndex];
  
    // Si hay un reproductor de audio
    if (this.audioPlayerRef) {
      const audioElement = this.audioPlayerRef.nativeElement;
  
      // Pausar la canción actual
      audioElement.pause();
  
      // Cargar el nuevo audio sin interrumpir la reproducción directamente
      audioElement.src = this.selectedSound.audioUrl;  // Actualizar la URL del nuevo audio
      
      // Esperamos a que el audio esté listo para reproducirse
      audioElement.oncanplaythrough = () => {
        this.playSong();  // Reproduce la canción una vez que esté completamente cargada
      };
  
      // Llamar a load() para cargar el nuevo audio, pero no interrumpir la reproducción directamente
      audioElement.load();
    }
  }
  

  // Evento de reproducción
  onPlay() {
    console.log("La música está reproduciéndose");
    this.playSong();
  }

  // Evento de pausa
  onPause() {
    console.log("La música ha sido pausada");
  }



  musicasInicales(){

    if (this.searchQuery.trim() === "") {
      // Usa la lista quemada si no hay una búsqueda
      
      this.results = [
        {
          title: "Warm",
          artist: "Tío Cuña",
          album: "Divide",
          audioUrl: "assets/recursos/audio/warm.mp3",
          coverImage: "assets/recursos/img/5.png"
        },
        {
          title: "Next",
          artist: "Tío Cuña",
          album: "After Hours",
          audioUrl: "assets/recursos/audio/next.mp3",
          coverImage: "assets/recursos/img/10.png"
        },
     
      ];
      this.isLoading = false; // Ocultar el spinner
      this.selectedSound = this.results[0];
 
    } else {
   
    }


    /// esta es con la api 
   
   
    // this.musicSearchService.searchMusic("Somebody's Watching Me").subscribe({
    //   next: (data) => {
     

    // // console.log(data);

    // this.results = data.data.map((music: any) => ({
    //   title: music.title, // Asigna el título
    //   artist: music.artist.name, // Asigna el nombre del artista
    //   album: music.album.title, // Asigna el título del álbum
    //   audioUrl: music.preview, // Asigna la URL de previsualización
    //   coverImage: music.artist.picture_big // Usa la portada del álbum como imagen
    // }));


        
    //     this.searchPerformed = true;
    //     this.isLoading = false; // Ocultar el spinner
        
    //   this.selectedSound = this.results[0];

    //   },
    //   error: (err) => {
    //     console.error('Error fetching music:', err);
    //     this.results = [];
    //     this.searchPerformed = true;
    //     this.isLoading = false; // Ocultar el spinner

    //   }
    // });
  }
}
