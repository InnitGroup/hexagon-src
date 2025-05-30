// bundle: page___cb8083b18c1932dbe3fd213ac4673a4f_m
// files: widgets/tabs.js, extensions/Thumbnails.js, GenericConfirmation.js, IDE/PublishAs.js

// widgets/tabs.js
$(function () {
	function i(n) {
		var t = $(n),
			i = t.parent(),
			r = i.next().children().eq(t.index())
		$.each([t, r], function (n, t) {
			t.addClass('tab-active').siblings().removeClass('tab-active')
		})
	}
	var t = $('.tab-container'),
		n = t.filter('.tab-history-hash'),
		f
	t.children('div').on('click', function () {
		var t = $(this)
		i(this), t.parent().trigger('tabsactivate', { newTab: t })
	})
	if (n.length) {
		function r() {
			return '#' + n.next().children('.tab-active').attr('id')
		}
		function u(t) {
			var r = $(t).index()
			r !== -1 && i(n.children().eq(r))
		}
		window.location.hash ? u(window.location.hash) : (f = r())
		n.on('tabsactivate', function () {
			history.pushState({}, '', r())
		})
		$(window).on('popstate', function () {
			u(window.location.hash ? window.location.hash : f)
		})
	}
}) // extensions/Thumbnails.js

$(function () {
	function i(n) {
		var t = n.el.is('img') ? n.el : n.el.find('img')
		return t.length === 1 ? t : n.el.find('img.original-image')
	}
	function s(n, t) {
		var r = i(t),
			u
		;(u = n.data != null && n.data[0].imageUrl != null ? n.data[0].imageUrl : n.Url),
			!r.attr('src') && r.hasClass('lazy') ? r.attr('data-original', u) : r.attr('src', u),
			t.el.removeAttr('data-retry-url'),
			t.el.trigger('thumbnailLoaded')
	}
	function h(n) {
		var i = +new Date() - n.start
		Roblox.ThumbnailMetrics && Roblox.ThumbnailMetrics.logFinalThumbnailTime(i),
			t(['ThumbnailGenTime', '2D', 'Success', i]),
			t(['ThumbnailGenRetries', '2D', 'Success', n.retryCount])
	}
	function c(n) {
		var i = +new Date() - n.start
		Roblox.ThumbnailMetrics && Roblox.ThumbnailMetrics.logThumbnailTimeout(),
			t(['ThumbnailGenRetries', '2D', 'Gave Up', n.retryCount]),
			t(['ThumbnailGenTime', '2D', 'Gave Up', i])
	}
	function l(n, t) {
		n.Final || (n.data != null && n.data[0].state != null && n.data[0].state === 'Completed')
			? (t.realRegeneration && h(t), s(n, t))
			: ((t.realRegeneration = !0),
				t.retryCount++,
				t.retryCount < f
					? setTimeout(function () {
							t.retryFunction(t)
						}, u)
					: c(t))
	}
	function r(n) {
		var t = n.el.data('retry-url')
		t &&
			$.ajax({
				url: t,
				dataType: 'json',
				cache: !1,
				crossDomain: !0,
				xhrFields: { withCredentials: !0 },
				success: function (t) {
					l(t, n)
				}
			})
	}
	var n = $('#image-retry-data'),
		u = n ? n.data('image-retry-timer') : 1500,
		f = n ? n.data('image-retry-max-times') : 10,
		e = n ? n.data('ga-logging-percent') : 0,
		o = (window.GoogleAnalyticsEvents && GoogleAnalyticsEvents.FireEvent) || function () {},
		t = function (n) {
			Math.random() <= e / 100 && o(n)
		}
	$.fn.loadRobloxThumbnails = function () {
		return this.each(function () {
			var n = {
					retryCount: 0,
					realRegeneration: !1,
					start: +new Date(),
					el: $(this),
					retryFunction: r
				},
				t = i(n)
			t.one('load', function () {
				var t = +new Date() - n.start
				Roblox.ThumbnailMetrics &&
					Roblox.ThumbnailMetrics.logFinalThumbnailTime(t, '2dThumbnailOnLoad')
			})
			setTimeout(function () {
				r(n)
			}, 0)
		})
	}
}) // GenericConfirmation.js

