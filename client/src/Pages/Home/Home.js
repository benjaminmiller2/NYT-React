import React, {Component} from 'react';
import API from './../../utils/API';
import Article from './../../Components/Article';




class Home extends Component {
    state = {
        articles: [],
        savedArticles: [],
        q: "",
        start_year: "",
        end_year: "",
    }
    
    // lifecycles
    componentDidMount() {
        this.getArticles();
        this.getSavedArticles();
    }

    // my methods
    getArticles = () => {

        let searchTopic = document.getElementById("js-searchTopic").value;
        let searchYearStart = (document.getElementById("js-searchYearStart").value).split('-').join('');
        let searchYearEnd = (document.getElementById("js-searchYearEnd").value).split('-').join('');
        console.log(searchTopic, searchYearStart, searchYearEnd);

        if (!searchTopic){

        API.getArticles({
            q: this.state.q,
            start_year: this.state.start_year,
            end_year: this.state.end_year
        })
        .then(res =>
            this.setState({
                articles: res.data,
            })
        )
        .catch(err => console.log(err));
    }else{
        API.getArticles({
            q: searchTopic,
            start_year: searchYearStart,
            end_year: searchYearEnd
        })
        .then(res => this.setState({ articles: res.data }) )
        .catch(err => console.log(err));
    }
    }

    //save an article
    handleArticleSave = id => {
        const article = this.state.articles.find(article => article._id === id);
        API.saveArticle(article).then(res => {this.getSavedArticles();this.getArticles()});
    }

    //display saved articles
    getSavedArticles = () => {
        API.getSavedArticles()
            .then(res =>
            this.setState({
                savedArticles: res.data
            })
        )
        .catch(err => console.log(err));
    }

    // When delete article button is clicked, remove article from db
    handleArticleDelete = (id) => {
        API.deleteArticle(id)
            .then(this.getSavedArticles());
    }

    render() {
        return (
            <div>
            
            <div className="container">
                
                <div className="header">
                    <h1>~New York Times Article Search~</h1>
                </div>
                
                <div className="searchBox">
                        
                    <h2>Search for an article</h2>
                    <div className="form">
                        <lable>Topic: <input className="input" id="js-searchTopic"></input></lable>
                        <lable>Start Year: <input className="input" id="js-searchYearStart"></input></lable>
                        <lable>End Year: <input className="input" id="js-searchYearEnd"></input></lable> 
                    </div>
                    <button className="button" onClick={() => this.getArticles()}>Search</button>
                
                </div>
                
            <div className="contentBox">

                <div className="articleBox">
                    <h2><u>Articles</u></h2>
                    {this.state.articles.map(article => (
                    <Article
                        key={article._id}
                        _id={article._id}
                        title={article.headline.main}
                        url={article.web_url}
                        date={article.pub_date}
                        abstract={article.snippet}
                        handleClick={this.handleArticleSave}
                        buttonText="Save Article"
                        />
                    ))}
                </div>
                
                <div className="savedArticleBox">
                    <h2><u>Saved Articles</u></h2>
                    {this.state.savedArticles.map(article => (
                        <Article
                            key={article._id}
                            _id={article._id}
                            title={article.title}
                            url={article.web_url}
                            abstract={article.snippet}
                            handleClick={this.handleArticleDelete}
                            buttonText="Delete Article"
                        />
                    ))} 
                </div>   
            
            </div>

            </div>    

            <div class="footer">
                <h3>@ Copyright Benjamin P. Miller 2018</h3>
            </div>

        </div>
        );
    };
}

export default Home;