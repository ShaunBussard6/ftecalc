document.getElementById('loan-form').addEventListener('submit', function(e){

        document.getElementById('results').style.display = 'none';

        document.getElementById('loading').style.display = 'block';

        setTimeout(calculateFteNeed, 1000);

        e.preventDefault();

});


function calculateFteNeed() {
     
        const calls = document.getElementById('calls');
        const aht = document.getElementById('aht');
        const occupancy = document.getElementById('occupancy');
        const minutes = document.getElementById('minutes');
        const headsNeeded = document.getElementById('heads-needed');

        const callsE = parseInt(calls.value);
        const ahtE = parseInt(aht.value);
        const occE = parseFloat(occupancy.value) / 100;
        const minutesE = parseInt(minutes.value);

        
        // compute FTE
        
        const workLoad = callsE * ahtE;
        const minToSec = minutesE * 60;
        const withOcc = minToSec * occE;
        const heads = workLoad / withOcc;
        
        if(isFinite(heads)) {
                headsNeeded.value = heads.toFixed(2);

                document.getElementById('results').style.display = 'block';

                document.getElementById('loading').style.display = 'none';

        } else {
                showError('incomplete data');
        }

        
}

function showError(error){
        document.getElementById('results').style.display = 'none';

        document.getElementById('loading').style.display = 'none';

        const errorDiv = document.createElement('div');

        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');

        errorDiv.className = 'alert alert-danger';

        errorDiv.appendChild(document.createTextNode(error));

        card.insertBefore(errorDiv, heading);

        setTimeout(clearError, 3000);
}

function clearError(){
        document.querySelector('.alert').remove();
}