Betable Browser SDK
===================

Once a Betable API client has been authorized by a player, browser-based games should use the Betable Browser SDK to place bets directly from the browser so Betable can determine whether the player is allowed to gamble.

The various Betable OAuth SDKs ultimately produce an access token which should be sent from the server to the browser to configure the Betable Browser SDK.  With a game ID and that access token, the browser will be able to send bets directly to the Betable API.

Requirements
------------

The Betable Browser SDK requires browsers modern enough to support `XMLHttpRequest` in some form and the native `JSON.parse` method.  Specifically, these are Chrome 3+, Firefox 3+, and IE 8+.

Usage
-----

Configure the Betable Browser SDK:

    var betable = new Betable(
        'https://api.betable.com/1.0'
      , 'YOUR_GAME_ID'
      , 'AN_ACCESS_TOKEN'
    )

Each method takes two final arguments that are both functions: a `callback` which in case of success receives the parsed response structure and an `errback` which in case of failure receives the parsed error, description, and details.

Check whether the player can gamble:

    betable.canIGamble(
        function(response) {
            console.log(response)
        }
      , function(error) {
            console.log(error)
        }
    )

This is not strictly necessary but it makes for a nicer player experience to tell players that can't gamble as early as possible.

Get the player's account, which includes their first and last name:

    betable.account(
        function(response) {
            console.log(response)
        }
      , function(error) {
            console.log(error)
        }
    )

Get the player's wallet, which includes their real-money balance:

    betable.wallet(
        function(response) {
            console.log(response)
        }
      , function(error) {
            console.log(error)
        }
    )

If a player needs to deposit, send them to <https://betable.com/#/wallet/deposit>.

Place a bet:

    betable.bet(
        {
            currency: 'GBP'
          , economy: 'real'
          , paylines: [[1, 1, 1, 1, 1]]
          , wager: '0.01'
        }
      , function(response) {
            console.log(response)
        }
      , function(error) {
            console.log(error)
        }
    )

The first argument changes form according to the type of game on which bets are being placed.  This example happens to be for a slot machine.  Full documentation of the available options may be found at <https://developers.betable.com/docs/>.
