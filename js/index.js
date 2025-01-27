$(document).ready(function() {
	const newAnimations = [
		{
			push: 'slide-to-left',
			pop: 'slide-to-right'
		},
		{
			push: 'slide-to-top',
			pop: 'slide-to-bottom'
		},
		{
			push: 'top-to-bottom',
			pop: 'bottom-to-top'
		},
		{
			push: 'right-to-left',
			pop: 'left-to-right'
		},
		{
			push: 'scale-up',
			pop: 'scale-down'
		},
		{
			push: 'scale-up-rotate',
			pop: 'scale-down-rotate'
		},
		{
			push: 'scale-up-circle',
			pop: 'scale-down-circle'
		}
	];

	const cmpFirst = {
		name: 'first',
		template: '#template-first',
		data: {
			page_name: "First page",
			user_list: json
		},
		beforeRender: function() {
			console.log("in before render");
			this.methods.getDataFromServer();
		},
		afterRender: function() {
			console.log("in After render");
			console.log(this);
		},
		renderAlways: false,
		methods: {
			firstFunction: function() {
				console.log("first function found");
			},
			newFunction: function() {
				console.log("new function executed");
			},
			getDataFromServer: function() {
				console.log("in get data from server");
				var self = this;
				$.ajax({
					url: "http://localhost:8080/js/user_json.json",
					method: "GET",
					success: function(data) {
						console.log("in get json success", data);
						self.data.user_list = JSON.parse(data);
						self.update();
					},
					error: function(error) {
						console.log("in ajax error");
					}
				})
			}
		},
		events: {
			'click, .btn-update': function(el) {
				this.data.user_list[1].first_name = "changed first name";
				this.methods.firstFunction(); // you can call function using this, this will refer to current router object
				this.update(); // need to call update as handlerbar template will update automatically
			},
			'click, .row': function(el) {
				Router.push();
			},
		}
	};

	const cmpSecond = {
		name: 'second',
		template: '#template-second',
		renderAlways: false,
		autoRender: false,
		data: {
			name: 'second template',
			address: 'second template address'
		},
		render: function($el, $templateElement, data) {
			console.log($el, $templateElement, data);
			var source   = $templateElement.html();
			var template = Handlebars.compile(source);
			var html  = template(data);
			$el.html(html);
		}
	};

	const cmpThird = {
		name: 'third',
		template: "#template-third",
		data: {
			name: 'third template',
			address: 'third template address'
		},
		renderAlways: false,
	};

	const cmpFourth = {
		name: 'fourth',
		template: "#template-fourth",
		data:  {
			name: 'fourth template',
			address: 'fourth template address'
		},
		renderAlways: false,
	};

	const cmpFifth = {
		name: 'fifth',
		template: "#template-fourth",
		data:  {
			name: 'fifth template',
			address: 'fifth template address'
		},
		renderAlways: false,
	};

	var routes = [ cmpFirst, cmpSecond, cmpThird, cmpFourth, cmpFifth];
	Router.init({
		routes: routes,
		animations: newAnimations[0],
		beforeLoadAnimation: false,
		data: {
			hello_parent: "Hello from parent"
		},
		methods: {
			testing: function() {
				console.log("testing in parent");
			}
		}, 
		events: {
			'click, .next': function() {
				Router.push();
			},
			'click, .prev': function() {
				Router.pop();
			}
		},
		showLoader: function() {
			$('.loader').css('display','block');
		},
		hideLoader: function() {
			$('.loader').css('display','none');
		} 
	});
});
