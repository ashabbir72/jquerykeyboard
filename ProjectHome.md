Плагин позволяет устанавливать действия в ответ на нажатия определённых клавиш клавиатуры:
```
$(document).ready(function () {
	var $ta = $('textarea');
	var log = function (msg) {
		$ta.val($ta.val() + ' ' + msg + '\n');
		return this;
	};

	$ta
		.keyboard(
			'z+(fkeys)',
			{
				preventDefault : true
			},
			function () {
				log('«z+(fkeys)[pd]»');
			}
		)
		.keyboard(
			'alt' ,
			{
				event: 'keyup'
			},
			function () {
				log('«alt[ku]»');
			}
		)
		.keyboard(
			'ctrl+v',
			{
				preventDefault : true
			},
			function () {
				log('«ctrl+v[pd]»');
			}
		)
		.keyboard(
			'm n, k+t',
			{
				strict : false
			},
			function () {
				log('«m n, k+t[ns]»');
			}
		)
		.keyboard(
			'n1 (letters), x+z',
			function () {
				log('«n1 (letters), x+z»');
			}
		)
		.keyboard(
			'z+x+c, shift+[space|(letters)|(n3-n6)|(fkeys)]',
			function (e, bind) {
				console.dir(bind);
				log('«z+x+c, shift+[space|(letters)|(n3-n6)|(fkeys)]»');
			}
		)
		.keyboard(
			'shift ctrl',
			function () {
				log('«shift ctrl»');
			}
		)
		.keyboard(
			'a s, d f',
			function () {
				log('«a s, d f»');
			}
		);

	$
		.keyboard(
			'q',
			{
				event : 'keyup'
			},
			function () {
				log('doc:«q[ku]»');
			}
		)
		.keyboard(
			'w',
			{
				preventDefault : true
			},
			function () {
				log('doc:«w[pd]»');
			}
		);
});

```