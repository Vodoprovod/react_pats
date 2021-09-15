//var my_news =[];

var my_news = [
	{
		author: 'Dodo Smith',
		text: 'Shit happens...'
	},
	{
		author: 'Just Basil',
		text: 'I think $ should has price lower then 70 rubles!'
	},
	{
		author: 'Guest',
		text: 'Free! Download! The best site - http://localhost:3000!'
	}
];

var Article = React.createClass({
	
	propTypes: {
		data: React.PropTypes.shape({
			author: React.PropTypes.string.isRequired,
			text: React.PropTypes.string.isRequired
		})
	},
	
	render: function() {
		
		var article = this.props.data;
		
		return (
			<div className="article">
				<p className="news__author">{ article.author }</p>
				<p className="news__text">{ article.text }</p>
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
			<strong className={ 'news__count ' + (data.length > 0 ? '' : 'none') }>Всего новостей: { data.length }</strong>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="app">
				<h3>Новости</h3>
				<News data={ my_news }/>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

//console.log(ReactDOM)