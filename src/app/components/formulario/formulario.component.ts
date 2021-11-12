import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public form: FormGroup
  public user: AbstractControl
  public sub = false
  public users: any[] = []
  public selectedId = ""

  constructor(
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      user: ['', Validators.required ]
    })
    this.user = this.form.controls['user']
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls
  }

  validacion() {
    console.log(this.form.value)
    this.sub = true
    if(this.form.invalid)
      return
    this.add()
  }

  create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

  add() {
    //console.log(this.selectedId)
    if(this.selectedId){
      //console.log(1)
      this.commitEdit()
    }else {
    //console.log(this.form.controls['user'].value)
    //console.log(2)
    this.users.push({ id: this.create_UUID() , user : this.form.controls['user'].value, status: false})
    //console.log(this.users)
    }
    this.reset()
    this.sub = false
  }

  reset() {
    this.form.reset()
  }

  edit(item: any) {
    console.log(item)
    this.form.get('user')?.setValue(item.user)
    this.selectedId = item.id
  }

  commitEdit() {
    for (let index = 0; index < this.users.length; index++) {
      if(this.users[index].id == this.selectedId){
        this.users[index].user = this.form.get('user')?.value
        //console.log(this.form.get('user')?.value)
      }
    }
    this.selectedId = ""
    //console.log(this.users)
  }

  delete(id: string) {
    for (let index = 0; index < this.users.length; index++) {
      if(this.users[index].id == id){
        this.users.splice(index, 1)
      }
    }
  console.log(this.users)
  }

  disEnable(item: any) {
    for (let index = 0; index < this.users.length; index++) {
      if(this.users[index].id == item.id){
        this.users[index].status = !this.users[index].status
      }
    }
  }

}
