riot.tag(
    'timer',
    '<h1>{opts.count}</h1><button onclick="{reset}">重置</button><yield/>',
    'timer{color:red;}timer>button{color:blue;}',
    'class="timer" data-store="123"',
  function() {
      var self = this;
      this.on('mount',function() {
          setTimeout(function() {
              self.trigger('go');
          },1000);
      });

      this.on('go',function() {
          this.opts.count++;
          setTimeout(function() {
              self.update();
              self.trigger('go');
          },1000);
      });

      this.reset = function() {
          this.opts.count = 0;
      };
  }
);
