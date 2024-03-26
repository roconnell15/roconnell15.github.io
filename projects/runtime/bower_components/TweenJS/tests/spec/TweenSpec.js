describe("TweenJS", function () {
	beforeEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;
	});

	afterEach(function () {
		createjs.Tween.removeAllTweens();
	});

	describe("Basics", function () {
		it("should complete in ~500ms.", function (done) {
			var obj = {x: 0};
			var startTime = Date.now();
			createjs.Tween.get(obj)
				.to({x: 50}, 500)
				.call(function () {
						  expect(Date.now() - startTime).toBeInRange(490, 510);
						  done();
					  });
		});

		it("hasActiveTweens())", function () {
			var obj = {x: 0};
			expect(createjs.Tween.hasActiveTweens(obj)).toBe(false);
			createjs.Tween.get(obj).to({x: 50}, 500);
			expect(createjs.Tween.hasActiveTweens(obj)).toBe(true);
		});

		it("paused", function (done) {
			var obj = {x: 0};
			var tween = createjs.Tween.get(obj);

			var func = {
				change: function () {
				}
			};

			spyOn(func, "change");

			tween.on("change", func.change);
			tween.to({x: 200}, 2000);
			tween.paused = true;

			setTimeout(function () {
				tween.paused = false;
				tween.on("change", function () {
					expect(func.change.calls.count()).toBe(1);
					done();
				});
			}, 250);
		});

		it("wait()", function (done) {
			var startTime = Date.now();
			createjs.Tween.get({}).wait(500).call(function () {
				expect(Date.now() - startTime).toBeInRange(490, 510);
				done();
			});
		});

		it("removeAllTweens()", function () {
			var obj = {};

			createjs.Tween.get(obj).to({x: 50}, 100);

			expect(createjs.Tween.hasActiveTweens(obj)).toBe(true);
			createjs.Tween.removeAllTweens();
			expect(createjs.Tween.hasActiveTweens(obj)).toBe(false);
		});

		it("removeTweens()", function () {
			var obj = {};

			createjs.Tween.get(obj).to({x: 50}, 100);

			expect(createjs.Tween.hasActiveTweens(obj)).toBe(true);
			createjs.Tween.removeTweens(obj);
			expect(createjs.Tween.hasActiveTweens(obj)).toBe(false);
		});

		it("loop", function (done) {
			var obj = {};

			var func = {
				hitEnd: function () {}
			};

			spyOn(func, "hitEnd");

			createjs.Tween.get(obj, {loop: 2}).to({x: 50}, 50).call(func.hitEnd);

			setTimeout(function () {
				expect(func.hitEnd.calls.count()).toBe(3);
				done();
			}, 200);
		});
	});
	
	
	
	describe("Events", function () {
		it("change", function (done) {
			var obj = {x: 0};
			var tween = createjs.Tween.get(obj);
	
			var func =  {
				change: function() { }
			};
	
			spyOn(func, "change");
	
			tween.on("change", func.change);
			tween.to({x: 50});
			setTimeout(function() {
				expect(func.change).toHaveBeenCalled();
				done();
			}, 50);
		});
		
		it("complete", function (done) {
			var tween = createjs.Tween.get({}, {loop:2}).wait(50);
	
			var func =  {
				complete: function() { }
			};
	
			spyOn(func, "complete");
	
			tween.on("complete", func.complete);
			setTimeout(function() {
				expect(func.complete.calls.count()).toBe(1);
				done();
			}, 200);
		});
	});
	
	
	
	describe("Tweening Props", function () {
		it("numeric", function (done) {
			var obj = {x: 0};
			createjs.Tween.get(obj)
				.to({x: 50}, 200)
				.call(function () {
					expect(obj.x).toBe(50);
					done();
				});
		});
		
		it("string", function (done) {
			var obj = {x: "one"};
			createjs.Tween.get(obj)
				.to({x: "two"}, 200)
				.call(function () {
					expect(obj.x).toBe("two");
					done();
				});
		});
		
		it("boolean", function (done) {
			var obj = {x: true};
			createjs.Tween.get(obj)
				.to({x: false}, 200)
				.call(function () {
					expect(obj.x).toBe(false);
					done();
				});
		});
		
		it("setPosition()", function () {
			var obj = {x: 0, y: "one"};
			var tween = createjs.Tween.get(obj);

			tween.to({x: 200, y: "two"}, 2000);
			tween.setPosition(25);
			expect(obj.x).toBe(2.5);
			expect(obj.y).toBe("one");
		});
	});
	
	
	
	describe("Actions", function () {
		var useTicks=false, m=useTicks?1:20, timeline;
		g = function(o, p) {
			p = p||{};
			p.useTicks = useTicks;
			return createjs.Tween.get(o, p);
		};
		
		var tests = [
			{name:"basic", tween:g({}).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]), pass:"ABC"},
			{name:"loop", tween:g({}, {loop:1}).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(7*m).call(trace, ["C"]), pass:"ABCABC"},
			{name:"rev", tween:g({}, {reversed:true}).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]), pass:"CBA"},
			{name:"loop, rev", tween:g({}, {loop:1, reversed:true}).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]), pass:"CBACBA"},
			{name:"bounce", tween:g({}, {loop:2, bounce:true}).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]), pass:"ABCBABC"},
			{name:"bounce, rev", tween:g({}, {loop:2, bounce:true, reversed:true}).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]), pass:"CBABCBA"},
			{name:"fast cycle", tween:g({}, {loop:3}).call(trace, ["A"]).wait(1*m).call(trace, ["B"]), pass:"ABABABAB"},
			{name:"fast cycle bounce", tween:g({}, {loop:3, bounce:true}).call(trace, ["A"]).wait(1*m).call(trace, ["B"]), pass:"ABABA"},
			{name:"fast cycle bounce rev", tween:g({}, {loop:3, bounce:true, reversed:true}).call(trace, ["A"]).wait(1*m).call(trace, ["B"]), pass:"BABAB"},
			{name:"gotoAndStop(0)", tween:g({}).call(trace, ["A"]).wait(5*m).label("mid").call(trace, ["B"]).wait(5*m).label("end").call(trace, ["C"]), gotoAndStop:0, pass:"A"},
			{name:"gotoAndPlay(0)", tween:g({}).call(trace, ["A"]).wait(5*m).label("mid").call(trace, ["B"]).wait(5*m).label("end").call(trace, ["C"]), gotoAndPlay:0, pass:"ABC"},
			{name:"gotoAndStop(0), 0 length", tween:g({}).call(trace, ["A"]), gotoAndStop:0, pass:"A"},
			{name:"gotoAndPlay(mid)", tween:g({}).call(trace, ["A"]).wait(5*m).label("mid").call(trace, ["B"]).wait(5*m).label("end").call(trace, ["C"]), gotoAndPlay:"mid", pass:"BC"},
			{name:"gotoAndStop(end)", tween:g({}).call(trace, ["A"]).wait(5*m).label("mid").call(trace, ["B"]).wait(5*m).label("end").call(trace, ["C"]), gotoAndStop:"end", pass:"C"},
			{name:"gotoAndPlay(end)", tween:g({}).call(trace, ["A"]).wait(5*m).label("mid").call(trace, ["B"]).wait(5*m).label("end").call(trace, ["C"]), gotoAndPlay:"end", pass:"C"},
			{name:"gotoAndStop(mid) rev", tween:g({}).call(trace, ["A"]).wait(15*m).label("mid").call(trace, ["B"]).wait(5*m).label("end").call(trace, ["C"]), gotoAndStop:"mid", pass:"B"},
			{name:"gotoAndPlay(mid) rev", tween:g({}).call(trace, ["A"]).wait(15*m).label("mid").call(trace, ["B"]).wait(5*m).label("end").call(trace, ["C"]), gotoAndPlay:"mid", pass:"BC"},
			{name:"2x goto", tween:g({}).call(function(t) { t.gotoAndStop(5*m); t.gotoAndPlay(5*m); }).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]), pass:"BC"},
		];
		
		timeline = new createjs.Timeline();
		timeline.target = {};
		timeline.addTween(g(timeline.target).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]));
		tests.push({name:"timeline", tween:timeline, pass:"ABC"});
		
		timeline = new createjs.Timeline();
		timeline.target = {};
		timeline.addTween(g(timeline.target).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]));
		timeline.duration += 200;
		tests.push({name:"timeline >dur", tween:timeline, pass:"ABC"});
		
		timeline = new createjs.Timeline({labels:{mid:5*m}});
		timeline.target = {};
		timeline.addTween(g(timeline.target).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]));
		tests.push({name:"timeline gotoAndStop", tween:timeline, gotoAndStop:"mid", pass:"B"});
		
		timeline = new createjs.Timeline({labels:{mid:5*m}});
		timeline.target = {};
		timeline.addTween(g(timeline.target).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]));
		tests.push({name:"timeline gotoAndPlay", tween:timeline, gotoAndPlay:"mid", pass:"BC"});
		
		timeline = new createjs.Timeline({loop:1});
		timeline.target = {};
		timeline.addTween(g(timeline.target).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]));
		tests.push({name:"timeline loop", tween:timeline, pass:"ABCABC"});
		
		timeline = new createjs.Timeline({loop:1});
		timeline.target = {};
		timeline.addTween(g(timeline.target).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]));
		timeline.duration += 200;
		tests.push({name:"timeline >dur loop", tween:timeline, pass:"ABCABC"});
		
		timeline = new createjs.Timeline({reversed:true});
		timeline.target = {};
		timeline.addTween(g(timeline.target).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]));
		tests.push({name:"timeline rev", tween:timeline, pass:"CBA"});
		
		timeline = new createjs.Timeline({reversed:true});
		timeline.target = {};
		timeline.addTween(g(timeline.target, {loop:1}).call(trace, ["A"]).wait(5*m).call(trace, ["B"]).wait(5*m).call(trace, ["C"]));
		tests.push({name:"timeline rev, tween loop", tween:timeline, pass:"CBACBA"});
		
		timeline = new createjs.Timeline({useTicks:true});
		timeline.target = {};
		timeline.addTween(createjs.Tween.get(timeline.target,{useTicks:true}).call(trace,["A"]).wait(1).call(trace,["B"]));
		tests.push({name:"first frame action in timeline (AnimateCC)", tween:timeline, pass:"AB"});
		
		for (var i = 0; i < tests.length; i++) {
			addTest(tests[i]);
		}
		
		function addTest(test) {
			test.tween.test = test;
			test.tween.paused = true; // needs to be here for timeline tests.
			it (test.name, function(done) {
				var tween = test.tween;
				tween.paused = false;
				if (test.gotoAndStop != null) {
					tween.gotoAndStop(test.gotoAndStop);
					evaluate(tween, done);
				} else {
					tween.on("complete", function(evt) {  evaluate(evt.target, done); })
					if (test.gotoAndPlay != null) { tween.gotoAndPlay(test.gotoAndPlay); }
				}
			});
		}
		
		function trace(val) {
			if (!this.out) { this.out = val; }
			else { this.out += val; }
			//console.log("	***",val);
		}
		
		function evaluate(tween, done) {
			expect(tween.target.out).toBe(tween.test.pass);
			done();
		}
	});
});
