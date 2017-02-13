#r "./node_modules/fable-core/Fable.Core.Dll"

open System
open Fable.Core
open Fable.Import
open Fable.Import.Browser

let width = 800.
let height = 400.0

type Circle = 
    {X:float; Y:float;  Scale:float; ScaleSpeed: float; lrSpeed:float; alpha:float;
    hRad:float; vRad:float ; hRadInc:float; vRadInc:float; lr:float}

let canvas = Browser.document.getElementsByTagName_canvas().[0]
let ctx = canvas.getContext_2d()

canvas.height <- height
canvas.width <- width

let drawBg  (ctx:Browser.CanvasRenderingContext2D) canvas = 
    ctx.fillStyle <-U3.Case1 "black"
    ctx.fillRect(0.,0.,width,height)

let drawCircle (ctx:Browser.CanvasRenderingContext2D) x y scale alpha = 
    ctx.save()    
    ctx.globalAlpha <- alpha
    ctx.beginPath() 
    ctx.arc (x , y, 15. + scale, 0., 2. * Math.PI, false)    
    ctx.fillStyle <- U3.Case1 "red"
    ctx.fill()
    ctx.stroke()
    ctx.restore()

let r = new Random()

let lrSpeed () =     
     float (5 + r.Next(1,1000)/100)

let hRad () =
    float (4 + r.Next(1,1000)/100)

let vRad () =
     float (4 + r.Next(1,1000)/100)

let hRadInc = 0.1
let vRadInc = 0.1
let scaleMax = 90.

let createCircle () =
    {X= width/2.; Y= height/2.; Scale = 1. ; ScaleSpeed = 0.6 ; lrSpeed = lrSpeed(); alpha = 1.0;
        hRad = hRad(); vRad = vRad(); hRadInc = hRadInc; vRadInc = vRadInc; lr= 0.}

let setAlpha (circle:Circle) = 
    if(circle.Scale > scaleMax) then         
        {circle with alpha = circle.alpha - 0.016}
    else
        circle

let calculateNewCoords (circle:Circle) = 
    let newX = (width / 2.) + circle.hRad * Math.Sin(circle.lr * Math.PI/180.)
    let newY = height /2. + circle.vRad * Math.Cos(circle.lr * Math.PI/180.)  
    newX, newY

let updateCircle (circle:Circle) =
    let newX,newY = calculateNewCoords circle                   
    let newHrad = circle.hRad + circle.hRadInc
    let newVrad = circle.vRad + circle.vRadInc
    let newLr = circle.lr + circle.lrSpeed
    {circle with hRad = newHrad; vRad = newVrad; lr= newLr; X = newX; Y = newY; Scale = circle.Scale + circle.ScaleSpeed}
    
let myCircles = 
    [createCircle()]

let rec loop (circles:Circle list) = async {
    ctx.clearRect(0.,0.,width,height)
    drawBg ctx canvas

    circles |> List.iter (fun c -> drawCircle ctx c.X c.Y c.Scale c.alpha)

    let circles = circles 
                    |> List.map (fun circle -> circle |> (updateCircle >> setAlpha))     
                    |> List.filter (fun circle -> circle.alpha > 0.)
    
    do! Async.Sleep(int (1000/60))

    let f = r.Next(1,1000)/ 10 
    if(f >= 98)
    then
        return! loop  (createCircle() :: circles)
    else
        return! loop circles
}

loop myCircles |> Async.StartImmediate


