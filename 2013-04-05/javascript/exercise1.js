
var circle = CIRCLE(0.5)(36);
var pillar = EXTRUDE([10])(circle)

pillars0round = STRUCT(REPLICA([5])([pillar,T([0])([10])]))
pillars0square = SIMPLEX_GRID([[-4.5,1,-3.5,1,-9,1,-9,1],[1],[10]  ])
pillars2square = SIMPLEX_GRID([[1,-9,1,-29,1],[1],[10]  ])
pillars22square = SIMPLEX_GRID([[1,-8.5,1,-9,1,-9,1,-9.5,1],[1],[10]  ])


pillars1square =  T([0,1,2])([-0.5,-0.5,10])(SIMPLEX_GRID([[1,-9,1,-9,1,-9,1,-9,1],[1],[10]]))
pillars12square = T([0,1,2])([-1,19.5,10])(SIMPLEX_GRID([[-0.5,1,-8.5,1,-9,1,-9,-10.5,1],[1],[10]]))
pillarSmall = CUBOID([0.5,0.5,10])
pillars3square = SIMPLEX_GRID([[-20,1,-19,1],[1],[10]  ])
pillars33square = SIMPLEX_GRID([[-20,1,-9,1,-9.5,1],[1],[10]  ])

pillars0 = STRUCT([pillars0round,T([1])([20])(pillar),T([1])([19.5])(pillars0square)])
pillars3 = T([0,1,2])([-0.5,-0.5,30])(STRUCT([pillars3square,T([0,1])([-0.5,20])(pillars33square),T([0,1])([9.5,20.5])(pillarSmall),T([1])([20.5])(pillarSmall),T([0,1])([40,24])(S([0,1])([2,2])(pillarSmall))]))
pillars1 = STRUCT([pillars1square,pillars12square,T([0,1,2])([2,19.5,10])(pillarSmall),T([0,1,2])([29.5,20,10])(pillar)])
pillars2 = T([0,1,2])([-0.5,-0.5,20])(STRUCT([pillars2square,T([1])([20])(pillars22square)]))
pillars = STRUCT([pillars0, pillars1,pillars2,pillars3])

buildings = STRUCT([pillars])


DRAW(buildings);