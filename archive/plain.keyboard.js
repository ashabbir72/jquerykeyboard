$sh.keyboard = {
	office : {
		pressed  : {},
		funcs    : {},
		getKeyCodes : function (keys) {
			// ['shift', 'ctrl'] => [16, 17]
			var keycodes = [];
			if (typeof keys == 'string') {
				keys = [keys];
			}
			for (var i in keys) {
				if (typeof keys[i] == 'string') {
					if ($sh.keyboard.office.keys[keys[i]]) {
						keycodes.push($sh.keyboard.office.keys[keys[i]]);
					} else {
						throw 'No such index: «' + keys[i] + '»';
					}
				} else if (typeof keys[i] == 'number') {
					keycodes.push(keys[i]);
				} else {
					throw 'Wrong key type: «' + (typeof keys[i]) + '»';
				}
			}
			return keycodes.sort();
		},
		checkKeys : function (keys, single) {
			var pressed = $sh.keyboard.office.pressed;

			var arrayHas = function (array, value) {
				for (var i in array) {
					if (value == array[i]) {
						return true;
					}
				}
				return false;
			}

			// Checkes if all keys, we need, are pressed
			for (var i in keys) {
				if (!pressed[keys[i]]) {
					return false;
				}
			}

			// Checkes if no other keys are pressed
			if (single) {
				for (var k in pressed) {
					if (pressed[k] && !arrayHas(keys, k)) {
						return false;
					}
				}
			}

			return true;
		},
		checkBinds : function () {
			var funcs = $sh.keyboard.office.funcs;
			var check = $sh.keyboard.office.checkKeys;
			for (var i in funcs) {
				var bind = funcs[i];
				if (bind && check(bind.keys, bind.single)) {
					bind.fn();
				}
			}
			return true;
		},
		set : function (e, value) {
			var kc = e.keyCode;
			var values = {};
			var keys   = $sh.keyboard.office.keys;
			values[kc] = value;
			values[keys.ctrl]  = (kc == keys.ctrl  ? 1 : 0) || e.ctrlKey;
			values[keys.alt]   = (kc == keys.alt   ? 1 : 0) || e.altKey;
			values[keys.shift] = (kc == keys.shift ? 1 : 0) || e.shiftKey;
			for (var i in values) {
				$sh.keyboard.office.pressed[i] = values[i];
			}
		},
		keys : {
			// Alphabet
			a:65, b:66, c:67, d:68, e:69,
			f:70, g:71, h:72, i:73, j:74,
			k:75, l:76, m:77, n:78, o:79,
			p:80, q:81, r:82, s:83, t:84,
			u:85, v:86, w:87, x:88, y:89, z:90,
			// Controls
			tab:   9, enter:13, shift: 16,
			ctrl: 17, alt:  18, esc:   27, space:32,
			// Arrows
			aLeft:37, aUp:  38, aRight:39, aDown:40
		}
	},
	init : function () {
		$(document).keydown(function (e) {
			$sh.keyboard.office.set(e, 1);
		});
		$(document).keyup(function (e) {
			$sh.keyboard.office.checkBinds();
			$sh.keyboard.office.set(e, 0);
		});
	},
	bind : function (keys, fn, single) {
		var keycodes = $sh.keyboard.office.getKeyCodes(keys);
		$sh.keyboard.office.funcs[keycodes.join('.')] =
			fn ? {keys:keycodes, fn:fn, single:single} : null;
	}
};

// console.log($sh.keyboard.office.pressed);