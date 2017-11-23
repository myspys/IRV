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
        var tiebreaker = 1;
        if($('#tiebreakerSecondary').is(":checked"))
            tiebreaker = 2;
        else if($('#tiebreakerStop').is(":checked"))
            tiebreaker = 3;
        var threshold = $('#threshold').val();

        if (Irv.validateInput(candidateNames, ballots, incompleteBallots, threshold)) {
            var rankedCandidates = Irv.rankAllCandidates(candidateNames, ballots, tiebreaker, threshold);
            
            $("#ranking ol").empty();
            for(var i=0; i<rankedCandidates.length; i++){
                $("#ranking ol").append("<li>" + rankedCandidates[i] + "</li>");
            }
            
        }

        $('html, body').animate({scrollTop: $(document).height()}, 'slow');
    });

});