typeof Roblox == 'undefined' && (Roblox = {}),
	typeof Roblox.GenericConfirmation == 'undefined' &&
		(Roblox.GenericConfirmation = (function () {
			function w() {
				;(n.isOpen = !1), t()
			}
			function k(t) {
				var a, e, o, s, l
				;(n.isOpen = !0),
					(a = {
						titleText: '',
						bodyContent: '',
						footerText: '',
						acceptText: Roblox.Resources.GenericConfirmation.yes,
						declineText: Roblox.Resources.GenericConfirmation.No,
						acceptColor: u,
						declineColor: f,
						xToCancel: !1,
						onAccept: function () {
							return !1
						},
						onDecline: function () {
							return !1
						},
						onCancel: function () {
							return !1
						},
						imageUrl: null,
						allowHtmlContentInBody: !1,
						allowHtmlContentInFooter: !1,
						dismissable: !0,
						fieldValidationRequired: !1,
						onOpenCallback: function () {}
					}),
					(t = $.extend({}, a, t)),
					(c.overlayClose = t.dismissable),
					(c.escClose = t.dismissable),
					(e = $(i)),
					e.html(t.acceptText),
					e.attr('class', 'btn-large ' + t.acceptColor),
					e.unbind(),
					e.bind('click', function () {
						return v(e) ? !1 : (t.fieldValidationRequired ? nt(t.onAccept) : h(t.onAccept), !1)
					}),
					(o = $(r)),
					o.html(t.declineText),
					o.attr('class', 'btn-large ' + t.declineColor),
					o.unbind(),
					o.bind('click', function () {
						return v(o) ? !1 : (h(t.onDecline), !1)
					}),
					$('[data-modal-handle="confirmation"] div.Title').text(t.titleText),
					(s = $("[data-modal-handle='confirmation']")),
					t.imageUrl == null
						? s.addClass('noImage')
						: (s.find('img.GenericModalImage').attr('src', t.imageUrl), s.removeClass('noImage')),
					t.allowHtmlContentInBody
						? $("[data-modal-handle='confirmation'] div.Message").html(t.bodyContent)
						: $("[data-modal-handle='confirmation'] div.Message").text(t.bodyContent),
					$.trim(t.footerText) == ''
						? $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').hide()
						: $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').show(),
					t.allowHtmlContentInFooter
						? $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').html(t.footerText)
						: $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').text(
								t.footerText
							),
					$("[data-modal-handle='confirmation']").modal(c),
					(l = $('a.genericmodal-close')),
					l.unbind(),
					l.bind('click', function () {
						return h(t.onCancel), !1
					}),
					t.xToCancel || l.hide(),
					t.onOpenCallback()
			}
			function a(n) {
				n.hasClass(f)
					? n.addClass(s)
					: n.hasClass(l)
						? n.addClass(e)
						: n.hasClass(u) && n.addClass(o)
			}
			function v(n) {
				return n.hasClass(o) || n.hasClass(s) || n.hasClass(e) ? !0 : !1
			}
			function b() {
				var n = $(i),
					t = $(r)
				a(n), a(t)
			}
			function g() {
				var u = $(i),
					t = $(r),
					n = o + ' ' + s + ' ' + e
				u.removeClass(n), t.removeClass(n)
			}
			function p() {
				if (n.isOpen) {
					var t = $(i)
					t.click()
				}
			}
			function y() {
				var n = $(r)
				n.click()
			}
			function t(t) {
				;(n.isOpen = !1), typeof t != 'undefined' ? $.modal.close(t) : $.modal.close()
			}
			function h(n) {
				t(), typeof n == 'function' && n()
			}
			function nt(n) {
				if (typeof n == 'function') {
					var i = n()
					if (i !== 'undefined' && i == !1) return !1
				}
				t()
			}
			var l = 'btn-primary',
				u = 'btn-neutral',
				f = 'btn-negative',
				e = 'btn-disabled-primary',
				o = 'btn-disabled-neutral',
				s = 'btn-disabled-negative',
				d = 'btn-none',
				i = '#roblox-confirm-btn',
				r = '#roblox-decline-btn',
				n = { isOpen: !1 },
				c = {
					overlayClose: !0,
					escClose: !0,
					opacity: 80,
					overlayCss: { backgroundColor: '#000' },
					onClose: w
				}
			return {
				open: k,
				close: t,
				disableButtons: b,
				enableButtons: g,
				clickYes: p,
				clickNo: y,
				status: n,
				green: l,
				blue: u,
				gray: f,
				none: d
			}
		})()),
	$(document).keypress(function (n) {
		Roblox.GenericConfirmation.status.isOpen &&
			n.which === 13 &&
			Roblox.GenericConfirmation.clickYes()
	}) // IDE/PublishAs.js

