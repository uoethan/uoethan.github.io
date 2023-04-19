$(function() {

    let list = $(".list");
    list.append("<div class='row'>");
    jQuery.get('sketches.txt', function (data) {

        let lines = data.split("\n");

        $.each(lines, function (n, elem) {
            if(n%3===0){
                list.append("</div>\n<p><br></p>\n<div class='row'>")
            }
            const splitElem = elem.split("|");
            list.append("<a href='player.html?project="+splitElem[0]+"' class='project-link'><div class='column'><b>"+splitElem[2]+"</b><br><img src='/Images/"+splitElem[0]+".png' class='list-image' alt='Project image'><br>"+splitElem[1]+"</div></a>");
        });
    });
    list.append("</tr>");
});