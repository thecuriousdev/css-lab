(function () {

	function bind () {
		Array.prototype.forEach.call(document.querySelectorAll('.card'), function (node) {
			node.addEventListener('click', openCard);
		});

		document.querySelector('.back').onclick = function () {
			this.classList.add('no-animation');
			document.body.classList.remove('open-card');
			document.querySelector('.card.active').classList.remove('active');
		}
	}

	function openCard () {
		document.body.classList.add('open-card');
		this.classList.add('active');
	}

	function init () {
		bind();
	}

	init();

})();