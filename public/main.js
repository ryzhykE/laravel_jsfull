Loading = {
    show: function () {
        $("#loading").show();
    },
    hide: function () {
        $("#loading").hide();
    }
};

App = new Backbone.Marionette.Application();

App.addRegions({
    content: "#content",
    menu: "#menu-container"
});

App.addInitializer(function(options){
    Backbone.history.start();
});

$(document).ready(function(){
    App.start();
});