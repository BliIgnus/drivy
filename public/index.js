'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];


function splitCommission(entry, priceWODeductible) {

    var totalCommission = priceWODeductible * 0.3;
    console.log("Total commission : " + totalCommission);

    entry.commission.insurance = totalCommission * 0.5;
    console.log("Insurance commission : " + entry.commission.insurance);
    totalCommission -= entry.commission.insurance;

    entry.commission.assistance = 1;
    console.log("Assistance commission : " + entry.commission.assistance);
    totalCommission -= entry.commission.assistance;

    entry.commission.drivy = totalCommission;
    console.log("Drivy commission : " + entry.commission.drivy);

    var checkSum = entry.commission.insurance + entry.commission.assistance + entry.commission.drivy;
    console.log("Total commission check sum : " + checkSum);
}


function generatePricePerDriver(entry) {

  var priceDaily = 0;
  var priceKm = 0;

  for(var car in cars) {
    if(entry.carId==  cars[car].id) {
      console.log("Car : " + cars[car].id);
      priceDaily = cars[car].pricePerDay;
      console.log("Price day : " + priceDaily);
      priceKm = cars[car].pricePerKm;
      console.log("Price km : " + priceKm);
    }
  }

  var puDate = entry.pickupDate.split("-");
  var retDate = entry.returnDate.split("-");
  var nDaysRent = (new Date(retDate[0], retDate[1], retDate[2]) - new Date(puDate[0], puDate[1], puDate[2]))/86400000 + 1;
  console.log("Time : " + nDaysRent);
  if(nDaysRent > 10) {
    priceDaily = 0.5 * priceDaily;
    console.log("Discount -50% new price per day : " + priceDaily);
  }
  else if(nDaysRent > 4) {
    priceDaily = 0.7 * priceDaily;
    console.log("Discount -30% new price per day : " + priceDaily);
  }
  else if(nDaysRent > 1) {
    priceDaily = 0.9 * priceDaily;
    console.log("Discount -10% new price per day : " + priceDaily);
  }

  var basePrice = priceDaily * nDaysRent + entry.distance * priceKm;
  console.log("Base price : " + basePrice);

  splitCommission(entry, basePrice);

  var deductiblePrice = 0;
  if(entry.options.deductibleReduction==true) {
    deductiblePrice = 4 * nDaysRent;
    console.log("Deductible option taken. Extra price : +" + deductiblePrice);
  }

  entry.price = basePrice + deductiblePrice;
  console.log("Total price : " + entry.price);
  console.log("");

  payTheActors(entry, basePrice, deductiblePrice);

}


function payTheActors(entry, basePrice, deductiblePrice) {
  for(var bill in actors) {
    if(actors[bill].rentalId==entry.id) {

      for(var actor in actors[bill].payment) {
        switch (actors[bill].payment[actor].who) {
          case "driver":
            actors[bill].payment[actor].amount = entry.price;
            break;

          case "owner":
            actors[bill].payment[actor].amount = basePrice * 0.7;
            break;

          case "insurance":
            actors[bill].payment[actor].amount = entry.commission.insurance;
            break;

          case "assistance":
            actors[bill].payment[actor].amount = entry.commission.assistance;
            break;

          case "drivy":
            actors[bill].payment[actor].amount = entry.commission.drivy + deductiblePrice;
            break;

          default:
        }
      }
    }
  }
}


function process() {
  rentals.forEach(rentProcess);

  function rentProcess(entry) {
    generatePricePerDriver(entry);
  }
}

process();


console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
