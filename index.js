$( function () {

  // Variables declaration
  let arrayOfWords;
  let inputLength;
  let isReading = false;
  let counter;
  let frequency = 2000;
  let action; // this is used to store the the result fo setInterval.

  // On page Load, hide elements that we don't need and empty the input, Only text area and the start button will show.
  $( '#userInput' ).val( '' );
  $( '#new-btn' ).hide();
  $( '#pause-btn' ).hide();
  $( '#resume-btn' ).hide();
  $( '#results' ).hide();
  $( '#error' ).hide();
  $( '#controlls' ).hide();

  // Click on Start Reading
  // 1. Get the value inside the input text and split it inside an array
  // Regular expression: \s matches tabs, spaces, new lines etc.
  // Regular expression: + means one or more.
  $( '#start-btn' ).click( function () {
    arrayOfWords = $( '#userInput' ).val().split( /\s+/ );
    // 2. Gets the words' number.
    inputLength = arrayOfWords.length;
    if ( inputLength > 1 ) {
      // If Enough Text.
      // 3. Hide the unwantd elements and show the wanted elements.
      $( '#error' ).hide();
      // Hide the user input and the start button.
      $( '#userInput' ).hide();
      $( '#start-btn' ).hide();
      // Show the controlls.
      $( '#controlls' ).show();
      // Show the new and pause buttons.
      $( '#new-btn' ).show();
      $( '#pause-btn' ).show();
      // show the read words.
      $( '#results' ).show();
      // 4.  Activate the reading mode.
      isReading = true;
      // 5. Set the progress slider's max
      $( '#progress-slider' ).attr( 'max', inputLength - 1 );
      // 6. Initialize our word counter
      counter = 0;
      // 7. Show the results element with the first word.
      $( '#results' ).show();
      $( '#results' ).text( arrayOfWords[counter] );
      // 8. Start the reading from the first word.
      action = setInterval( read, frequency );
    } else {
      // Input content too short.
      $( '#error' ).show();
    }
  } );

  // Click on New
  $( '#new-btn' ).click( () => location.reload() );

  // Click on Pause
  $( '#pause-btn' ).click( () => {
    // 1. Stop the reading.
    clearInterval( action );
    // 2. Disable the reading mode.
    isReading = false;
    // 3. Hide the pause btn and show the resume btn.
    $( '#pause-btn' ).hide();
    $( '#resume-btn' ).show();
  } );

  // Click on resume.
  $( '#resume-btn' ).click( () => {
    // 1. Resume the reading.
    action = setInterval( read, frequency );
    // 2. Enable the reading mode.
    isReading = true;
    // 3. Hide the resume button and show the pause btn.
    $( '#resume-btn' ).hide();
    $( '#pause-btn' ).show();
  } );

  // Click on fontSize

  // CLICK ON SPEED SLIDER
  $( '#wordSlider' ).on(
    "slidestop",
    function ( event ) {
      // Refresh the slider.
      $( '#wordSlider' ).slider( 'refresh' );
      // 1. Get the value of the slider.
      let sliderValue = parseInt( $( '#wordSlider' ).val() )
      // 3. Update the number in the text.
      $( '#word-speed' ).text( $( '#wordSlider' ).val() );
      // 2. Update the frequency with the new value.
      // 2.1 Stop the reading.
      clearInterval( action );
      // 2.2 Update the frequency.
      frequency = 60000 / sliderValue;
      // 2.3 Resume the reading with the new frequency.
      if ( isReading ) {
        action = setInterval( read, frequency );
      }
    } );

  // Progression slider 
  $( '#progress-slider' ).on(
    'slidestop', function ( event ) {

      $( '#progress-slider' ).slider( 'refresh' );
      // Get the value
      let progressionValue = parseInt( $( '#progress-slider' ).val() );
      // Stop reading.
      clearInterval( action );
      // Update the counter.
      counter = progressionValue;
      // Initialize the result with the updated counter.
      $( '#results' ).text( arrayOfWords[counter] );
      updatePercentage();

      if ( isReading ) {
        action = setInterval( read, frequency );
      }

    }
  )
  // HELPER FUNCTIONS
  let read = () => {
    // check for the last word.
    if ( counter === inputLength - 1 ) {
      // 1. Clear the interval.
      clearInterval( action );
      // 2. Disable the reading mode.
      isReading = false;
      // 3. Hide the pause button.
      $( '#pause-btn' ).hide();
    } else {
      // 1. Increase the counter by 1.
      counter++;
      // 2. Update the results element with the new word.
      $( '#results' ).text( arrayOfWords[counter] );
      // 3. Update the progress slider and refresh it.
      $( '#progress-slider' ).val( counter ).slider( 'refresh' );
      // 4. Update the text of the percentage.
      // counter / max * 100
      updatePercentage();

    }
  }

  let updatePercentage = () => {
    $( '#percentage' ).text( Math.ceil( counter / ( inputLength - 1 ) * 100 ) );
  }

} );