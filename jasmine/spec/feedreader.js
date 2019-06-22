/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All the tests are placed within the $() function,
 * since some of these tests may require DOM elements. It
 * ensures that they don't run until the DOM is ready.
 */
$(function() {
    /* This is the first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in the application.
    */
    describe('RSS Feeds', function() {
        /* it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all feeds have URL defined', function(){
            allFeeds.forEach((feed)=>{
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all feeds have name defined', function(){
            allFeeds.forEach((feed)=>{
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            });
        });
    });


    /* This is new test suite named "The menu" */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default. This test is developed based
         * on the analysis the HTML and the CSS
         * being applied on the menu element for 
         * hiding/showing of the menu element on the page.
         */
         //DOM element required for the test
        var menuIcon = $('.menu-icon-link');

        it('element is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu displays when
          * clicked and it hides when clicked again.
          */
        it('changes visibility when menu icon is clicked', function(){
            menuIcon.trigger('click');// first click 
            //checks the menu displays
            expect($('body').hasClass('menu-hidden')).toBe(false); 

            menuIcon.trigger('click');// next click 
            //ensures the menu hides again
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    })    
    /* Next test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        /* loadFeed() is asynchronous function so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it("should have aleast one element", function(done){
            var entry = $("article.entry");
            //checks for single .entry element within the .feed container
            expect($('.feed').find(entry).length).not.toBe(0);
            done();
        });
    
        
    });
       
    /* TODO: The new test suite named "New Feed Selection" */
describe('New Feed Selection', function() {
    /* This test ensures that when a new feed is loaded
        * by the loadFeed function the content actually changes.
        * again, loadFeed() is asynchronous.
         */
    let oldFeed, newFeed;

    beforeEach(function(done) {
        loadFeed(0,  done); // first loadFeed finished
    });
    it("Loadfeed finished, content actually changes", function(done)  {        
        // first feed content copied to oldFeed
        oldFeed = document.querySelector(".feed").innerHTML;
        loadFeed(1, done); // next feed loadFeed finished
    });

    afterEach(function() {
      newFeed = document.querySelector(".feed").innerHTML;
    //checks the loadFeed function actually changes content
      expect(oldFeed).not.toEqual(newFeed);
    });
}); 
}());
