<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="content-type" content="text/html" />
	<meta name="author" content="TSRh TeaM" />
	<title>Library</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <script src="js/underscore.js"></script>
    <script src="js/jquery.js"></script>
    <script src="js/backbone.js"></script>
    <script src="js/backbone.marionette.js"></script>
    <script src="js/backbone-validation-min.js"></script>
    <script src="app.js"></script>
    <script src="main.js"></script>  
</head>
<body>
<div class="container">   
    <nav class="navbar navbar-inverse">
        <ul class="nav navbar-nav">
            <li><a href="{{ URL::to('/') }}">Main</a></li>
            <li><a href="{{ URL::to('#users') }}">View Users</a></li>
            <li><a href="{{ URL::to('#books') }}">View Books</a></li>
            <li><a href="{{ URL::to('#books/create') }}">Create book</a></li>          
        </ul>
    </nav>
    <script type="text/template" id="welcome">
            <div class="content">
                <div class="title">Library content</div>
            </div>
    </script>
    <div class="container" id="content" ></div>
    
    <script type="text/template" id="users-template">
        <thead>
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Surname</td>
            <td>Email</td>
            <td>Action</td>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </script>
    <script type="text/template" id="user-template">
        <td><%- id %></td>
        <td><%- firstname %></td>
        <td><%- lastname %></td>
        <td><%- email %></td>
        <td>
            <a class="btn btn-small btn-success" href="#users/<%- id %>">Details</a>
            <a class="btn btn-small btn-success" href="#users/<%- id %>/delete">Delete</a>
        </td>
    </script>
    <script type="text/template" id="user_detail_info-template">
    <thead>
        <tr>
            <td>Id</td>
            <td>Firstname</td>
            <td>Lastname</td>
            <td>Email</td>
        </tr>
    </thead>
        <td><%- id %></td>
        <td><%- firstname %></td> 
        <td><%- lastname %></td>
        <td>Email: <%- email %></td>        
    </script>
    <script type="text/template" id="books-template">
        <thead>
        <tr>
            <td>ID</td>
            <td>Title</td>
            <td>Author</td>
            <td>Year</td>
            <td>Genre</td>
            <td>Boon in  </td>
            <td >Action</td>
        </tr>
        </thead>
    </script>
    <script type="text/template" id="book-template">
        <td><%- id %></td>
        <td><%- title %></td>
        <td><%- author %></td>
        <td><%- year %></td>
        <td><%- genre %></td>
        <td>
        <a href="#users/<%- user_id %>">User <%- user_id %></a>
        </td>
        <td>
            <a class="btn btn-small btn-success" href="#bookregister/<%- id %>/delete">Return book</a>
            <a class="btn btn-small btn-success" href="#books/<%- id %>">Details</a>
            <a class="btn btn-small btn-success" href="#books/<%- id %>/edit">Edit</a>
            <a class="btn btn-small btn-success" href="#books/<%- id %>/delete">Delete</a>
            
            
        </td>
    </script>
    
    <script type="text/template" id="book_detail-template">
        <thead>
        <tr>
            <td>Id</td>
            <td>Title</td>
            <td>Author</td>
            <td>Year</td>
            <td>Genre</td>
        </tr>
    </thead>
        <td><%- id %></td>
        <td><%- title %></td>
        <td><%- author %></td> 
        <td><%- year %></td>
        <td><%- genre %></td>         
    </script>
    <script type="text/template" id="book_edit-template">
        <div class="form-group">
            <label for="title">Title</label>
            <input class="form-control" name="title" type="text" value="<%- title %>" id="title">
        </div>
        <div class="form-group">
            <label for="author">Author</label>
            <input class="form-control" name="author" type="text" value="<%- author %>" id="author">
        </div>
        <div class="form-group">
            <label for="year">Year</label>
            <input class="form-control" name="year" type="number" value="<%- year %>" id="year">
        </div>
        <div class="form-group">
            <label for="genre">Genre</label>
            <input class="form-control" name="genre" type="text" value="<%- genre %>" id="genre">
        </div>
        <div class="form-group">
            <label for="user_id">User</label>
            <input class="form-control" name="user_id" type="text" value="<%- user_id %>" id="user_id">
        </div> 
        <input class="btn btn-success" type="submit" value="Save">
    </script>  
</body>
</html>