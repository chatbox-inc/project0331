import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthState } from '@store/auth/auth.state';
import { BoardsAction } from '@store/boards/boards.action';
import { BoardsState } from '@store/boards/boards.state';
import { AuthStateModel } from '@store/auth/auth.interface';
import { BoardsStateModel } from '@store/boards/boards.interface';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
})
export class IndexPageComponent implements OnInit {
  @Select(AuthState) auth$: Observable<AuthStateModel>;

  @Select(BoardsState) boards$: Observable<BoardsStateModel>;

  form = new FormGroup({
    url: new FormControl('', Validators.required),
  });

  get url(): FormControl {
    return this.form.get('url') as FormControl;
  }

  constructor(private readonly router: Router, private readonly store: Store) {}

  ngOnInit(): void {}

  #getOrgByUrl() {
    return this.url.value.split('/')[4];
  }

  #getBoardNumberByUrl() {
    return this.url.value.split('/')[6];
  }

  open() {
    if (this.form.invalid) return;
    const org = this.#getOrgByUrl();
    const number = this.#getBoardNumberByUrl();
    const action$ = this.store.dispatch(
      new BoardsAction.addOrgProject(org, parseInt(number)),
    );
    action$.subscribe({
      next: () => {
        this.router.navigateByUrl(`/boards/org/${org}/${number}`);
      },
      error: (e) => {
        console.error(e);
        alert('cant fetch repository information');
      },
    });
  }

  navigate(board: any) {
    console.log({ board });
    this.router.navigateByUrl(`/boards/org/${board.name}/${board.number}`);
  }
}
