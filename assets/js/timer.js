/*!
 * timer.js
 *
 * (C) 2012 OGAWA Katsuhiro
 */
!function($) {

  var Timer;

  Timer = function(el, audio) {
    this.$el = $(el);
    this.audio = audio;
    this.timerId = null;
  }

  Timer.prototype = {

    times: function(times) {
      if (times != undefined) {
        this.$el.text(toTime(times)).data('times', times);

        if (times < 60 && !this.$el.hasClass('timer-warn')) {
          this.$el.addClass('timer-warn');
        } else if (times >= 60 && this.$el.hasClass('timer-warn')) {
          this.$el.removeClass('timer-warn');
        }

        return this;
      }

      return this.$el.data('times');
    }

  , start: function(times) {
      if (this.timerId) {
        return false;
      }

      this.times(times);

      this.timerId = setInterval($.proxy(function() {
        var times = this.times() - 1;

        if (times == 0) {
          this.fire();
          return;
        }

        this.times(times);
      }, this), 1000);

      return this.timerId;
    }

  , reset: function() {
      this.times(0);

      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }

  , fire: function() {
      if (this.audio) {
        this.audio.play();
      }

      this.reset();
    }

  }

  function toTime(times) {
    var m, s;

    m = Math.floor(times / 60);
    s = times % 60;
    if (s < 10) {
      s = '0' + s;
    }

    return m + ':' + s;
  }

  $(function() {
    var timer, audio;

    audio = new Audio('assets/audio/dora.wav')
    audio.volume = 1.0;

    timer = new Timer(document.getElementById('timer-value'), audio);

    $('#timer-start').click(function(e) {
      $('#timer-config').hide();
      $('#timer').show();

      timer.start($('#timer-times').val());
    });

    $('#timer-fire').click(function(e) {
      timer.fire();
    });

    $('#timer-reset').click(function(e) {
      timer.reset();

      $('#timer').hide();
      $('#timer-config').show();
    });
  });

}(window.jQuery);
