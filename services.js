// MPLS Dog Boarding: services estimate page

var services = [
  { key: 'boarding', name: 'Boarding', price: 75 },
  { key: 'daycare', name: 'Daycare', price: 45 },
  { key: 'grooming', name: 'Grooming', price: 60 },
  { key: 'training', name: 'Training', price: 50 },
  { key: 'webcam', name: 'Webcam Access', price: 10 },
  { key: 'taxi', name: 'Pet Taxi', price: 25 },
  { key: 'gift', name: 'Gift Cards', price: 50 },
  {
    key: 'member',
    name: 'Memberships',
    price: 30,
    details: 'Membership benefits and terms have not been provided. Call to confirm what is included.'
  }
];

var sizeFactors = {
  small: 1,
  medium: 1,
  large: 1.1,
  'extra-large': 1.2
};

var dogs = [];
var nextDogId = 1;
var dogsList = document.getElementById('dogs-list');
var dogTemplate = document.getElementById('dog-template');
var estimateBreakdown = document.getElementById('estimate-breakdown');
var estimateTotal = document.getElementById('estimate-total');
var estimateNote = document.getElementById('estimate-note');
var resetDialog = document.getElementById('reset-dialog');

function formatPrice(amount) {
  return '$' + amount.toFixed(2);
}

function findDog(id) {
  return dogs.find(function (dog) {
    return dog.id === id;
  });
}

function createServiceOption(service, dogId) {
  var wrapper = document.createElement('div');
  var label = document.createElement('label');
  var checkbox = document.createElement('input');
  var name = document.createElement('span');
  var price = document.createElement('span');

  wrapper.className = 'service-option-wrap';
  label.className = 'service-option';
  checkbox.type = 'checkbox';
  checkbox.id = 'dog-' + dogId + '-service-' + service.key;
  checkbox.dataset.serviceKey = service.key;
  name.textContent = service.name;
  price.className = 'service-price';
  price.textContent = formatPrice(service.price);

  label.appendChild(checkbox);
  label.appendChild(name);
  label.appendChild(price);
  wrapper.appendChild(label);

  if (service.details) {
    var details = document.createElement('p');
    details.className = 'service-details';
    details.textContent = service.details;
    wrapper.appendChild(details);
  }

  return wrapper;
}

function addDog() {
  var dog = {
    id: nextDogId,
    name: '',
    size: '',
    services: []
  };
  nextDogId += 1;
  dogs.push(dog);

  var fragment = dogTemplate.content.cloneNode(true);
  var card = fragment.querySelector('.dog-card');
  var number = card.querySelector('[data-dog-number]');
  var nameInput = card.querySelector('[data-dog-name]');
  var nameLabel = card.querySelector('[data-name-label]');
  var sizeSelect = card.querySelector('[data-dog-size]');
  var sizeLabel = card.querySelector('[data-size-label]');
  var serviceOptions = card.querySelector('[data-service-options]');

  card.dataset.dogId = dog.id;
  number.textContent = dog.id;
  nameInput.id = 'dog-' + dog.id + '-name';
  nameLabel.htmlFor = nameInput.id;
  sizeSelect.id = 'dog-' + dog.id + '-size';
  sizeLabel.htmlFor = sizeSelect.id;

  services.forEach(function (service) {
    serviceOptions.appendChild(createServiceOption(service, dog.id));
  });

  dogsList.appendChild(fragment);
  renderEstimate();
}

function getDogSubtotal(dog) {
  return dog.services.reduce(function (sum, serviceKey) {
    var service = services.find(function (item) {
      return item.key === serviceKey;
    });
    return sum + (service ? service.price : 0);
  }, 0);
}

function renderDog(dog, card) {
  var selectedList = card.querySelector('[data-selected-services]');
  var dogTotal = card.querySelector('[data-dog-total]');
  var dogNote = card.querySelector('[data-dog-note]');
  var subtotal = getDogSubtotal(dog);

  selectedList.replaceChildren();

  dog.services.forEach(function (serviceKey) {
    var service = services.find(function (item) {
      return item.key === serviceKey;
    });
    if (!service) {
      return;
    }

    var item = document.createElement('li');
    var description = document.createElement('span');
    var removeButton = document.createElement('button');

    description.textContent = service.name + ' - ' + formatPrice(service.price);
    removeButton.type = 'button';
    removeButton.className = 'remove-service';
    removeButton.dataset.removeService = service.key;
    removeButton.textContent = 'Remove ' + service.name;
    item.appendChild(description);
    item.appendChild(removeButton);
    selectedList.appendChild(item);
  });

  if (dog.size) {
    dogTotal.textContent = formatPrice(subtotal * sizeFactors[dog.size]);
    dogNote.textContent = dog.services.length
      ? 'Estimate uses the selected size category and listed service prices.'
      : 'Choose at least one service to build this estimate.';
  } else {
    dogTotal.textContent = 'Choose size';
    dogNote.textContent = 'Choose a size to calculate this dog\'s estimate.';
  }
}

