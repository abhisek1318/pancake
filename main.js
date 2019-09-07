document.getElementById('postInputForm').addEventListener('submit', savePost);

function savePost(e) {
    var postDesc = document.getElementById('postDescInput').value;
    var postId = chance.guid();

    var post = {
        id: postId,
        description: postDesc
    }
    if (localStorage.getItem('posts') == null) {
        var posts = [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    } else {
        var posts = JSON.parse(localStorage.getItem('posts'));
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    document.getElementById('postInputForm').reset();

    fetchPosts();

    e.preventDefault();
}

function deletePost(id) {
    var posts = JSON.parse(localStorage.getItem('posts'));

    for (var i = 0; i < posts.length; i++) {
        if (posts[i].id == id) {
            posts.splice(i, 1);
        }
    }
    localStorage.setItem('posts', JSON.stringify(posts));

    fetchPosts();
}

function fetchPosts() {
    var posts = JSON.parse(localStorage.getItem('posts'));
    var postList = document.getElementById('postList')

    postList.innerHTML = '';
    for (var i = 0; posts != null && i < posts.length; i++) {
        var id = posts[i].id;
        var desc = posts[i].description;
        postList.innerHTML += '<div class="container">' +
            '<div class="well">' +
            '<h3>Post ID: ' + id + '</h3>' +
            '<h4>' + desc + '</h4>' +
            '<div id="commentList"></div>' +
            '<a href="#" onclick="deletePost(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '<form id="commentInputForm">' +
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="commentDescInput" placeholder="Comment something...">' +
            '</div>' +
            '<button onClick="saveComment()" class="btn-primary">Add</button>'+
            '</form>' +
            '</div>' +
            '</div>';
    }
}

function saveComment(e) {
    var commentDesc= document.getElementById('commentDescInput').value;
    var commentId= chance.guid();

    var comment={
        id: commentId,
        description: commentDesc
    }
    if(localStorage.getItem('comments')== null){
        var comments=[];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }else{
        var comments= JSON.parse(localStorage.getItem('comments'));
        comments.push(comment);
        localStorage.setItem('comments',JSON.stringify(comments));
    }
    document.getElementById('commentInputForm').reset();

    fetchComments();

    e.preventDefault();
}

function fetchComments() {
    var comments = JSON.parse(localStorage.getItem('comments'));
    var commentList = document.getElementById('commentList');

    console.log(comments, commentList)

    commentList.innerHTML = '';
    for (var i=0; comments != null && i < comments.length; i++) {
        var id= comments[i].id;
        var desc= comments[i].description;
        commentList.innerHTML += '<div class="container">'+
                                    '<div class="well">'+
                                        '<h3>Comment ID: ' + id + '</h3>'+
                                        '<h4>' + desc + '</h4>'+   
                                    '</div>'+
                                 '</div>'; 
    }
}
