const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config);

// Set up your search parameters
const params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
};

// Initiate your search using the above paramaters
T.get('search/tweets', params, function(err, data, response) {
    // If there is no error, proceed
    if (!err) {
      // Loop through the returned tweets
      for(let i = 0; i < data.statuses.length; i++){
        let screen_name = data.statuses[i].user.screen_name;

        T.post('friendships/create', {screen_name}, function(err, res){
            if (err) {
              console.log(err);
            } else {
              console.log(screen_name, ': **FOLLOWED**');
            }
        });
      }
    } else {
      console.log(err);
    }
});