function renderEstimate() {
  var cards = dogsList.querySelectorAll('.dog-card');
  var allSizesSelected = dogs.length > 0;
  var combinedTotal = 0;

  estimateBreakdown.replaceChildren();

  dogs.forEach(function (dog, index) {
    var card = dogsList.querySelector('[data-dog-id="' + dog.id + '"]');
    if (card) {
      renderDog(dog, card);
    }

    var item = document.createElement('li');
    var dogName = dog.name.trim() || 'Dog ' + (index + 1);
    var amount = dog.size
      ? formatPrice(getDogSubtotal(dog) * sizeFactors[dog.size])
      : 'Choose size';

    item.textContent = dogName + ': ' + amount;
    estimateBreakdown.appendChild(item);

    if (dog.size) {
      combinedTotal += getDogSubtotal(dog) * sizeFactors[dog.size];
    } else {
      allSizesSelected = false;
    }
  });

  estimateTotal.textContent = allSizesSelected
    ? formatPrice(combinedTotal)
    : 'Complete size selections';
  estimateNote.textContent = dogs.length
    ? (allSizesSelected
      ? 'Estimate only; confirm final service details and availability by phone.'
      : 'Choose a size for each dog to calculate the combined estimate.')
    : 'Add a dog to build an estimate.';

  if (cards.length !== dogs.length) {
    console.warn('Dog estimate cards and data are out of sync.');
  }
}

dogsList.addEventListener('change', function (event) {
  var card = event.target.closest('.dog-card');
  if (!card) {
    return;
  }

  var dog = findDog(Number(card.dataset.dogId));
  if (!dog) {
    return;
  }

  if (event.target.matches('[data-dog-name]')) {
    dog.name = event.target.value;
  } else if (event.target.matches('[data-dog-size]')) {
    dog.size = event.target.value;
  } else if (event.target.matches('[data-service-key]')) {
    var serviceKey = event.target.dataset.serviceKey;
    if (event.target.checked && !dog.services.includes(serviceKey)) {
      dog.services.push(serviceKey);
    } else if (!event.target.checked) {
      dog.services = dog.services.filter(function (key) {
        return key !== serviceKey;
      });
    }
  }

  renderEstimate();
});

dogsList.addEventListener('click', function (event) {
  var removeService = event.target.closest('[data-remove-service]');
  var removeDog = event.target.closest('[data-remove-dog]');
  var card = event.target.closest('.dog-card');

  if (!card) {
    return;
  }

  var dogId = Number(card.dataset.dogId);
  var dog = findDog(dogId);

  if (removeService && dog) {
    dog.services = dog.services.filter(function (key) {
      return key !== removeService.dataset.removeService;
    });
    var checkbox = card.querySelector('[data-service-key="' + removeService.dataset.removeService + '"]');
    if (checkbox) {
      checkbox.checked = false;
    }
    renderEstimate();
  } else if (removeDog && dog) {
    dogs = dogs.filter(function (item) {
      return item.id !== dogId;
    });
    card.remove();
    renderEstimate();
  }
});

document.getElementById('add-dog').addEventListener('click', addDog);

document.getElementById('check-dates').addEventListener('click', function () {
  var dropOff = document.getElementById('drop-off').value;
  var pickUp = document.getElementById('pick-up').value;
  var status = document.getElementById('availability-status');

  status.classList.remove('is-error');
  if (!dropOff || !pickUp) {
    status.textContent = 'Enter both a drop-off date and a pick-up date.';
    status.classList.add('is-error');
    return;
  }

  if (pickUp < dropOff) {
    status.textContent = 'Pick-up must be on or after drop-off. Please correct the dates.';
    status.classList.add('is-error');
    return;
  }

  status.textContent = 'The date order is valid, but live availability cannot be confirmed here. Call (612) 555-0142 to check these dates.';
});

document.getElementById('reset').addEventListener('click', function () {
  resetDialog.showModal();
});

resetDialog.addEventListener('close', function () {
  if (resetDialog.returnValue !== 'clear') {
    return;
  }

  dogs = [];
  nextDogId = 1;
  dogsList.replaceChildren();
  document.getElementById('drop-off').value = '';
  document.getElementById('pick-up').value = '';
  document.getElementById('availability-status').textContent = 'Availability is not connected to this estimator. Contact us to confirm dates.';
  document.getElementById('availability-status').classList.remove('is-error');
  addDog();
});

addDog();
