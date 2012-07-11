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

    var betable = new Betable('YOUR_GAME_ID', 'AN_ACCESS_TOKEN')

Each method takes two final arguments that are both functions: a `callback` which in case of success receives the parsed response structure and an `errback` which in case of failure receives the parsed error, description, and details.

**Check whether the player can gamble**:

    betable.canIGamble(
        function(response) {
            //
            // response:
            //
            //     {
            //         "can_gamble": true
            //       , "country": "Great Britain"
            //       , "country_code": "GB"
            //     }
            //
        }
      , function(error) {
            console.log(error)
        }
    )

This is not strictly necessary but it makes for a nicer player experience to tell players that can't gamble as early as possible.

**Get the player's account, which includes their first and last name**:

    betable.account(
        function(response) {
            //
            // response:
            //
            //     {
            //         "id": "A4n7V5UL3gKx8ms2"
            //       , "first_name": "Charles"
            //       , "last_name": "Fey"
            //     }
            //
        }
      , function(error) {
            console.log(error)
        }
    )

**Get the player's wallet, which includes their real-money balance**:

    betable.wallet(
        function(response) {
            //
            // response:
            //
            //     {
            //       , "real": {
            //             "balance": "0.00"
            //           , "currency": "GBP"
            //           , "economy": "real"
            //         }
            //       , "sandbox": {
            //             "balance": "0.00"
            //           , "currency": "GBP"
            //           , "economy": "sandbox"
            //         }
            //     }
            //
        }
      , function(error) {
            console.log(error)
        }
    )

If a player needs to deposit, send them to <https://betable.com/#/wallet/deposit>.

**Place a bet**:

    betable.bet(
        {
            currency: 'GBP'
          , economy: 'real'
          , paylines: [[1, 1, 1, 1, 1]]
          , wager: '0.01'
        }
      , function(response) {
            //
            // response:
            //
            //     {
            //       , "currency":"GBP"
            //       , "outcomes": [
            //             {
            //                 "outcome": "win"
            //               , "payline": [1, 1, 1, 1, 1]
            //               , "payout":"0.05"
            //               , "symbols":["A","B","A","B","A"]
            //              }
            //         ]
            //       , "payout": "0.05"
            //       , "stops": [3, 26, 18, 18, 1]
            //       , "window": [
            //             ["C", "C", "D", "A", "B"]
            //           , ["A", "B", "A", "B", "A"]
            //           , ["C", "A", "D", "B", "A"]
            //         ]
            //     }
            //
        }
      , function(error) {
            console.log(error)
        }
    )

The first argument and the response change form according to the type of game on which bets are being placed.  This example happens to be for a slot machine.  Full documentation of the available options may be found at <https://developers.betable.com/docs/>.
