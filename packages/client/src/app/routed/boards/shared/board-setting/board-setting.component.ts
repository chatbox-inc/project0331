import {Component, Input, OnInit} from '@angular/core';
import {BoardItemStateModel} from "../../../../store/boards/boards.state";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-board-setting',
  templateUrl: './board-setting.component.html',
  styleUrls: ['./board-setting.component.scss']
})
export class BoardSettingComponent implements OnInit {

  @Input() board: BoardItemStateModel;

  @Input() setting: FormGroup;

  constructor() { }

  get iteration():FormControl{
    return this.setting.get("iteration") as FormControl
  }

  get sumup():FormControl{
    return this.setting.get("sumup") as FormControl
  }

  get fields(){
    return this.board.projectNext?.fields?.nodes ?? []
  }

  ngOnInit(): void {
    console.log(this.board)
  }

}
