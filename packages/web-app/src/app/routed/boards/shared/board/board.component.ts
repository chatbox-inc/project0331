import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BoardItemStateModel } from '@store/boards/boards.interface';
import { first } from 'rxjs/operators';
import { IssuesCollection } from 'src/app/routed/boards/service/issues.collection';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private _board: BoardItemStateModel;
  get board() {
    return this._board;
  }
  @Input() set board(value: BoardItemStateModel) {
    this._board = value;
    this.#updateIterationList();
  }

  form = new FormGroup({
    iteration: new FormControl(''),
  });

  public iterationList: any[] = [];

  public issues: IssuesCollection = new IssuesCollection([]);

  get iteration(): FormControl {
    return this.form.get('iteration') as FormControl;
  }

  get fields() {
    return this.board.projectNext.fields.nodes;
  }

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(first()).subscribe(() => {
      this.updateIssues();
    });
  }

  #updateIterationList() {
    // console.log(this.board);
    const fields = this.board.projectNext?.fields.nodes ?? [];
    const field = fields.find((f: any) => {
      // console.log(f.name, this.board.setting?.iteration);
      return f.name === this.board.setting?.iteration;
    });
    const iteration = JSON.parse(field?.settings ?? 'null');
    // console.log({ iteration });
    // イテレテーションの設定値がない場合は、空の配列を返す
    if (!iteration?.configuration) {
      this.iterationList = [];
      return;
    }
    const completed = iteration?.configuration?.completed_iterations;
    const current = iteration?.configuration?.iterations;
    const iterationIndex = completed.length || 0;
    // 完了したイテレーションがある場合は過去のイテレーションもセット
    if (!completed) {
      this.iterationList = current;
    } else {
      const completedReverse = completed.reverse();
      this.iterationList = [...completedReverse, ...current];
    }

    if (this.iterationList.length) {
      // console.log(this.iterationList);
      // console.log({ completed, current, iterationIndex });
      this.form.setValue({
        iteration: this.iterationList[iterationIndex].id,
      });
      this.updateIssues();
    }
  }

  updateIssues() {
    // console.log(this.board);
    if (!this.board.projectNext.items.nodes) return;
    const issues = this.board.projectNext.items.nodes.filter((f: any) => {
      // return true
      const iterationField = f.fieldValues.nodes.find((r: any) => {
        return r.projectField.name === this.board.setting?.iteration;
      });
      // console.log(iterationField)
      return iterationField?.value === this.form.value.iteration;
    });
    this.issues = new IssuesCollection(issues);
  }
}
