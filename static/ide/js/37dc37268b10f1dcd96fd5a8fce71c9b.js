// bundle: iframelogin___d926a61fd77d189812c53d1d8d8c0afb_m
// files: jquery.ba-postmessage.min.js, iFrameLogin.js

// jquery.ba-postmessage.min.js
/*
 * jQuery postMessage - v0.5 - 9/11/2009
 * http://benalman.com/projects/jquery-postmessage-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
;(function ($) {
	var g,
		d,
		j = 1,
		a,
		b = this,
		f = !1,
		h = 'postMessage',
		e = 'addEventListener',
		c,
		i = b[h] && !$.browser.opera
	$[h] = function (k, l, m) {
		if (!l) {
			return
		}
		k = typeof k === 'string' ? k : $.param(k)
		m = m || parent
		if (i) {
			m[h](k, l.replace(/([^:]+:\/\/[^\/]+).*/, '$1'))
		} else {
			if (l) {
				m.location = l.replace(/#.*$/, '') + '#' + +new Date() + j++ + '&' + k
			}
		}
	}
	$.receiveMessage = c = function (l, m, k) {
		if (i) {
			if (l) {
				a && c()
				a = function (n) {
					if ((typeof m === 'string' && n.origin !== m) || ($.isFunction(m) && m(n.origin) === f)) {
						return f
					}
					l(n)
				}
			}
			if (b[e]) {
				b[l ? e : 'removeEventListener']('message', a, f)
			} else {
				b[l ? 'attachEvent' : 'detachEvent']('onmessage', a)
			}
		} else {
			g && clearInterval(g)
			g = null
			if (l) {
				k = typeof m === 'number' ? m : typeof k === 'number' ? k : 100
				g = setInterval(function () {
					var o = document.location.hash,
						n = /^#?\d+&/
					if (o !== d && n.test(o)) {
						d = o
						l({ data: o.replace(n, '') })
					}
				}, k)
			}
		}
	}
})(jQuery) // iFrameLogin.js

typeof Roblox == 'undefined' && (Roblox = {}),
	(Roblox.iFrameLogin = new (function () {
		function n() {
			var v = $(document.body).data('redirecttohttp'),
				e = $(document.body).data('captchaon'),
				s = !1,
				h = !0,
				o = function (n) {
					var t = $(document.body).data('parent-url')
					$.postMessage('resize,' + n, t, parent)
				}
			e ? o('265px') : o('128px')
			var c = function (n) {
					n
						? ($('#LoginButton').hide(), $('#LoggingInStatus').show())
						: ($('#LoginButton').show(), $('#LoggingInStatus').hide())
				},
				y = function () {
					var i = !1,
						t = [$('#Password'), $('#UserName')]
					return (
						e && t.push($('#recaptcha_response_field')),
						jQuery.each(t, function () {
							var t = $(this)
							t.val() == '' ? (n(t, !0), (i = !0)) : n(t, !1)
						}),
						i
					)
				},
				n = function (n, t) {
					;(s = !1),
						c(!1),
						t ? n.css({ 'background-color': '#FDD' }) : n.css({ 'background-color': 'white' })
				},
				l = function () {
					var w
					if (y()) return !1
					if (h) return n($('#UserName'), !0), !1
					;(s = !0), c(!0)
					var b = $('#Password').val(),
						l = $('#UserName').val(),
						p = '',
						a = ''
					if (
						e &&
						((p = $('#recaptcha_challenge_field').val()),
						(a = $('#recaptcha_response_field').val()),
						p == '' || a == '')
					)
						return n($('#recaptcha_response_field'), !0), !1
					e && $('#Captcha_upBadCaptcha').text(''),
						(w = onError =
							function (h) {
								if (h.IsValid)
									if (v) window.location = '/LoginRedirect.aspx'
									else {
										var y = window.parent.location.href
										y.indexOf('#') != -1 && (y = window.parent.location.href.split('#')[0]),
											(y += y.indexOf('?') == -1 ? '?nl=true' : '&nl=true'),
											(window.parent.location = y)
									}
								else
									return h.ErrorCode.indexOf(t) != -1
										? (l != '' && window.location.href.indexOf('username') == -1
												? (window.location.href = window.location.href + '&username=' + l)
												: window.location.reload(),
											!1)
										: (h.ErrorCode.indexOf(r) != -1 &&
												(window.parent.location =
													'/login/twofactorauth?username=' + encodeURIComponent(l)),
											h.ErrorCode.indexOf(i) != -1
												? (n($('#Password'), !0),
													$('#NotAMemberLink').hide(),
													$('#ForgotPasswordLink').show())
												: h.ErrorCode.indexOf(f) != -1
													? (o('145px'), $('#ErrorMessage').text(h.Message))
													: h.ErrorCode.indexOf(u) != -1
														? $('#ErrorMessage').text(h.Message)
														: (o('280px'),
															n($('#Password'), !1),
															$('#Captcha_upBadCaptcha').show(),
															$('#Captcha_upBadCaptcha').css('color', 'red'),
															h.Message == 'incorrect-captcha-sol'
																? $('#Captcha_upBadCaptcha').text(
																		Roblox.iFrameLogin.Resources.invalidCaptchaEntry
																	)
																: $('#Captcha_upBadCaptcha').text(h.Message)),
											e && Recaptcha.reload('t'),
											$('#Password').val(''),
											$('#Password').focus(),
											(s = !1),
											c(!1),
											!1)
							}),
						Roblox.Website.Services.Secure.LoginService.ValidateLogin(l, b, e, p, a, w, onError)
				},
				a = function () {
					var t = $('#UserName').val(),
						i
					;(t = t.replace(/ /g, '')),
						$('#UserName').val(t),
						(i = onError =
							function (t) {
								n($('#UserName'), !t.success),
									(h = !t.success),
									t.success || ($('#NotAMemberLink').show(), $('#ForgotPasswordLink').hide())
							}),
						t != '' &&
							$.ajax({
								type: 'GET',
								url: '/UserCheck/doesusernameexist?username=' + t,
								success: i,
								error: onError
							})
				}
			$('#LoginButton').click(function () {
				l()
			}),
				$('#UserName').blur(function () {
					a()
				}),
				$(document).keydown(function (n) {
					if (n.which == 13 && !s) return l(), !1
				}),
				$(function () {
					var n = 1
					$('input,select').each(function () {
						if (this.type != 'hidden') {
							var t = $(this)
							t.attr('tabindex', n), n++
						}
					})
				}),
				$(function () {
					$('#UserName').val() != '' || $('#UserName').val() != undefined, (h = !1)
				}),
				$(function () {
					$('#CaptchaContainer').css({ 'margin-left': '0', 'margin-top': '8px', width: 'none' })
				})
		}
		var e = '1',
			s = '2',
			f = '3',
			r = '4',
			u = '5',
			t = '6',
			i = '7',
			o = '8'
		return { init: n }
	})())
