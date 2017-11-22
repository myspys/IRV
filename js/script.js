var result = $('#result');

$(function() {

    $('#candidates').change(updateButton).keydown(updateButton);
    $('#ballots').change(updateButton).keydown(updateButton);
    $('#incompleteBallots').change(updateButton);
    $('#threshold').change(updateButton).keydown(updateButton);

    function updateButton() {
        $('#submit').html('Submit').removeClass('btn-success').addClass('btn-primary');
    }

    $('#submit').click(function(event) {
        event.preventDefault();
        result.html('');
        $('#submit').html('Re-Submit').removeClass('btn-primary').addClass('btn-success');
        $('#result-group').show();

        var candidateNames = $('#candidates').val().replace('\r', '').split('\n');
        var ballots = Irv.readBallots($('#ballots').val());
        var incompleteBallots = $('#incompleteBallots').is(':checked');
        var tiebreakerSecondary = $('#tiebreakerSecondary').is(":checked");
        var threshold = $('#threshold').val();

        if (Irv.validateInput(candidateNames, ballots, incompleteBallots, threshold)) {
            var rankedCandidates = Irv.rankAllCandidates(candidateNames, ballots, tiebreakerSecondary, threshold);
            console.log("rankedCandidates", rankedCandidates);
        }

        $('html, body').animate({scrollTop: $(document).height()}, 'slow');
    });

});
