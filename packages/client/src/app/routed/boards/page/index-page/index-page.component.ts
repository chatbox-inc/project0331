import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {AuthState, AuthStateModel} from "../../../../store/auth/auth.state";
import {Observable} from "rxjs";
import {BoardsAction} from "../../../../store/boards/boards.action";
import {Router} from "@angular/router";
import {BoardsState, BoardsStateModel} from "../../../../store/boards/boards.state";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  @Select(AuthState) auth$: Observable<AuthStateModel>

  @Select(BoardsState) boards$: Observable<BoardsStateModel>

  form = new FormGroup({
    url: new FormControl("",Validators.required)
  })

  get url(): FormControl{
    return this.form.get("url") as FormControl
  }

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  open(){
    if(this.form.invalid){
      return
    }
    const segments = this.url.value.split("/")
    const org = segments[4]
    const number = segments[6]
    const action$ = this.store.dispatch(
      new BoardsAction.addOrgProject(
        org,
        parseInt(number)
      )
    )
    action$.subscribe({
      next:(r)=>{
        this.router.navigateByUrl(`/boards/org/${org}/${number}`)
      },
      error: (e)=>{
        console.error(e)
        alert("cant fetch repository infomation")
      }
    })
  }

  navigate(board:any){
    this.router.navigateByUrl(`/boards/org/${board.name}/${board.number}`)
  }

}
