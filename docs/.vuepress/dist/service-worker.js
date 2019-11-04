/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "0001.html",
    "revision": "b9d1f65f4af8bf1561eb8106b613d277"
  },
  {
    "url": "0002.html",
    "revision": "453416221ecd9e6e15ac1cdd97eb1e90"
  },
  {
    "url": "0003.html",
    "revision": "bcdc41838c0e7df927b4bbed6f9c7cae"
  },
  {
    "url": "0004.html",
    "revision": "069cf2ecb7430d5d998da5b9f3fb4b0d"
  },
  {
    "url": "0005.html",
    "revision": "0a22da748994138966ab5065fa382451"
  },
  {
    "url": "0006.html",
    "revision": "f910483ee7c48bca5e3c9a54f60ff182"
  },
  {
    "url": "0007.html",
    "revision": "8b6afc498f279f85edb6ac5d400107d2"
  },
  {
    "url": "0008.html",
    "revision": "5849d8e868d9ba51cb2f7b0e28894923"
  },
  {
    "url": "0009.html",
    "revision": "e5b643ea4c844f389739d2d339ce8d26"
  },
  {
    "url": "0010.html",
    "revision": "78c050a6606785d072848c4ae7549abb"
  },
  {
    "url": "0011.html",
    "revision": "fc5c786796dfb32aba86f5286b365649"
  },
  {
    "url": "0012.html",
    "revision": "93e6fe71bf8e281099547dd8b04485f2"
  },
  {
    "url": "0013.html",
    "revision": "859bbd064cb145a43fae5f66d5732c34"
  },
  {
    "url": "0014.html",
    "revision": "e1222f23dcff6228833265d6ae262c4d"
  },
  {
    "url": "0015.html",
    "revision": "1fae0ae60d3b764bb2fa6cb57484d04f"
  },
  {
    "url": "0016.html",
    "revision": "a4905453d925f9026769e27e6c572e56"
  },
  {
    "url": "0017.html",
    "revision": "d803dded9b35dd068a0183a391b040c6"
  },
  {
    "url": "0018.html",
    "revision": "255fbf9b1765a57ef219cf729cf1c4c0"
  },
  {
    "url": "0019.html",
    "revision": "43510c81383a973e7e8b37a04fd3c079"
  },
  {
    "url": "0020.html",
    "revision": "3f81c594024e7ce5cce4d011c0ed93ce"
  },
  {
    "url": "0021.html",
    "revision": "c3e752151ba2aa3a475b97f2d3e266ac"
  },
  {
    "url": "0022.html",
    "revision": "160d5cabc619efe5698a97904b0da40a"
  },
  {
    "url": "0023.html",
    "revision": "14635a706561cd6de121c53b06692851"
  },
  {
    "url": "0024.html",
    "revision": "31c71cfbd3bcf7c6420ec4a7522c4a38"
  },
  {
    "url": "0025.html",
    "revision": "ab003672e1eb8803a724b4270baaab61"
  },
  {
    "url": "0026.html",
    "revision": "35a906a592a48358b789371cb910f2fc"
  },
  {
    "url": "0027.html",
    "revision": "28011374e16530b8ca9cff0021b1743d"
  },
  {
    "url": "0028.html",
    "revision": "32e70861c7dab773a7b27f218a18ff94"
  },
  {
    "url": "0029.html",
    "revision": "6e3edaa01f8024bd2b5e532f388a4637"
  },
  {
    "url": "0030.html",
    "revision": "5771200f04e06cd016a04051af3116f4"
  },
  {
    "url": "0031.html",
    "revision": "3f2c9b1602cffdd095a6d3049957bdc0"
  },
  {
    "url": "0032.html",
    "revision": "2259aa798b28abd2c7a38574f412672e"
  },
  {
    "url": "0033.html",
    "revision": "a966dfe562e65c0730c3a7727fecb2de"
  },
  {
    "url": "0034.html",
    "revision": "f82721bcb58c634f8e114bfbedbab8a9"
  },
  {
    "url": "0035.html",
    "revision": "0449f330682a885f6d97bfcc14bb0ab8"
  },
  {
    "url": "0036.html",
    "revision": "37e62893c95b39649b97e00d83b75b59"
  },
  {
    "url": "0037.html",
    "revision": "1ab9d823ed5b1235da6e9b7ffc81640f"
  },
  {
    "url": "0038.html",
    "revision": "65593fd9ec20f2bc89906429511723db"
  },
  {
    "url": "404.html",
    "revision": "4ab4d20283a38fded0e536ef619dda9f"
  },
  {
    "url": "assets/css/0.styles.be15e0e1.css",
    "revision": "3b3fabf7a0daf03c22995438f3c7a5d4"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.b15f60e2.js",
    "revision": "9b2aac350109b383a30e4356b445099c"
  },
  {
    "url": "assets/js/11.535b2ad8.js",
    "revision": "e6614aeb618b0b7977b1ad86a31ec4da"
  },
  {
    "url": "assets/js/12.46ffc8b5.js",
    "revision": "f1ee49990cb6a66bba07cb069ae31cac"
  },
  {
    "url": "assets/js/13.4b23805e.js",
    "revision": "62546bea4a53be1fe60f985d0948e687"
  },
  {
    "url": "assets/js/14.6e6cf41b.js",
    "revision": "95e22e5b0941c52285e08ad33c57d96f"
  },
  {
    "url": "assets/js/15.47414791.js",
    "revision": "7e17fef8d10a6cd0a887badf089a3b90"
  },
  {
    "url": "assets/js/16.ecc1171d.js",
    "revision": "20dae7e06521c16fa85ea0a9bcd65d10"
  },
  {
    "url": "assets/js/17.c118399e.js",
    "revision": "e5f10763cb33ca2009f91003232f2ce1"
  },
  {
    "url": "assets/js/18.eea3e35b.js",
    "revision": "ffcffc0dedbe9e206696eb15452717b0"
  },
  {
    "url": "assets/js/19.b12d698f.js",
    "revision": "4442ef4ba8cb8c2b539098a99c33c567"
  },
  {
    "url": "assets/js/2.d6c01b35.js",
    "revision": "14ddb160b23261a87e04b1a93d7b51f5"
  },
  {
    "url": "assets/js/20.a584b4e7.js",
    "revision": "375b2eaed11a3f5803ae193545c7a2b0"
  },
  {
    "url": "assets/js/21.3e0bdf10.js",
    "revision": "e53836a5b7186a9674c3f5be96318495"
  },
  {
    "url": "assets/js/22.276850a1.js",
    "revision": "1868fd6967f5b7cac288698395fbe713"
  },
  {
    "url": "assets/js/23.b3efca3c.js",
    "revision": "579dee324753d08a084d2e98a224cae5"
  },
  {
    "url": "assets/js/24.c7601923.js",
    "revision": "76d006711ef1e738eb49cadbf6435755"
  },
  {
    "url": "assets/js/25.39614ac1.js",
    "revision": "3f929b3b1be959a61c837bc34953e564"
  },
  {
    "url": "assets/js/26.60483ab2.js",
    "revision": "64df782ede31da9f317c5bf2353d19fe"
  },
  {
    "url": "assets/js/27.bfb61d9d.js",
    "revision": "16b475a9de27dd06d78fe1ba9962473e"
  },
  {
    "url": "assets/js/28.7dadd6bc.js",
    "revision": "29b918ed5236764ae2975d974b68329d"
  },
  {
    "url": "assets/js/29.59b2df76.js",
    "revision": "1dcf06aec87da6d6cbb91c67899337bf"
  },
  {
    "url": "assets/js/3.ded4051d.js",
    "revision": "680f3f8063020a284db7a67cd00dcc98"
  },
  {
    "url": "assets/js/30.a7a4f806.js",
    "revision": "269a9c764d8d84201a1ea76428633d29"
  },
  {
    "url": "assets/js/31.48156b6a.js",
    "revision": "330c6cd30d00932c1f2462a144155988"
  },
  {
    "url": "assets/js/32.e7ff8ffb.js",
    "revision": "5d950a9564905d2ae10f3fde9df74cd3"
  },
  {
    "url": "assets/js/33.d17510e5.js",
    "revision": "3e0218096b2d634ba0ad712774be881e"
  },
  {
    "url": "assets/js/34.f00dca94.js",
    "revision": "fbe30529f9b5758ea7ae6f59a3b9f1ea"
  },
  {
    "url": "assets/js/35.303cbcea.js",
    "revision": "861dea1fd8d378adced46e6ebe2fdc4c"
  },
  {
    "url": "assets/js/36.e8a1ac2f.js",
    "revision": "af47e8a7f3f73c570d24a9afe43224cb"
  },
  {
    "url": "assets/js/37.e187a446.js",
    "revision": "ff8c9a9ce50d6c206dc443ea9051dfc8"
  },
  {
    "url": "assets/js/38.75296055.js",
    "revision": "0ce6e89fad549f67a3c7b364a29011ff"
  },
  {
    "url": "assets/js/39.81ede555.js",
    "revision": "6c9a04244ee1f62c149710ced0b75890"
  },
  {
    "url": "assets/js/4.eef6d0a5.js",
    "revision": "8dac8593fc4416243bcf6753135b6699"
  },
  {
    "url": "assets/js/40.92086d8f.js",
    "revision": "b8fcc8b05d5f82eabc0b51700fe3a69d"
  },
  {
    "url": "assets/js/41.77fe8ac2.js",
    "revision": "95c465af716b0d30e268d03e149ba8a2"
  },
  {
    "url": "assets/js/42.ad77dce1.js",
    "revision": "9738456b1bcfe07a7a01e26c97eb2562"
  },
  {
    "url": "assets/js/43.714ecbf7.js",
    "revision": "8a49da965f349b4e2f2c3600b17910d2"
  },
  {
    "url": "assets/js/44.bb453227.js",
    "revision": "fe6383717ecf2686a93f8a54b0888448"
  },
  {
    "url": "assets/js/45.7bd9bdc7.js",
    "revision": "9c2b5ce028b522e790e2a6bb644ca34c"
  },
  {
    "url": "assets/js/5.ae17a9ef.js",
    "revision": "9ac1e4d94237789fe2cbb59e2fd8c244"
  },
  {
    "url": "assets/js/6.41716a03.js",
    "revision": "8b840ee4b2a052bf6ab628b3ca559aba"
  },
  {
    "url": "assets/js/7.137caa55.js",
    "revision": "597fed4cc8277b74e629b9c996d2c1e8"
  },
  {
    "url": "assets/js/8.f552d2b6.js",
    "revision": "139e46193a5f39f132d5eea80f983ca9"
  },
  {
    "url": "assets/js/9.e9d1275f.js",
    "revision": "694d4d41284de26326625b15a6961df6"
  },
  {
    "url": "assets/js/app.745025a3.js",
    "revision": "e50e11f029349b7917dc488d78d5eeae"
  },
  {
    "url": "index.html",
    "revision": "181ea43775dd5124f022ed0f4326c4f5"
  },
  {
    "url": "logo_128*128.png",
    "revision": "b2b3bb7f7a415029b8adf501f7dcfd66"
  },
  {
    "url": "logo_144*144.png",
    "revision": "4d78742ef9793ef30444804a82be7fff"
  },
  {
    "url": "logo_192*192.png",
    "revision": "9215f320819846df37d9feefdb0793e3"
  },
  {
    "url": "logo_256*256.png",
    "revision": "17f0476e699ee7fc11f1ce42035f7c86"
  },
  {
    "url": "logo_512*512.png",
    "revision": "8924fa6825c4fd541871de20bacb5fee"
  },
  {
    "url": "logo.png",
    "revision": "898c72041b9c789b486b50faff454e3e"
  },
  {
    "url": "logo.svg",
    "revision": "846241363eef0dbc002ac107be3563a8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
