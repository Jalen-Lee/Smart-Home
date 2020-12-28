
export default function loadFont() {
	//仓耳非白W05
	wx.loadFontFace({
	  global:true,
	  family: 'cefbw05 Vera Serif Bold', //设置一个font-family使用的名字
	  source: 'url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-fupg0rkcwtyda9cfc2/f45676e0-4738-11eb-8a36-ebb87efcf8c0.ttf")',
	  success: console.log
	})
	// //中文
	// wx.loadFontFace({
	//   family: 'xxxx',
	//   source: 'url("https://xxx.com/xxxx.otf")',
	//   success: console.log
	// })
}