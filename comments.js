document.getElementById('commentInputForm').addEventListener('submit', saveComment);

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
    var comments = JSON.parse(localStorage.getItem('posts'));
    var commentList = document.getElementById('commentList')

    commentList.innerHTML = '';
    for (var i=0; comments != null && i < comments.length; i++) {
        var id= comments[i].id;
        var desc= comments[i].description;
        commentList.innerHTML += '<div class="container">'+
                                    '<div class="well">'+
                                        '<h3>Post ID: ' + id + '</h3>'+
                                        '<h4>' + desc + '</h4>'+   
                                    '</div>'+
                                 '</div>'; 
    }
}