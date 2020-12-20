// self.addEventListener("install", e => {
// 	e.waitUntil(
// 		caches.open("static").then(caches => {
// 			return caches.addAll(["./", "./asset/post-it256.png", "./css/style.css"]);
// 		})
// 	);
// });

// self.addEventListener("fetch", e => {
// 	e.repondWith(
// 		caches.match(e.request).then(response => {
// 			return response || fetch(e.request);
// 		})
// 	);
// });