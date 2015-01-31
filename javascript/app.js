/***
 * Name: Casey Morris
 * Description: Uses json to make up a "todo" list, displays in a list backward/forward, shows tags with additional info, and adds new entry to an array
 * 
 */
var main = function(toDoObjects) {
    "use strict";
    
    var toDos = toDoObjects.map(function(toDo){
       // return to description
       return toDo.description;
    });
    
    
    $(".tabs a span").toArray().forEach(function(element){
        
        //create a click handler for this element
        $(element).on("click", function(){
            
            //temporary variable for jQuery version of element
            var $element = $(element);
            
            // make all the tabs interactive
            $(".tabs span").removeClass("active");
        
            // make the first tab active
            $element.addClass("active");
        
            // empty the main content so we can recreate it
            $("main .content").empty();
            
            // depending on the tab clicked a conditional is selected and loads the corresponding questions and answer.
            if ($element.parent().is(":nth-child(1)")) {
                var index = toDos.length;
                var content = $("<ul>");
                // Loop through toDos array backwards
                for (index = index -1; index >= 0; index--)
                {
                   content.append("<li class='remove'> <button>x</button> "+toDos[index]+"</li>");
                    //Original jquery
                    //content.append($("<li>").text(toDos[index]));
                    
                }
                $("main .content").append(content);

                
            } else if ($element.parent().is(":nth-child(2)")) {
                var content = $("<ul>");
                
                // Loops through toDOS array forward and puts in a list.
                toDos.forEach(function (todo) {
                content.append($("<li>").text(todo));
                });
                $("main .content").append(content);  
                
            } else if ($element.parent().is(":nth-child(3)")) {
                //TAGS tab code
                console.log("thetags tab was clicked");
                var tags = [];

                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });
                console.log(tags);

                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return { "name": tag, "toDos": toDosWithTag };
                });

                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });
                
                
            } else if ($element.parent().is(":nth-child(4)")) {
                 var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p class='spacing'>").text("Tags: "),
                    $button = $("<button>").text("+"),
                    $content = $("<div>").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
                
                $("main .content").append($content);

                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(",");
                                 
                    toDoObjects.push({"description":description, "tags":tags});

                    // update toDos
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });

                    $input.val("");
                    $tagInput.val("");
                });

               
                
            }    
            
            
            // return false so we don't follow the link
            return false;
        
        });
    
    
        
    });
    
    // Triggers the 1st tab to display the toDo list backwards. This is the
    // default display.
    $(".tabs a:first-child span").trigger("click");
    
    // Removes todo entries by hiding them
    $(".remove").on("click",function(){
        $(this).hide();
    });
    
    
};

$(document).ready(function(){
    $.getJSON("todos.json", function(toDoObjects){
        //call main with the to-dos as an arguement
        main(toDoObjects);
    });    
});
