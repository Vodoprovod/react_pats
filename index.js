//var my_news =[];

var my_news = [
	{
		author: 'Саша Печкин',
		text: 'В четверг, четвертого числа...',
		bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
	},
	{
		author: 'Просто Вася',
		text: 'Считаю, что $ должен стоить 35 рублей!',
		bigText: 'А евро 42!'
	},
	{
		author: 'Гость',
		text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
		bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
	}
];

var Article = React.createClass({
	
	propTypes: {
		data: React.PropTypes.shape({
			author: React.PropTypes.string.isRequired,
			text: React.PropTypes.string.isRequired,
			bigText: React.PropTypes.string.isRequired
		})
	},
	
	getInitialState: function() {
		return {
			visible: false
		};
	},
	
	readmoreClick: function(e) {
		e.preventDefault();
		this.setState({ visible: this.state.visible ? false : true });
	},
	
	render: function() {
		
		var article = this.props.data;
		var visible = this.state.visible;
		
		return (
			<div className="article">
				<p className="news__author">{ article.author }</p>
				<p className="news__text">{ article.text }</p>
				<a 
					href="#" 
					className={ "news__readmore " + (visible ? "none" : "")}
					onClick={ this.readmoreClick }
				>Подробнее...</a>
				<p className={ "news__big-text " + (visible ? "" : "none")}>{ article.bigText }</p>
			</div>
		);
	}
});

var News = React.createClass({
	
	propTypes: {
		data: React.PropTypes.array.isRequired
	},
		
	render: function() {
		
		var data = this.props.data;
		
		var newsTemplate;
		
		if (data.length > 0) {
			newsTemplate = data.map((item, index) =>  
					<div key={ index }>
						<Article data={ item } />
					</div>
			);
		} else {
			newsTemplate = <p>К сожалению новостей нет...</p>
		}
		
		
		return (
			<div className="news">
			{ newsTemplate }
			<strong 
				className={ 'news__count ' + (data.length > 0 ? '' : 'none') }
			>
				Всего новостей: { data.length }
			</strong>
			</div>
		);
	}
});

var TestInput = React.createClass({
		
	onClickButtonHandler: function(e) {
		console.log(this.refs);
		alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
	},
	
	render: function() {
		return (
			<div>
				<input 
					className="test-input" 
					defaultValue=''
					placeholder='введите значение'
					ref='myTestInput'
				/>
				<button 
					onClick={ this.onClickButtonHandler }
				>показать ввод</button>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="app">
				<h3>Новости</h3>
				<TestInput />
				<News data={ my_news }/>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

