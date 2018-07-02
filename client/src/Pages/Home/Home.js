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
                <div className="box">
                    <h1>New York Times Article Search</h1>
                    <h3>Search for an article</h3>
                </div>
                <div>
                    <h2>Search Bar</h2>
                </div>

                <div>
                <h2>Articles</h2>
                {this.state.articles.map(article => (
                    <Article
                        key={article._id}
                        _id={article._id}
                        title={article.headline.main}
                        url={article.web_url}
                        date={article.pub_date}
                        handleClick={this.handleArticleSave}
                        buttonText="Save Article"
                    />
                ))}
                </div>
                
                <div>
                <h2>Saved Articles</h2>
                {this.state.savedArticles.map(article => (
                    <Article
                        key={article._id}
                        _id={article._id}
                        title={article.title}
                        handleClick={this.handleArticleDelete}
                        buttonText="Delete Article"
                    />
                ))} 
                </div>               
            </div>
        );
    };
}

export default Home;