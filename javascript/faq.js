/***
 * Name: Casey Morris
 * Description: Displays questions and answers on different tabs.
 * 
 */
var main = function() {
    "use strict";
    
    var question = [
        "What is my purpose in life?",
        "I broke the fourth wall and I can't get back?",
        "If a whale appears and is falling toward earth. What is on it's mind?"
    ];
    
    var answer = [
        "Ice cream chocolate bar drage. caramels wafer cotton candy gingerbread",
        "caramels wafer cotton candy gingerbread.",
        "Cookie gummies chupa chups chupa chups cookie marzipan. Brownie lemon drops cheesecake.candy donut brownie tootsie roll wafer cupcake."
    ];
    
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
                var content = $("<h2>");
                content.append(question[0]);
                content.append("<br><p class='answer'>"+answer[0]+"</p>");
            
                $("main .content").append(content);

                
            } else if ($element.parent().is(":nth-child(2)")) {
                var content = $("<h2>");
                content.append(question[1]);
                content.append("<br><p class='answer'>"+answer[1]+"</p>");
                $("main .content").append(content);  
                
            } else if ($element.parent().is(":nth-child(3)")) {
                var content = $("<h2>");
                content.append(question[2]);
                content.append("<br><p class='answer'>"+answer[2]+"</p>");
                $("main .content").append(content); 
            } 
            
            
        
            // return false so we don't follow the link
            return false;
        
        });
    
    
        
    });
    
    // Triggers the 1st tab to display the toDo list backwards. This is the
    // default display.
    $(".tabs a:first-child span").trigger("click");
    
    
};

$(document).ready(main);