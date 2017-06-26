$(function(){
    var prefix = "https://cors-anywhere.herokuapp.com/";
    var tweetLink = "https://twitter.com/intent/tweet?text=";
    var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    
    function getQuote() {
        $.getJSON(prefix + quoteUrl, createTweet);
        $.ajaxSetup({cache: false});
    }
    
    function createTweet(input) {
        var data = input[0];
        if (!input.length || input.length === 0) {
            data = 'none of text';
        }
        
        var quoteText = $(data.content).text().trim();
        if (quoteText  == null) {
            quoteText = 'none of text';
        }
        
        // It's proposition for instead above code. 
        // if (!quoteText.length) {
        //      quoteText = 'Unknown text';
        //  }
        
        var quoteAuthor = data.title;
        if (quoteAuthor == null) {
            quoteAuthor = 'none of text';
        }

        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown author";
        }

        var tweetText = "Quote of the day - " + quoteText + ". Author: " + quoteAuthor;

        if (tweetText.length > 140) {
            getQuote();
        } else {
            var tweet = tweetLink + encodeURIComponent(tweetText);
            $('.quote').text(quoteText);
            $('.author').text("Author: " + quoteAuthor);
            $('.tweet').attr('href', tweet);
        }
    }
    getQuote();
    $('.trigger').click(function(){
        getQuote();
    })
});