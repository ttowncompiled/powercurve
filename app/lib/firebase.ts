/// <reference path="typings/firebase/firebase.d.ts" />
import {Injectable} from 'angular2/core';

@Injectable()
export class FirebaseService {
  dataRef: Firebase;
  
  constructor() {
    this.dataRef = new Firebase('https://powercur.firebaseIO.com');
  }
}