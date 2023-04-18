$(function() {

    let list = $(".list");
    list.append("<ul class = \"list-wrap\"");
    jQuery.get('sketches.txt', function (data) {

        let lines = data.split("\n");

        $.each(lines, function (n, elem) {
            const splitElem = elem.split("|");
            list.append("<li class=\"list-inner\">"+splitElem[0]+"<br><img src='/Images/"+splitElem[0]+".png' class='list-image'><br>"+splitElem[1]+"</li>");

        });
        console.log(lines);
    });
    list.append("</ul>");
});