function rgb01(r, g, b){
  var r0 = r/255.0;
  var g0 = g/255.0;
  var b0 = b/255.0;
  return [r0, g0, b0, 1];
}

var domain = INTERVALS(1)(30)
var dom2d = DOMAIN([[0,1],[0,1]])([30,30]);

//punti base

var base= COLOR(rgb01(47,51,53))(CUBOID([6,6,0.1]))

var pointsb1= [[-1,-1,-1],[-0.25,-0.25,-0.5],[0,0,0]]
var bez1 = BEZIER(S0)(pointsb1);
var curveb1 = MAP(bez1)(domain);

var pointsb2= [[5,-1,-1],[4.25,-0.25,-0.5],[4,0,0]]
var bez2 = BEZIER(S0)(pointsb2);
var curveb2 = MAP(bez2)(domain);

var pointsb3= [[-1,5,-1],[-0.25,4.25,-0.5],[0,4,0]]
var bez3 = BEZIER(S0)(pointsb3);
var curveb3 = MAP(bez3)(domain);

var pointsb4= [[5,5,-1],[4.25,4.25,-0.5],[4,4,0]]
var bez4 = BEZIER(S0)(pointsb4);
var curveb4 = MAP(bez4)(domain);

var sur1 = BEZIER(S1)([bez1,bez2])
var surface1 = MAP(sur1)(dom2d)

var sur2 = BEZIER(S1)([bez1,bez3])
var surface2 = MAP(sur2)(dom2d)

var sur3 = BEZIER(S1)([bez3,bez4])
var surface3 = MAP(sur3)(dom2d)

var sur4 = BEZIER(S1)([bez2,bez4])
var surface4 = MAP(sur4)(dom2d)

//punti base sup
var pointsb11= [[0,0,0],[1.5,1.5,2],[0,0,4]]
var bez11 = BEZIER(S0)(pointsb11);
var curveb11 = MAP(bez11)(domain);


var pointsb12= [[4,0,0],[2.5,1.5,2],[4,0,4]]
var bez12 = BEZIER(S0)(pointsb12);
var curveb12 = MAP(bez12)(domain);

var pointsb13= [[0,4,0],[1.5,2.5,2],[0,4,4]]
var bez13 = BEZIER(S0)(pointsb13);
var curveb13 = MAP(bez13)(domain);

var pointsb14= [[4,4,0],[2.5,2.5,2],[4,4,4]]
var bez14 = BEZIER(S0)(pointsb14);
var curveb14 = MAP(bez14)(domain);

var sur12 = BEZIER(S1)([bez11,bez12])
var surface12 = MAP(sur12)(dom2d)

var sur13 = BEZIER(S1)([bez11,bez13])
var surface13 = MAP(sur13)(dom2d)

var sur34 = BEZIER(S1)([bez13,bez14])
var surface34 = MAP(sur34)(dom2d)

var sur24 = BEZIER(S1)([bez12,bez14])
var surface24 = MAP(sur24)(dom2d)

var baseSup = STRUCT([surface12,surface24,surface34,surface13])
var baseInf = STRUCT([surface1,surface2,surface3,surface4])

var baseCompleta = STRUCT([COLOR(rgb01(198,198,197))(baseInf),COLOR(rgb01(47,51,53))(baseSup),T([0,1,2])([-1,-1,-1.1])(base)])

// Parte superiore rotational

var domainRot = DOMAIN([[0,1],[0,2*PI]])([50,50]);

var profile = BEZIER(S0)([[0,0,4.2],[2.5,0,4.2],[5,0,4.2]]);
var mapping = ROTATIONAL_SURFACE(profile);
var surface = MAP(mapping)(domainRot);
var coloredSurface = COLOR(rgb01(230,145,0))(surface)

var profile2 = BEZIER(S0)([[5,0,4.2],[5.2,0,4.1],[5,0,4]]);
var mapping2 = ROTATIONAL_SURFACE(profile2);
var surfaceTor = MAP(mapping2)(domainRot);
var parteSupCompleta =  STRUCT([COLOR(rgb01(47,51,53))(surfaceTor),coloredSurface])
var model = STRUCT([T([0,1])([2,2])(parteSupCompleta),baseCompleta])

DRAW(model)