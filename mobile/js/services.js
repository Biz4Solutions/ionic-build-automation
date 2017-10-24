angular.module('ionic-demo.services', [])

/**
 * A simple Menu service that returns mock data
 */
.factory('MenuService', function() {

  var menu = [
      {id: 121, name: 'French Fries', price: 8.99},
      {id: 122, name: 'Veg Spinach Burger', price: 1.99},
	  {id: 123, name: 'Italian Pasta', price: 10.99},
	  {id: 124, name: 'Venila Ice-cream', price: 1.99},
	  {id: 125, name: 'Choco Lava Cake', price: 2.00},
	  {id: 125, name: 'Pizza Margherita Large', price: 10.00},
  ];
  
  var service = {
	getMenu: getMenu
  }
  
  return service;

  function getMenu() {
	  return menu;
  }
  
});
