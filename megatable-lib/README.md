# Megatable

General purpose data table component based on @angular/material and @angular/cdk.

This table component is designed to provide the features that cover most uses of displaying a flexible table in an Angular app.

## Install
* ```npm install --save megatable @angular/material @angular/cdk hammerjs```
* Add an Angular Material Theme to your projects styles.css e.g. ```@import "~@angular/material/prebuilt-themes/indigo-pink.css";```
## Features

* Data source can be a ```YourDataType[]``` or ```Observable<YourDataType[]>```
* Events for row click, hover, selection change
* Ability for the user to re-order columns via Drag n Drop

## TODO

* Column filters
* Global filter
* Ability to persist settings, filters, sort etc.,
* Implement event emitters
* Rich filter expression language
* Custom cell renderer via user function
* Data updates to individual rows

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
