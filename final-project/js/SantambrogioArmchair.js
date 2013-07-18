function generateKnot(controlPoints){
  lun = controlPoints.length + 2 + 1;
  var nodeSeq = []
  nodeSeq[0] = 0;
  nodeSeq[1] = 0;
  nodeSeq[2] = 0;
  for (i = 3; i <= lun - 4 ; i++) {
    nodeSeq[i] = i-2;
  };
  nodeSeq[lun-1] = i-2
  nodeSeq[lun-2] = i-2
  nodeSeq[lun-3] = i-2
  return nodeSeq
}

function rgb01(r, g, b){
  var r0 = r/255.0;
  var g0 = g/255.0;
  var b0 = b/255.0;
  return [r0, g0, b0, 1];
}

var domain = INTERVALS(1)(50)
var dom2d = DOMAIN([[0,1],[0,1]])([50,50]);
var domainRot = DOMAIN([[0,1],[0,2*PI]])([50,50]);

//bracciolo
var points11 = [[0,0,0],[0,0,7],[0,0,7],[0,5,7],[0,5,7],[0,5,12],[0,5,12],[0,8,12],[0,8,12],[0,8,0],[0,8,0],[0,0,0]]
var knots11 = generateKnot(points11)
var nubs11 = NUBS(S0)(2)(knots11)(points11);
var curve11 = MAP(nubs11)(domain);

var points12 = [[1,0,0],[1,0,7],[1,0,7],[1,5,7],[1,5,7],[1,5,12],[1,5,12],[1,8,12],[1,8,12],[1,8,0],[1,8,0],[1,0,0]]
var knots12 = generateKnot(points12)
var nubs12 = NUBS(S0)(2)(knots12)(points12);
var curve12 = MAP(nubs12)(domain);

var points13 = [[0.5,-0.5,0],[0.5,-0.5,7.5],[0.5,-0.5,7.5],[0.5,4.5,7.5],[0.5,4.5,7.5],[0.5,4,12],[0.5,4,12],[0.5,8,12],[0.5,8,12],[0.5,8,0],[0.5,8,0],[0.5,-0.5,0]]
var knots13 = generateKnot(points13)
var nubs13 = NUBS(S0)(2)(knots13)(points13);
var curve13 = MAP(nubs13)(domain);

var sur11 = BEZIER(S1)([nubs11,[0,6,6]])
var surface11 = MAP(sur11)(dom2d)

var sur12 = BEZIER(S1)([nubs11,nubs13,nubs12])
var surface12 = MAP(sur12)(dom2d)

var sur13 = BEZIER(S1)([nubs12,[1,6,6]])
var surface13 = MAP(sur13)(dom2d)

var bracciolo= STRUCT([surface11,surface12,surface13])

//cuscino

var pointcusc1 = [[0,0,0],[0,2.5,-0.4],[0,5,0],[0,5,0],[0,5.2,0.75],[0,5,1.5],[0,5,1.5],[0,2.5,1.9],[0,0,1.5],[0,0,1.5],[0,-0.2,0.75],[0,0,0]]
var knotcusc1 = generateKnot(pointcusc1)
var nubscusc1 = NUBS(S0)(2)(knotcusc1)(pointcusc1);
var curvecusc1 = MAP(nubscusc1)(domain);

var pointcusc2 = [[7,0,0],[7,2.5,-0.4],[7,5,0],[7,5,0],[7,5.2,0.75],[7,5,1.5],[7,5,1.5],[7,2.5,1.9],[7,0,1.5],[7,0,1.5],[7,-0.2,0.75],[7,0,0]]
var knotcusc2 = generateKnot(pointcusc2)
var nubscusc2 = NUBS(S0)(2)(knotcusc2)(pointcusc2);
var curvecusc2 = MAP(nubscusc2)(domain);

var surcusc1 = BEZIER(S1)([nubscusc1,nubscusc2])
var surfacecusc1 = MAP(surcusc1)(dom2d)

var surcusc2 = BEZIER(S1)([nubscusc2,[7,2.5,0.75]])
var surfacecusc2 = MAP(surcusc2)(dom2d)

var surcusc3 = BEZIER(S1)([nubscusc1,[0,2.5,0.75]])
var surfacecusc3 = MAP(surcusc3)(dom2d)

var cuscino = S([1])([0.97])(STRUCT([surfacecusc1,surfacecusc2,surfacecusc3]))

// schienale

var points1 = [[0,0,0],[0,0,4.5],[0,0,4.5],[0,2,11],[0,2,11],[0,3,11],[0,3,11],[0,3,0],[0,3,0],[0,0,0]]
var knots1 = generateKnot(points1)
var nubss1 = NUBS(S0)(2)(knots1)(points1);
var curves1 = MAP(nubss1)(domain);

var points2 = [[7,0,0],[7,0,4.5],[7,0,4.5],[7,2,11],[7,2,11],[7,3,11],[7,3,11],[7,3,0],[7,3,0],[7,0,0]]
var knots2 = generateKnot(points2)
var nubss2 = NUBS(S0)(2)(knots2)(points2);
var curves2 = MAP(nubss2)(domain);

var surs12= BEZIER(S1)([nubss1,nubss2])
var surfaces12 = MAP(surs12)(dom2d)

var baseInf = CUBOID([7,5,3.4])
var baseSup = CUBOID([7,1,0.98])
var base = COLOR([0,0,0])(S([0,1])([0.6,0.6])(EXTRUDE([0.2])(DISK()())))
var basi =STRUCT([T([0,1,2])([1,1,-0.2])(base),T([0,1,2])([1,7,-0.2])(base),T([0,1,2])([8,7,-0.2])(base),T([0,1,2])([8,1,-0.2])(base)])
var poltrona = S([2])([0.8])(COLOR(rgb01(175,89,67))(STRUCT([bracciolo,T([0])([8])(bracciolo),T([0,2])([1,3.5])(cuscino),T([0])([1])(baseInf),T([0,1,2])([1,7,11.02])(baseSup),T([0,1])([1,5])(surfaces12)])))

var model = STRUCT([poltrona,basi])
DRAW(model)


