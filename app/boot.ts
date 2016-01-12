import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {CharacterComponent} from './character/character.component';
import {FirebaseService} from './lib/firebase';

bootstrap(AppComponent, [FirebaseService]);
bootstrap(CharacterComponent, [FirebaseService]);