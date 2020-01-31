# MSSE663S8W1GroupProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Features for the App
1. Log in Feature

  a. Register new user
    Form for user to enter login and password
    correspodning fields in data  base for each user
    
      funcitonality: should be able to enter new user and password
      should  be able to check if unique user (so as to not have two that are the same)
      should be able to save it in the data base when user clicks submit
      
   b. returning customer log in
      Form for user to enter login and password
      
      functionality should verify that it is a valid user and
      load the user's specific recipe book when hit submit
      
   c. retrieve password
      need user form to unter user name or email, security quesitons (however we decide to do this)
      Should be able to get new password and change the database for the updated password
      
2. User Enter Recipes

    a. create new recipe
    Form for user to enter recipes with (some of these may be set as a series of options they select from)
    
        name
        type (meal type such as soup or main)
        ingredients
        picture
        instrucitons
        equipment
        prep-time
        cook-time
        
    Corresponding data base fields for the above
    
    funcitonality--should save in data base
    
    b. update recipe
      shoulld pull up the saved recipe and allow changes
      save changes to data base upon submit
      
    c. delete recipe
        should be able to pull up recipe and delete it
        should delete in data base
        
  3. search for.view recipes
  
      user needs a search for keyword option or search based upon recipe name
      needs to find in data base
      display recipes with searched for term
  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
