# What Have We Learned About Angular?

## Controller

A controller is userd to set the state and add behavior to a page.
Helps us get data on to the page.
This means that if you're making a todo list, you would create an array of todos in a controller that would be appended to a page.
The controller itself foes not append the todos, it simply houses them for another component to use.
Store data. Pass it to the view.
Has a view.


## View

The page these todos will be appended to is called a view. A view is just an HTML file.
However, in angular we can augment the functionality of HTML by using directives.
Has a controller.
To get the view to know about the controller we use the 'ng-controller' directive on our page container.


## Directives

Just think of directives as custom HTML that we can use to manipulate the DOM. You attach click handlers in the directive. Append list items...
Use directives to manipulate the DOM on the page.
"It's how we bind the behavior."
HTML annotations that trigger javascript behaviors.

    <body ng-app="Todo">
is a directive. And initializes the view.

### ng-repeat directive

    <ul class="todo-list" ng-repeat="todo in todos track by $index"></ul>
This allows us to bind multiple items that are organized in a list or an object to the view.
"todo in todos track by $index" -We specify that we are binding the todos by using an expression.
it is telling Angular that each item in the array is a todo.
"track by index" -so there are no issues with dublicate entries.
Then set up a template.

## Services
Services give your controller additional functionality like,

fetching JSON data from a web service with `$http`

log messages to the js console with `$log`

Filter an array with `$filter`

### $http

`$http` service is how we make an async request to a server.

    $http({method: 'GET', url: '/products.json'});
or

    $http.get('/products.json', {apiKey: 'myApiKey'});

both return a Promise object with `.success()` and `.error()`

If we tell `$http` to fetch JSON, the result will be automatically decoded into JavaScript objects and arrays

    app.controller('someController', ['$http', '$log', function($http, $log){

    }]);

example

    app.controller('storeController', ['$http', function($http){
        var store = this;

        store.products = [];

        $http.get('/products.json').success(function(data){
            store.products = data;
        });

    }]);

In addition to `get()` requests, `$http` can `post()`, `put()`, `delete()`

    $http.post('/path/to/resource.json', {param: 'value'});
    $http.delete('/path/to/resource.json');


## Modules
They are used to hold onto our controllers and other relevant code about our application.
Also helps keep the code we write from being declared at the global scope.


## Putting it together.

With Angular we declare that there is a click event on the element, but write the logic in the controller.
This is referred to as declaritive programming.


## Declaritive Programming

We express that our element does something without defining the functionality within it.

## Dependency Injection
$scope injects the scope into the module.
Dollar sign indicates that it is a core service of the Angular framework and it will resolve it for us.
$scope is the link between our controller and our view.
The process of adding it to the page is called data binding.

## Disection
###var app = angular.module('store', ['store-products']);
`angular` = angular

`'store'` = application name

`['store-products']` = dependencies

###ng-app="Todo" = directive creates an ang app by running this module when the doc loads.
attach the Application module to the page
treats the html inside as part of the angular app

###ng-controller="StoreController as store"
`ng-controller` = directive
`StoreController` = Controller name
`store` = Alias
`store.product.price` expression that accesses the data.

###ng-show/hide
`ng-hide="product.soldOut"` - hide if true

`ng-show="product.canPurchase"` - show if true

`ng-repeat="product in store.products"` = repeats for as many products as we have

image source

```
        <img ng-src="{{product.images[0].full}}"/>
```

## Filters
    <h2>{{product.price | currency}}</h2> - currency
    <h2>{{product.releaseDate | date:'MM/dd/yyy @ h:mma'}}</h2> - date
    <h2>{{product.name | uppercase}}</h2>
    <h2>{{product.description | limitTo:8}}</h2>

`ng-repeat="product in store.products | limitTo:3"`

`ng-repeat="product in store.products | orderBy'-price'"`

### Tabs
clicking on the tab sets the value of "tab"

    <section ng-init="tab=1">
    <li><a href ng-click="tab = 1">Description</a></li>
    <li><a href ng-click="tab = 2">Specs</a></li>
    <li><a href ng-click="tab = 3">Reviews</a></li>


### ng-class - conditionally sets the class
clicking on the tab sets the value of "tab"

    <section ng-init="tab=1">
    <li ng-class="{ active:tab === 1 }" ><a href ng-click="tab = 1">Description</a></li>
    <li ng-class="{ active:tab === 2 }" ><a href ng-click="tab = 2">Specs</a></li>
    <li ng-class="{ active:tab === 3 }" ><a href ng-click="tab = 1">Reviews</a></li>

if the tab is = to 1, set the class to active
`ng-class="{ active:tab === 1 }"`

this is too dirty too much logic in the html

cleaner

    <section ng-controller="PanelController as panel">
        <ul>
            <li ng-class="{ active:panel.isSelected(1) }" ><a href ng-click="panel.selectTab(1)">Description</a></li>

in the controller

    this.tab = 1;

    this.selectTab = function(setTab){
        this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
        return this.tab === checkTab;
    };


## Forms
`ng-model` - binds the form element value to the property checkbox or radio buttons to the value selected
`ng-submit` - action to take on submit

    <form name="reviewForm" ng-controller="ReviewController as reviewCtrl"
                            ng-submit="reviewCtrl.addReview(product)">
    </form>

the controller

    app.controller("ReviewController", function(){
        this.review = {};

        this.addReview = function(product) {
            product.reviews.push(this.review); // this is to add it to an array.
            this.review = {};
        };
    });

### Validations

    <form name="reviewForm" ng-controller="ReviewController as reviewCtrl"
                            ng-submit="reviewForm.$valid && reviewCtrl.addReview(product)" novailidate>
        <select ng-model="reviewCrtl.reviews.stars" required>
            <option value=""></option>
            ...
        </select>
    </form>

`novalidate` - So html5 doesn't validate
`required` - makes the input required
`reviewForm.$valid` - checks if the review form is valid. $valid is provided by angular

Classes added to form elements by angular
`.ng-valid`    - form input has been validated by angular
`.ng-invalid`  - angular validates the form el, example, email
`.ng-dirty`    - added to the input after it has been used
`.ng-pristine` - before the element has been typed in

Adding dirty prevents the red border until it has been typed in.

    .ng-invalid.ng-dirty {
        border-color: red;
    }

    .ng-valid.ng-dirty {
        border-color: green;
    }

Validate types - email, url, number(min=1 max=10)

## Custom Directives

### Element Directive
Use when making UI widgets

HTML

    <product-title></product-title>

JavaScript

    app.directive('productTitle', function(){
        return {
            restrict: 'E'
            templateUrl: 'product-title.html'
        }
    });

"product-title" changes to "productTitle" in the javascript.
"restrict: 'E'" Type of Directive "E" for element.

### Attribute Directive
 Use when making Attribute directives for mixin behaviors... like a tooltip

HTML

    <h3 product-title></h3>

JavaScript

    app.directive('productTitle', function(){
        return {
            restrict: 'A'
            templateUrl: 'product-title.html'
        }
    });

### To add in the controller alias

    <product-panels></product-panels>

    app.directive('productTitle', function(){
        return {
            restrict: 'E'
            templateUrl: 'product-title.html'
        },
        controllerAs: 'panels'
    });