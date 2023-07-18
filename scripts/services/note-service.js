// CRUD
import Note from '../models/note.js';
export const noteOperations ={
    notes:[],
 add(noteObject){
    const note = new Note(noteObject);
    this.notes.push(note);
 },
 searchById(id){
   return this.notes.find(note=>note.id==id);
 },
 toggleMark(id){
   this.searchById(id).toggleMark();
   //const noteObject = this.searchById(id);
   //noteObject.isMarked = !noteObject.isMarked;
 },


 total(){
    return this.notes.length;
 },
 markTotal(){
    return this.notes.
    filter(note=>note.isMarked).length;
 },
 unMarkTotal(){
    return this.total() - this.markTotal();
 },
 getNotes(){
   return this.notes.filter(note=>!note.isMarked);
 },
 remove(){
   this.notes = this.notes
   .filter(note=>!note.isMarked)
 },
 search(){

 },
 sort(){

 },
 save(){

 },
 update(){

 },
 load(){

 }
}