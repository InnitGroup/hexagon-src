// bundle: page___18bfa057136ed78236d4272d5640bd47_m
// files: IDE/Upload.js

// IDE/Upload.js
typeof Roblox.Studio == 'undefined' && (Roblox.Studio = {}),
	typeof Roblox.Studio.AssetUpload == 'undefined' &&
		(Roblox.Studio.AssetUpload = (function () {
			function r(t) {
				for (var i = null, u = 2, r; u > 0; ) {
					if (
						((r = t()),
						r &&
							((i = r.Upload($('#uploadProgressBar').data('upload-url'))), i === !0 || Number(i)))
					) {
						n(!0, i)
						return
					}
					u -= 1
				}
				if (i === Roblox.Studio.Resources.inappropriateTextError) {
					n(!1, i)
					return
				}
				n(!1)
			}
			var t = 0,
				u = function (n) {
					var t, i
					$('#uploadProgressCounter').text('100%'),
						$('#progressAmount').width('100%'),
						$('#progressBarWrapper a').removeClass('btn-gray'),
						$('#cancelButton').hide(),
						(t = $('#uploadProgressBar').data('newupload') == 'True'),
						t && Roblox.Studio.AssetUpload.IsPlace
							? $('#nextButton').show()
							: t && !Roblox.Studio.AssetUpload.IsPlace
								? ($('#okButton').show(),
									n != !0 &&
										Number(n) &&
										((i = $('#shareWithFriends input')),
										i.val(i.val() + n + '/redirect'),
										$('#shareWithFriends').show()))
								: ($('#okButton').show(), $('#shareWithFriends').show())
				},
				f = function () {
					function n() {
						var n = parseInt($('#progressAmount')[0].style.width, 10)
						;(n += 1 + Math.floor(Math.random() * 10)),
							n >= 90 && ((n = 90), clearInterval(Roblox.Studio.LoadingTimer)),
							$('#progressAmount').css('width', n + '%'),
							$('#uploadProgressCounter').text(n + '%')
					}
					return setInterval(n, 550)
				},
				i = function (n) {
					i.arguments.length <= 0 && (n = Roblox.Studio.Resources.errorMSG),
						$('#progressAmount')
							.width('100%')
							.removeClass('progress-blue-bar')
							.addClass('progress-error-bar'),
						$('#errorMessageContainer').html(n).addClass('error-text'),
						$('#cancelButton').hide(),
						$('#okButton').show()
				},
				n = function (t, r) {
					clearInterval(Roblox.Studio.LoadingTimer), t ? u(r) : n.arguments.length <= 1 ? i() : i(r)
				},
				e = function (n, i) {
					;(t = Math.round((n / i) * 100)),
						$('#uploadProgressCounter').text(t + '%'),
						$('#progressAmount').width(t + '%')
				},
				o = function () {
					var t = !1
					console.log('hai')
					try {
						;(t = window.external.SaveUrl($('#uploadProgressBar').data('upload-url'))), n(t)
					} catch (i) {
						try {
							;(t = window.external.SaveUrl($('#uploadProgressBar').data('upload-url'))), n(t)
						} catch (r) {
							n(!1)
						}
					}
				},
				s = function () {
					var n = window.external
					r(n.WriteSelection)
				},
				h = function () {
					var n = window.external
					r(n.WritePackage)
				}
			return {
				complete: n,
				loadingAnimation: f,
				updateProgress: e,
				uploadAssetData: s,
				uploadPackageData: h,
				uploadData: o
			}
		})()),
	$(function () {
		function n(n) {
			return !n || /^\s*$/.test(n)
		}
		;(Roblox.Studio.AssetUpload.IsPlace = $('#uploadProgressBar').data('isplace') != 'False'),
			(Roblox.Studio.AssetUpload.IsPackage = $('#uploadProgressBar').data('ispackage') != 'False'),
			$('#cancelButton').click(function () {
				var t = $('#uploadProgressBar').data('previous-url')
				return n(t) ? (window.close(), !1) : ((document.location.href = t), !1)
			}),
			$('#nextButton').click(function () {
				return (
					Roblox.Studio.AssetUpload.IsPlace
						? (document.location.href =
								'/ide/publishas/newgame/addons?assetid=' + $('#uploadProgressBar').data('assetid'))
						: window.close(),
					!1
				)
			}),
			$('#okButton').click(function () {
				return window.close(), !1
			}),
			$('#shareWithFriends input').click(function () {
				$(this).select()
			}),
			(Roblox.Studio.LoadingTimer = Roblox.Studio.AssetUpload.loadingAnimation()),
			Roblox.Studio.AssetUpload.IsPackage
				? Roblox.Studio.AssetUpload.uploadPackageData()
				: Roblox.Studio.AssetUpload.IsPlace
					? Roblox.Studio.AssetUpload.uploadData()
					: Roblox.Studio.AssetUpload.uploadAssetData()
	}) //Bundle detector

Roblox && Roblox.BundleDetector && Roblox.BundleDetector.bundleDetected('page')
