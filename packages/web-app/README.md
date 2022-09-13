# GYAVA@web-app

[![Netlify Status](https://api.netlify.com/api/v1/badges/d5c5ade9-a328-4f44-a306-9861a4c54d1c/deploy-status)](https://app.netlify.com/sites/gyava/deploys)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

[netlify](https://gyava.netlify.app)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## GraphQL
- write *.graphql files in the `packages/web-app/src/queries/who-am-i.graphql` directory
- Run `npm run codegen`
- generate to `packages/web-app/src/generated/graphql.ts`
- Create function on `packages/web-app/src/app/service/github-graphql.service.ts` from generated TS codes on `src/generated/graphql.ts`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
