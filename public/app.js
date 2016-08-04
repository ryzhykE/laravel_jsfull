
{
    BookModel = Backbone.Model.extend({
        urlRoot: '/api/books',
        defaults: {
            title: "",
            author: "",
            year: "",
            genre: "",
            user_id: ""
        },
        validation: {
    title: {
      required: true
    },
    author: {
      required: true
    },
    year: {
      required: true
    },
    genre: {
      required: true
    },
    user_id: {
      required: true
    }
    
  }
    });
    BookList = Backbone.Collection.extend({
        url: '/api/books',
        model: BookModel
    });
    
    ReturnModel = Backbone.Model.extend({
        urlRoot: '/api/userbook',
    });
   
    
    UserModel = Backbone.Model.extend({
        urlRoot: '/api/users',
    });
    UserList = Backbone.Collection.extend({
        url: '/api/users',
        model: UserModel
    });
}

/** Views **/

{
    //index
    WelcomeView = Marionette.ItemView.extend({
        template: "#welcome"
    });
    
    //user
    UserView = Marionette.ItemView.extend({
        template: "#user-template",
        tagName: 'tr'
    });   
    UsersView = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-responsive table-hover table-bordered",
        template: "#users-template",
        childView: UserView,
    });
    UserDetailView = Marionette.ItemView.extend({
        tagName: "div",
        className: "table table-responsive table-hover table-bordered",
        template: "#user_detail_info-template"
    });  
    //book

    BookView = Marionette.ItemView.extend({
        template: "#book-template",
        tagName: 'tr'
    });
    BooksView = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-responsive table-hover table-bordered",
        template: "#books-template",
        childView: BookView,
    });
    BookDetailView = Marionette.ItemView.extend({
        template: "#book_detail-template",
        tagName: "div",
        className: "table table-responsive table-hover table-bordered"
    });
    BookEditView = Marionette.ItemView.extend({
        template: "#book_edit-template",
        tagName: "form",
        events: {
            'submit': 'submitForm',
        },
        submitForm: function (e) {
            e.preventDefault();
            var model = this.model;
            var arr = this.$el.serializeArray();
            var data = _(arr).reduce(function (acc, field) {
                model.set(field.name, field.value);
            }, {});
            if (!model.isValid()) {
                alert(model.validationError);
                return;
            }
            model.save(data, {success: function () {
                Backbone.history.navigate('/books', {
                    trigger: true
                });
            }});
        }
    });
    //
    
    
}
/**Controller**/
//index
new Marionette.AppRouter({
    controller: {
        index: function () {
            App.content.show(new WelcomeView());
        },
        //books
        books: function () {
            Loading.show();
            var books = new BookList();
            books.fetch({
                success: function (coll) {
                    App.content.show(new BooksView({
                        collection: coll
                    }));
                    Loading.hide();
                }
            });

        },
        book: function (id) {
            Loading.show();
            var book = new BookModel({id: id});
            book.fetch({
                success: function (book) {
                    App.content.show(new BookDetailView({
                        model: book
                    }));
                    Loading.hide();
                }
            });
        },
        book_edit: function (id) {
            Loading.show();
            var book = new BookModel({id: id});
            book.fetch({
                success: function (book) {
                    App.content.show(new BookEditView({
                        model: book
                    }));
                    Loading.hide();
                }
            });
        },
        book_delete: function (id) {
            Loading.show();
            var book = new BookModel({id: id});
            book.destroy({
                success: function () {
                    Backbone.history.navigate('/books', {
                        trigger: true
                    });
                }
            });
        },
        book_add: function () {
            var book = new BookModel();
            App.content.show(new BookEditView({ model: book}));
        },
        //
        register_delete: function (id) {
            Loading.show();
            var returns = new ReturnModel({id: id});
            returns.destroy({
                success: function () {
                    Backbone.history.history.back();
                }
            });
        },    
        //user
        users: function () {
            Loading.show();
            var users = new UserList();
            users.fetch({
                success: function (coll) {
                    App.content.show(new UsersView({
                        collection: coll
                    }));
                    Loading.hide();
                }
            });
        },
        user:function (id) {
            Loading.show();
            var user = new UserModel({id: id});
            user.fetch({
                success: function (user) {
                    App.content.show(new UserDetailView({
                        model: user,
                        collection: new Backbone.Collection(user.attributes.books)
                    }));
                    Loading.hide();
                }
            })
        },
        user_delete: function (id) {
            Loading.show();
            var user = new UserModel({id: id});
            user.destroy({
                success: function () {
                    Backbone.history.navigate('/users', {
                        trigger: true
                    });
                }
            });
        },
    },
    appRoutes: {
        "": "index",
        "books/create": "book_add",
        "books": "books",
        "books/:id": "book",
        "books/:id/edit": "book_edit",     
        "bookregister/:id/delete": "register_delete",      
        "books/:id/delete": "book_delete",
        "users": "users",
        "users/:id": "user",
        "users/:id/delete": "user_delete",
    },
});


