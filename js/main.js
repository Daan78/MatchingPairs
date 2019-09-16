// Taking care of the button press which gives a simple tranform to make it interactive
const playButton = document.querySelector('.btn.play');
playButton.addEventListener( 'mousedown', () => playButton.style.cssText = 'transform: scale(.97)' );
playButton.addEventListener( 'mouseup', () => playButton.style.cssText = 'transform: scale(1)' );

// Declare the images ( First version )
// Next version has to look into the images folder automatically
// and get all images in there and put them into an array
const cats = [
    '001.png', '002.png', '003.png', '004.png', '005.png', 
    '006.png', '007.png', '008.png', '009.png', '010.png'
]

// It's a matching pairs game, so there need to be 2 versions of every image
const doubleCats = [...cats, ...cats];

// First share function. Takes care of spreading the cards to get a glimp of the cats ^^
// However. THERE HAS TO BE AN EASIER WAY!!!?? This feels crappy but it works!
function shareCards() {
    let gameBoard = document.createElement( 'section' );
    let main = document.getElementById( 'gameview' );
    main.appendChild(gameBoard);
    gameBoard.classList.add('game__board');
    gameBoard.id = 'gameboard';

    doubleCats.forEach( ( cat ) => {
        let gameCardMain = document.createElement( 'div' );
        gameBoard.appendChild(gameCardMain);
        let gameCardMainImg = document.createElement( 'img' );
        gameCardMain.appendChild(gameCardMainImg);

        gameBoard.appendChild(gameCardMain);
        gameCardMain.classList.add( 'game__board--card' );

        gameCardMainImg.src = `images/${cat}`;
    });

// Taking care of the image press which gives a simple tranform to make it interactive
    let gameCards = document.querySelectorAll( '.game__board--card' );
    gameCards.forEach(  ( card ) => card.addEventListener( 'mousedown', () => card.style.cssText = 'transform: scale(.98)' ) );
    gameCards.forEach(  ( card ) => card.addEventListener( 'mouseup', () => card.removeAttribute("style") ) );
    
}
shareCards();

// Function needs to take care of the shuffle after pressing the PLAY button.
function shuffle() {
    let a = doubleCats;
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function clickedCard(e) {
    this.classList.remove('turnedback');
    this.classList.add('flipped');
    let flipCheck = document.querySelectorAll( '.game__board--card.flipped img' );
    let check = document.querySelectorAll( '.game__board--card.flipped' );

    if( flipCheck.length === 2 ) {
        if( flipCheck[0].src === flipCheck[1].src ) {
            check.forEach( matchCard => matchCard.classList.remove( 'flipped') );
        } else {
            check.forEach( failCard => failCard.classList.remove( 'flipped') );
            // let turnCard = document.querySelectorAll( '.game__board--card' );
            // turnCard.forEach( card => card.removeEventListener( 'click', clickedCard ) );
            setTimeout(function() {
                check.forEach( failCard => failCard.classList.add( 'turnedback') );
                // turnCard.forEach( card => card.addEventListener( 'click', clickedCard ) );
            }, 1000);
        }
    }

    function newFunction() {
        console.log('false');
    }
}

// Function for sharing the cards when the PLAY button is clicked.
// Takes care of shuffliing and sharing again
function sorting() {
    let deleteCards = document.getElementById( 'gameboard' );
    deleteCards.remove();
    shuffle();
    shareCards();
    let turnCard = document.querySelectorAll( '.game__board--card' );
    turnCard.forEach( cards => cards.classList.add( 'turnedback' ) );
    turnCard.forEach( card => card.addEventListener( 'click', clickedCard ) );
}

playButton.addEventListener( 'click', sorting );



// Press start to start the game
// Cards will be shuffled
// Background images will be divided over the playboard -> random
// Every image must be loaded an placed twice to get the matching pairs.

// When a card is turned, the 2nd click checks if cards are the same
// When the same, keep them turned ( or delete both from the field, but leave the spot open on the playboard )
