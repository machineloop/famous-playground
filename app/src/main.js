/*globals define*/
/*
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var outline = new Surface({
        size: [200, 200],
        content: '<img width="200" src="' + 'content/images/famous_symbol_transparent.png' + '"/>',
        properties: {
            lineHeight: '200px',
            textAlign: 'center'
        }
    });

    var outlineModifier = new Modifier({
        origin: [0.5, 0.5]
    });

    mainContext.add(outlineModifier).add(outline);

});
*/

/*define(function (require, exports, module) {
    'use strict';
 
    // import dependencies
    var Easing    = require('famous/transitions/Easing');
    var Engine    = require('famous/core/Engine');
    var Modifier  = require('famous/core/Modifier');
    var Surface   = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
 
    var mainCtx = Engine.createContext();
 
    // Create a surface, content is html
    var surface = new Surface({
        size:    [200, 200],
        content: '<span>Click To<br/>Move<br/>Surface</span>',
        classes: ['test-surface']
    });
 
    // Define Matrix transforms for start/end positions
    // and an easing curve to transition between them
    var startPos       = Transform.translate(20, 20, 0);
    var endPos         = Transform.translate(350, 500, 0);
    var transform      = new Modifier({ transform: startPos });
    var easeTransition = { duration: 300, curve: Easing.inOutBackNorm };
 
    // Apply the transition on click and switch start/end
    surface.on('click', function (e) {
        transform.setTransform(endPos, easeTransition);
        startPos = [endPos, endPos = startPos][0];
    });
 
    mainCtx.add(transform).add(surface);
});*/

/*
define(function (require, exports, module) {
    'use strict';
 
    // import dependencies
    var Engine        = require('famous/core/Engine');
    var Particle      = require('famous/physics/bodies/Particle');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Modifier      = require('famous/core/Modifier');
    var Spring        = require('famous/physics/forces/Spring');
    var Surface       = require('famous/core/Surface');
    var Vector        = require('famous/math/Vector');
 
    var mainCtx = Engine.createContext();
    var PE      = new PhysicsEngine();
 
    // Create a surface, content is html
    var surface = new Surface({
        size:    [200, 200],
        content: '<span>Click To<br/>Spring<br/>Surface</span>',
        classes: ['test-surface']
    });
    
        var surface2 = new Surface({
        size:    [50, 50],
        content: '<span>Click To<br/>Spring<br/>nested Surface</span>',
        classes: ['test-surface']
    });
 
    // Create a physical particle with position (p), velocity (v), mass(m)
    var particle = new Particle({
       mass:     1,
       position: [0, 0, 0],
       velocity: [0, 0, 0]
    });
 
    // Create a spring that will act on the particle
    var spring = new Spring({
       anchor:       [0, 0, 0],
       period:       300,  // <= Play with these values :-)
       dampingRatio: 0.07, // <=
       length:       0
    });
 
    // Apply a force on the surface when it's clicked
    surface.on('click', function (e) {
        particle.applyForce(new Vector(0, 0, -0.005 * 100));
    });
    
        surface2.on('click', function (e) {
        particle.applyForce(new Vector(0, 0, -0.005 * 100));
    });
 
    // Link the spring, particle and surface together
    PE.attach(spring, particle); // Add the spring force (agent)
    PE.addBody(particle);        // Add the particle to the PE
 
    // Create the scene, applying a top level modifier to center
    // the scene vertically in the viewport
    // add(particle) particle acts like a modifier on the renderable "surface"
    var centeredRel = mainCtx.add(new Modifier({ origin: [.5, .5] })).add(particle);
    centeredRel.add(surface);
    centeredRel.add(new Modifier({ origin: [.5, .5] })).add(surface2);
    mainCtx.setPerspective(1000);
});
*/

define(function (require, exports, module) {
    'use strict';
 
    // import dependencies
    var Engine     = require('famous/core/Engine');
    var Scrollview = require('famous/views/Scrollview');
    var Surface    = require('famous/core/Surface');
 
    var mainCtx = Engine.createContext();
 
    // Create a scrollview and array to hold surfaces
    var scrollView = new Scrollview();
    var surfaces   = [];
 
    // Create a numbered surface
    function createSurface(number) {
        return new Surface({
            size:    [undefined, 100],
            content: "Surface " + number,
            classes: ["test-surface", (i % 2 ? 'odd' : 'even')]
        });
    }
 
    // Add many surfaces to the scrollView
    for (var i = 0; i < 50; i++) {
        surfaces.push(createSurface(i));
    }
 
    // Include the surfaces in the scrollview and pipe
    // events to it from the engine
    scrollView.sequenceFrom(surfaces);
    Engine.pipe(scrollView);
 
    mainCtx.add(scrollView);
});
