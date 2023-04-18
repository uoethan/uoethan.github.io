$(function() {
    $(".list").append("<ul class = \"list-wrap\"")
    for(let i=0;i<10;i++) {
        $(".list").append("<li class=\"list-inner\">Test "+i.toString()+"</li>");
    }
    $(".list").append("</ul>")
});