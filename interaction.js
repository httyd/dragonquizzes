function start() {
    var anchor = window.location.hash.replace("#", "");

    if ($(".title[data-anchor='" + anchor + "']").length !== 0) {

        var $title = $($(".title")[0]);
        var $quiz = $title.closest(".quiz");

        showquiz($quiz);
    }
}

function anotherquiz() {
    $(".quizbody").hide();
    $(".quiz").show();

    $('html, body').animate({
        scrollTop: 0
    }, 2000);

    window.location.hash = "";
}

function showquizclick() {
    $quiz = $(this).closest(".quiz");
    showquiz($quiz)
}

function showquiz($quiz) {
    var $title = $quiz.find(".title");

    if ($title.attr("data-anchor") !== undefined) {
        window.location.hash = $title.attr("data-anchor");
    }

    $(".quiz").hide();
    $quiz.show();

    $quiz.find(".quizbody").show();

    $('html, body').animate({
        scrollTop: $quiz.offset().top
    }, 1000);

}

function calculateresult($quiz) {
    var scores = {}

    $quiz.find(".answer.selected").each(function() {

        var result = $(this).attr("data-result");
        var points = $(this).attr("data-points");

        if (scores[result] === undefined) {
            scores[result] = points;
        } else {
            scores[result] += points;
        }

    });

    var max_result = undefined;
    var max_score = -1;

    for (s in scores) {
        if (scores[s] > max_score) {
            max_result = s;
            max_score = scores[s];
        }
    }

    $result = $quiz.find(".result[data-id='" + max_result + "']");
    $result.show();

    $('html, body').animate({
        scrollTop: $result.offset().top
    }, 2000);
}

function selectanswer() {
    $quiz = $(this).closest(".quiz");

    if ($quiz.find(".result:visible").length !== 0) {
        return;
    }

    $(this).parent().find(".answer").removeClass("selected");
    $(this).parent().find(".answer").addClass("deselected");

    $(this).removeClass("deselected");	
    $(this).addClass("selected");

    if ($quiz.find(".question").length === $quiz.find(".answer.selected").length) {
        calculateresult($quiz);
    }
}
