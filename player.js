$(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectTitle = urlParams.get('project');

    let printTitle="";
    let printDescription = "";

    $("head").append("<script src=\"Sketches/"+projectTitle+".js\" class=\"canvas\"></script>");

    jQuery.get('sketches.txt', function (data) {
        let lines = data.split("\n");

        $.each(lines, function (n, elem) {
            const splitElem = elem.split("|");

            if(splitElem[0]===projectTitle){
                $("h2").append(splitElem[2]);
                $("body").append("<p>"+splitElem[3]+"</p>");
            }
        });
    });
});