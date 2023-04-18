$(function() {

    let list = $(".list");
    list.append("<ul class = \"list-wrap\"");
    jQuery.get('sketches.txt', function (data) {

        let lines = data.split("\n");

        $.each(lines, function (n, elem) {
            const splitElem = elem.split("|");
            list.append("<a href='player.html?project="+splitElem[0]+"' class='project-link'><li class=\"list-inner\">"+splitElem[2]+"<br><img src='/Images/"+splitElem[0]+".png' class='list-image' alt='Project image'><br>"+splitElem[1]+"</li></a>");
        });
    });
    list.append("</ul>");
});