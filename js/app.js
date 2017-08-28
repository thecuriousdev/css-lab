(function () {

	var cards = [
		{
			title: 'Card House',
			desc: 'Building a card house with CSS Transform and Animation properties',
			src: 'card-house.html'
		},
		{
			title: 'Cube',
			desc: 'Glass Cube using Transform ',
			src: 'cube.html'
		},
		{
			title: 'Type Writter - Animation',
			desc: 'Simulating a type writter kind of animation by using some tricky animation props',
			src: 'type-writter.html'
		},
		{
			title: 'Color Palette - NO JS!',
			desc: 'We don\'t need JS for every interactivity',
			src: 'color-palette.html'
		},
		{
			title: 'Twister',
			desc: 'A fun little animation experiment, Yes its a twister',
			src: 'twister.html'
		}
	];

	function bind () {
		Array.prototype.forEach.call(document.querySelectorAll('.card'), function (node) {
			node.addEventListener('click', openCard);

			node.addEventListener('mouseenter', function () {
				enableAnimation(this.querySelector('iframe'));
			});

			node.addEventListener('mouseleave', function () {
				this.classList.contains('active') || disableAnimation(this.querySelector('iframe'));
			});
		});

		document.querySelector('.back').onclick = function () {
			this.classList.add('no-animation');
			document.body.classList.remove('open-card');

			var activeCard = document.querySelector('.card.active');
			activeCard.classList.remove('active');

			disableAnimation(activeCard.querySelector('iframe'));
		}

		// Disable animations for performance
		Array.prototype.forEach.call(document.querySelectorAll('.card iframe'), function (iframe) {
			iframe.onload = function () { disableAnimation(this); };
		});
	}

	function openCard () {
		document.body.classList.add('open-card');
		this.classList.add('active');
	}

	function disableAnimation (iframe) {
		var disableStyle = document.createElement('style');

		disableStyle.id = 'disable-animation';
		disableStyle.innerHTML = '*, *::before, *::after { animation-play-state: paused !important; }';

		iframe.contentDocument.querySelector('head').appendChild(disableStyle);
	}

	function enableAnimation (iframe) {
		var style = iframe.contentDocument.querySelector('#disable-animation');

		style && style.parentElement.removeChild(style);
	}

	function render () {
		var $container = document.querySelector('section');

		cards.forEach(function (card) {
			var $card = document.createElement('div');
			$card.className = 'card';

			$card.innerHTML = '<h3><span>1.</span>'+ card.title +'</h3>'
							 + '<iframe src="partials/'+ card.src +'" frameborder="0" scrolling="no" sandbox="allow-scripts allow-pointer-lock allow-same-origin"></iframe>'
							 + '<div class="overlay"><div class="tooltip">'+ card.desc +'</div></div>';

			$container.appendChild($card);
		});
	}

	function init () {
		render();
		bind();
	}

	init();

})();