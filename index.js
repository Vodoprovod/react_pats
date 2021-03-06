//var my_news =[];

window.ee = new EventEmitter();

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

var Add = React.createClass({
	
	getInitialState: function() {
		return {
			agreeNotChecked: true,
			authorIsEmpty: true,
			textIsEmpty: true
		};
	},
		
	onFieldChange: function(fieldName, e) {		
		if (e.target.value.trim().length > 0) {
			this.setState({ ['' + fieldName]: false })
		} else {
			this.setState({ ['' + fieldName]: true })
		}
	},
	
	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.author).focus();
	},
		
	onClickButtonHandler: function(e) {
		e.preventDefault();	
		var textEl = ReactDOM.findDOMNode(this.refs.text);
		
		var author = ReactDOM.findDOMNode(this.refs.author).value;
		var text = textEl.value;
		
		var item = [{
			author: author,
			text: text,
			bigText: '...'
		}];
		
		window.ee.emit('News.add', item);
		
		textEl.value = '';
		this.setState({ textIsEmpty: true });
	},
	
	onCheckRuleClick: function() {
		this.setState({ agreeNotChecked: !this.state.agreeNotChecked });
	},
	
	render: function() {
		
		let agreeNotChecked = this.state.agreeNotChecked;
		let authorIsEmpty = this.state.authorIsEmpty;
		let textIsEmpty = this.state.textIsEmpty;
		
		return (
			<form className='add cf'>
				<input
					type='text'
					className='add__author' 
					onChange={ this.onFieldChange.bind(this, 'authorIsEmpty') }
					placeholder='Ваше имя'
					ref='author'
				/>
				<textarea
					className='add__text'
					onChange={ this.onFieldChange.bind(this, 'textIsEmpty') }
					placeholder='Текст новости'
					ref='text'
				></textarea>
				<label className='add__checkrule'>
					<input 
						type='checkbox'
						onChange={ this.onCheckRuleClick }
						ref='checkrule'
					/>
					Я согласен с правилами
				</label>
				<button 
					className='add__btn'
					onClick={ this.onClickButtonHandler }
					ref='alert_button'
					disabled={ agreeNotChecked || authorIsEmpty || textIsEmpty }
				>
					Добавить новость
				</button>
			</form>
		);
	}
});

var App = React.createClass({
	
	getInitialState: function() {
		return {
			news: my_news
		};
	},
	
	componentDidMount: function() {
		var self = this;
		
		window.ee.addListener('News.add', function(item) {
			var nextNews = item.concat(self.state.news);
			self.setState({ news: nextNews });
		});
	},
	
	componentWillUnmount: function() {
		window.ee.removeListener('News.add');
	},
	
	render: function() {
		return (
			<div className="app">
				<Add />
				<h3>Новости</h3>
				<News data={ this.state.news }/>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

