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
      , true
    )
}

Betable.prototype.betCredits = function Betable_betCredits(gameId, options, callback, errback) {
    this.xhr(
        'POST'
      , '/games/' + this.gameId + '/' + gameId + '/bet'
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

Betable.prototype.unbackedBetCredits = function Betable_unbackedBetCredits(gameId, options, callback, errback) {
    this.xhr(
        'POST'
      , '/games/' + this.gameId + '/' + gameId + '/unbacked-bet'
      , options
      , callback
      , errback
    )
}

Betable.prototype.canIGamble = function Betable_canIGamble(callback, errback) {
    this.xhr('GET', '/can-i-gamble', void 0, callback, errback)
}

Betable.prototype.wallet = function Betable_wallet(options, callback, errback) {
  if(typeof options === 'function') {
      this.xhr('GET', '/account/wallet', {'games': this.gameId}, options, callback)
  } else {
      var games = options && options.gameIds ? {'games': options.gameIds.join(',')} : {}
      this.xhr('GET', '/account/wallet', games, callback, errback)
  }
}

Betable.prototype.xhr = function Betable_xhr(
    method
  , path
  , body
  , callback
  , errback
  , includeContentType
) {
    var xhr = function() {
        try { return new XDomainRequest() } catch (e) {}
        try { return new XMLHttpRequest() } catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.6.0') } catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.3.0') } catch (e) {}
        try { return new ActiveXObject('Microsoft.XMLHTTP') } catch (e) {}
        throw new Error('no XMLHttpRequest')
    }()
    var path = this.endpoint + path + '?access_token=' + this.accessToken
      , is_xdr = typeof XDomainRequest === 'function'
      , xhr_args = [method, path]

    if ('GET' === method && body) {
        Object.keys(body).forEach(function(key) {
            xhr_args[1] += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
        })
    }

    if(!is_xdr)            xhr_args.push(true)
    if(includeContentType) xhr_args[1] = xhr_args[1] + '&content_type=application/json'

    xhr.open.apply(xhr, xhr_args)

    if(is_xdr) {
        xhr.onload = function() { callback(JSON.parse(xhr.responseText)) }
        xhr.onerror = xhr.ontimeout = function() { errback(JSON.parse(xhr.responseText)) }
        xhr.onprogress = function() {}
    } else {
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
    }
    if ('POST' === method && body) {
        if(!is_xdr) xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8')
        xhr.send(JSON.stringify(body))
    } else {
        xhr.send()
    }
}
;
