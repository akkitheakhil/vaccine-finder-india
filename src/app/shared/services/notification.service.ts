import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/alert-notification.wav';
    audio.load();
    audio.play();
  }
}
