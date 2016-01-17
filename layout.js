function maketitle(title, image, author, anchor) {
    var string = "<div class='title' ";

    if (anchor !== undefined) {
        string += "data-anchor='" + anchor + "' ";
    }

    string += "style='background-image: url(\"" + image + "\")'><h1>" + title + "</h1><br />";

    if (author !== undefined) {
        string += "<h2>Written by " + author + "</h2>";
    }

    string += "</div>";

    return string;
}

function makequestion(title, image) {
    return "<div class='question' style='background-image: url(\"" + image + "\")'><h1>" + title + "</h1></div>";
}

function makeanswer(title, image, result, points) {

    if (points === undefined) {
        points = 1;
    }

    var string = "<div data-result='" + result + "' data-points='" + points + "'";

    if (image !== undefined) {
        string += " style='background-image: url(\"" + image + "\")' class='answer'>"
    } else {
        string += " class='answer text'>"
    }

    if (title !== undefined) {
        string += "<h1>" + title + "</h1>";
    }

    string += "</div>";

    return string
}

function makeresult(title, body, image, identifier) {
    return "<div class='result' data-id='" + identifier + "' style='background-image: url(\"" + image + "\")'><h1>" + title + "</h1><br /><p>" + body + "</p><br /><p class='anotherquiz' onclick='anotherquiz()'>Take another quiz!</p></div>";
}

function makequestionset(type) {
    var stringtype;

    switch (type) {
        case 1:
            stringtype = "";
            break;
        case 2:
            stringtype = "half";
            break;
        case 3:
            stringtype = "third";
            break;
    }

    return "<div class='questionset " + stringtype + "'></div>";
}

function layout($location, quizzes) {
    for (q in quizzes) {

        var quiz = quizzes[q];

        $quizcontainer = $("<div class='quiz'></div>");

        var title = quiz["title"];
        var author = quiz["author"];
        var image = quiz["image"];
        var anchor = quiz["anchor"];


        var $title = $(maketitle(title, image, author, anchor));
        $title.click(showquizclick);

        $quizcontainer.append($title);

        $quizbody = $("<div class='quizbody'></div>");

        var questions = quiz["quiz"];

        for (q in questions) {

            var question = questions[q];

            var title = question["title"];
            var image = question["image"];
            var width = question["width"];

            var $questionset = $(makequestionset(width));
            $questionset.append(makequestion(title, image));

            var answers = question["answers"];

            for (a in answers) {

                var answer = answers[a];

                var title = answer["title"];
                var image = answer["image"];
                var result = answer["result"];
                var points = answer["points"];

                var $answer = $(makeanswer(title, image, result, points));
                $answer.click(selectanswer);
                $questionset.append($answer);

            }

            $questionset.append("<div class='clear'></div>");
            $quizbody.append($questionset);

        }

        var results = quiz["results"];

        for (r in results) {
            var result = results[r];

            var title = result["title"];
            var body = result["body"];
            var image = result["image"];
            var identifier = r;

            $quizbody.append(makeresult(title, body, image, identifier));
        }

        $quizcontainer.append($quizbody);
        $location.append($quizcontainer);
    }

    start();
}
