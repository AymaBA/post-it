const section1 = document.querySelector(".section1");
const socket = io.connect("http://127.0.0.1:5100");
const form = document.querySelector(".form-posts");

const data = async () => {
	return (await fetch("http://127.0.0.1:5000/posts")).json();
};




(async () => {
	let articles = await data();
	articles = articles;
	for (let i = 0; i < articles.length; i++) {
		const element = articles[i];
		section1.innerHTML += `
		<div class="card" style="width: 60%; ">
			<img src="/frontend/asset/d4kd.jpg" class="card-img-top" alt="...">
			<div class="card-body">
			  <h1 class="card-text">${element.title}</h1>
			  <h5 class="card-text">${element.content}</h5>
			  <br>
			  <p class="card-text">${element.date}</p>
			</div>	
		</div>
		`;
		console.log(element);
	}

})().catch(error => console.error(error));


socket.on("newArticle",(data)=>{
	console.log("socket : "+data);
	$(".section1").prepend(`
		<div class="card" style="width: 60%; ">
			<img src="/frontend/asset/d4kd.jpg" class="card-img-top" alt="...">
			<div class="card-body">
			  <h1 class="card-text">${data.title}</h1>
			  <h5 class="card-text">${data.content}</h5>
			  <br>
			  <p class="card-text">${data.date}</p>
			</div>	
		</div>
		`);
})


form.addEventListener("submit", (e)=>{
	e.preventDefault();
	let formData = new FormData(form);
	console.log(formData);

	fetch('http://127.0.0.1:5000/posts', {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"title": document.querySelector("#exampleInputEmail1").value,
					"content":document.querySelector("#exampleFormControlTextarea1").value
				})
			});
})