var Roblox = Roblox || {}
Roblox.PublishAs = (function () {
	var n = function () {
			return $('div.asset:not(#newasset):visible').length
		},
		i = function (t, i) {
			var r = '/ide/placelist' + (i ? '/' + i : ''),
				u
			return t && ((u = '?startRow=' + n()), (r += u)), r
		},
		r = function (t, i) {
			var r = '/ide/publish/listmodels' + (i ? '/' + i : ''),
				u
			return t && ((u = '?startRow=' + n()), (r += u)), r
		},
		u = function (t, i) {
			var r = '/studio/animations' + (i ? '/' + i : ''),
				u
			return t && ((u = '?startRow=' + n()), (r += u)), r
		},
		f = function (t, i) {
			var r = '/studio/plugins' + (i ? '/' + i : ''),
				u
			return t && ((u = '?startRow=' + n()), (r += u)), r
		},
		t = function (n, t) {
			$.ajax({
				url: t,
				cache: !1,
				dataType: 'html',
				success: function (t) {
					var i = $(t),
						r
					n.parent().append(i),
						n.remove(),
						i.animate({ opacity: 1 }, 'fast'),
						(r = i.find('a[data-retry-url]')),
						r.loadRobloxThumbnails()
				}
			})
		},
		e = function () {
			$('#closeButton').click(function () {
				return window.close(), !1
			})
			$('#assetList,#groupAssetList').on('click', '#load-more-assets', function () {
				var n = $(this),
					e = Number($('#groupAssetList .group-select select:visible').val()) || 0,
					o = n.data('asset-type')
				return (
					o === 'model'
						? t(n.parent(), r(!0, e))
						: o === 'animation'
							? t(n.parent(), u(!0, e))
							: o === 'plugin'
								? t(n.parent(), f(!0, e))
								: t(n.parent(), i(!0, e)),
					!1
				)
			})
			$('.group-select').on('change', 'select', function () {
				var t = $(this),
					i = t.find(':selected').val(),
					r = t.data('url'),
					n = $('#groupAssetList .content')
				n.find('.loading').length || n.append("<div class='loading'></div>"),
					$.ajax({
						url: r + '/' + i,
						cache: !1,
						dataType: 'html',
						success: function (t) {
							n.find('.gameplace, .list-item, #MoreGames, .loading').remove(),
								n.append($(t)),
								$(t).animate({ opacity: 1 }, 'fast')
							var i = $(t).find('a[data-retry-url]')
							i.loadRobloxThumbnails()
						}
					})
			})
			$('#groupAssetList').on('click', '#newasset', function () {
				var n = $('#groupAssetList select').find(':selected').val(),
					t = $(this).data('url'),
					i = $('#UniverseID').val()
				window.location.href = t + '/' + n + '?universeId=' + i
			})
			$('#gameAssetList').on('click', '#newasset', function () {
				var n = $(this).data('url')
				window.location.href = n
			})
		}
	return { Initialize: e }
})() //Bundle detector

Roblox && Roblox.BundleDetector && Roblox.BundleDetector.bundleDetected('page')
