import axios from 'axios';
import filterParams from './filterParams' 

export default {
//get articles from NYT
getArticles: function(params){
    return axios.get('/api/nyt', { params: filterParams(params) });
}
};