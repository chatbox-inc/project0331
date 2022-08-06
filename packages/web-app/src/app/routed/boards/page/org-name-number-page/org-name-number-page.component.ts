import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinct, first, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { BoardsAction } from '@store/boards/boards.action';
import { BoardsState } from '@store/boards/boards.state';
import { BoardsStateModel, BoardItemStateModel } from '@store/boards/boards.interface';

@Component({
  selector: 'app-org-name-number-page',
  templateUrl: './org-name-number-page.component.html',
  styleUrls: ['./org-name-number-page.component.scss'],
})
export class OrgNameNumberPageComponent implements OnInit {
  @Select(BoardsState) boards$: Observable<BoardsStateModel>;

  public board: BoardItemStateModel | null = null;

  public form = new FormGroup({
    iteration: new FormControl(''),
    sumup: new FormControl(''),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
  ) {}

  get orgName() {
    return this.route.snapshot.paramMap.get('name') as string;
  }

  get number() {
    return parseInt(this.route.snapshot.paramMap.get('number') ?? '');
  }

  get url() {
    return `https://github.com/orgs/${this.orgName}/projects/${this.number}`;
  }

  get settingRequired() {
    return !!this.board?.setting;
  }

  ngOnInit(): void {
    this.boards$
      .pipe(
        first(),
        map((r) => {
          return r.boards.find((board) => {
            return (
              board.type === 'org' &&
              board.name === this.orgName &&
              board.number === this.number
            );
          });
        }),
      )
      .subscribe((r) => {
        if (!r) return;
        this.board = r;
        if (!this.board.setting) return;
        this.form.setValue({
          ...this.board.setting,
        });
      });

    this.form.valueChanges
      .pipe(
        first(),
        map((r) => JSON.stringify(r)),
        distinct(),
        map((r) => JSON.parse(r)),
      )
      .subscribe((r) => {
        this.store.dispatch(
          new BoardsAction.updateOrgProjectSetting(
            this.orgName,
            this.number,
            r,
          ),
        );
      });
  }
}
