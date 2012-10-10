;
/*
 * Copyright (c) 2012, Betable Limited
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Betable Limited nor the names of its contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL BETABLE LIMITED BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function Betable(gameId, accessToken) {
    this.endpoint = 'https://api.betable.com/1.0'
    this.gameId = gameId
    this.accessToken = accessToken
}

Betable.prototype.account = function Betable_account(callback, errback) {
    this.xhr('GET', '/account', void 0, callback, errback)
}

Betable.prototype.bet = function Betable_bet(options, callback, errback) {
    this.xhr(
        'POST'
      , '/games/' + this.gameId + '/bet'
      , options
      , callback
      , errback
    )
}

Betable.prototype.unbackedBet = function Betable_unbackedBet(options, callback, errback) {
    this.xhr(
        'POST'
      , '/games/' + this.gameId + '/unbacked-bet'
      , options
      , callback
      , errback
    )
}

Betable.prototype.betCredits = function Betable_bet_credits(gameId, options, callback, errback) {
    this.xhr(
        'POST'
      , '/games/' + this.gameId + '/' + gameId + '/bet'
      , options
      , callback
      , errback
    )
}

Betable.prototype.canIGamble = function Betable_canIGamble(callback, errback) {
    this.xhr('GET', '/can-i-gamble', void 0, callback, errback)
}

Betable.prototype.wallet = function Betable_wallet(callback, errback) {
    this.xhr('GET', '/account/wallet', void 0, callback, errback)
}

Betable.prototype.xhr = function Betable_xhr(
    method
  , path
  , body
  , callback
  , errback
) {
    var xhr = function() {
        try { return new XMLHttpRequest() } catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.6.0') } catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.3.0') } catch (e) {}
        try { return new ActiveXObject('Microsoft.XMLHTTP') } catch (e) {}
        throw new Error('no XMLHttpRequest')
    }()
    xhr.open(
        method
      , this.endpoint + path + '?access_token=' + this.accessToken
      , true
    )
    xhr.onreadystatechange = function Betable_account_onreadystatechange() {
        if (4 === xhr.readyState) {
            var response = JSON.parse(xhr.responseText)
            if (400 > xhr.status) {
                callback(response,xhr)
            } else {
                errback(response)
            }
        }
    }
    if (body) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8')
        xhr.send(JSON.stringify(body))
    } else {
        xhr.send()
    }
}
;