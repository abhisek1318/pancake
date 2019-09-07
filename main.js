document.getElementById('postInputForm').addEventListener('submit', savePost);

function savePost(e) {
    var postDesc= document.getElementById('postDescInput').value;
    var postId= chance.guid();

    var post={
        id: postId,
        description: postDesc
    }
    if(localStorage.getItem('posts')== null){
        var posts=[];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }else{
        var posts= JSON.parse(localStorage.getItem('posts'));
        posts.push(post);
        localStorage.setItem('posts',JSON.stringify(posts));
    }
    document.getElementById('postInputForm').reset();

    fetchPosts();

    e.preventDefault();
}

function deletePost(id){
    var posts = JSON.parse(localStorage.getItem('posts'));

    for(var i=0; i<posts.length; i++){
        if(posts[i].id==id){
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
    for (var i=0; posts != null && i < posts.length; i++) {
        var id= posts[i].id;
        var desc= posts[i].description;
        postList.innerHTML += '<div class="container">'+
                              '<div class="well">'+
                              '<h3>Post ID: ' + id + '</h3>'+
                              '<h4>' + desc + '</h4>'+   
                              '<a href="#" onclick="deletePost(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '<a href="#" onclick="saveComment"(\''+id+'\')" class="btn btn-danger">Add Comment</a>'+
                              '</div>'+
                              '</div>';                     
    }
}