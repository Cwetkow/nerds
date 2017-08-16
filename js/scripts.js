
var btn = document.querySelector(".map .btn");
var form = document.querySelector(".map .feedback-form");
var close = document.querySelector(".feedback-form-close");
var closebtn = form.querySelector(".feedback-form .btn-gray");
var name = form.querySelector("[name=name]");
var email = form.querySelector("[name=email]");
var text = form.querySelector("[name=text]");
var storage1 = localStorage.getItem("name");
var storage2 = localStorage.getItem("email");

// open Feedback modal form
btn.addEventListener("click", function(event) {
  event.preventDefault();
  form.classList.add("feedback-form-show");

  if (storage1) {
    name.value = storage1;
  }

  if (storage2) {
    email.value = storage2;
  }
});

// close Feedback modal form when clicked on .feedback-form-close
close.addEventListener("click", function() {
  form.classList.remove("feedback-form-show");
  form.classList.remove("form-error");
});

// close Feedback modal form when clicked on .btn-gray
closebtn.addEventListener("click", function(event) {
  event.preventDefault();
  form.classList.remove("feedback-form-show");
  form.classList.remove("form-error");
});

// close Feedback modal form when clicked on key Escape
window.addEventListener("keydown", function(event){
  if (event.keyCode === 27) {
    if (form.classList.contains("feedback-form-show")) {
      form.classList.remove("feedback-form-show");
      form.classList.remove("form-error");
    }
  }
});

// Checking values and sending data
form.addEventListener("submit", function(event) {
  if (!name.value || !email.value || !text.value) {
    event.preventDefault();
    form.classList.remove("form-error");
    form.offsetWidth = form.offsetWidth;
    form.classList.add("form-error");
  } else {
    localStorage.setItem("name", name.value);
    localStorage.setItem("email", email.value);
  }
});

// Modal window map
function initialize() {
  var mapOptions = {
    scrollwheel: false,
    zoom: 17,
    center: new google.maps.LatLng(59.9389678,30.320000)
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);
  var image = 'img/marker.png';
  var myLatLng = new google.maps.LatLng(59.9387100,30.323800);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image
  });
}
google.maps.event.addDomListener(window, 'load', initialize);


// ---------- noUiSlider parametres-----------

var keypressSlider = document.getElementById('keypress');
var input0 = document.getElementById('input-with-keypress-0');
var input1 = document.getElementById('input-with-keypress-1');
var inputs = [input0, input1];

noUiSlider.create(keypressSlider, {
	start: [0, 15000],
	connect: true,
	step: 1000,
	range: {
		'min': 0,
		'max': 20000
	}
});

keypressSlider.noUiSlider.on('update', function( values, handle ) {
	inputs[handle].value = values[handle];
});

function setSliderHandle(i, value) {
	var r = [null,null];
	r[i] = value;
	keypressSlider.noUiSlider.set(r);
}

// Listen to keydown events on the input field.
inputs.forEach(function(input, handle) {

	input.addEventListener('change', function(){
		setSliderHandle(handle, this.value);
	});

	input.addEventListener('keydown', function( e ) {

		var values = keypressSlider.noUiSlider.get();
		var value = Number(values[handle]);

		// [[handle0_down, handle0_up], [handle1_down, handle1_up]]
		var steps = keypressSlider.noUiSlider.steps();

		// [down, up]
		var step = steps[handle];

		var position;

		// 13 is enter,
		// 38 is key up,
		// 40 is key down.
		switch ( e.which ) {

			case 13:
				setSliderHandle(handle, this.value);
				break;

			case 38:

				// Get step to go increase slider value (up)
				position = step[1];

				// false = no step is set
				if ( position === false ) {
					position = 1;
				}

				// null = edge of slider
				if ( position !== null ) {
					setSliderHandle(handle, value + position);
				}

				break;

			case 40:

				position = step[0];

				if ( position === false ) {
					position = 1;
				}

				if ( position !== null ) {
					setSliderHandle(handle, value - position);
				}

				break;
		}
	});
});