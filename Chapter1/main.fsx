#r "./node_modules/fable-core/Fable.Core.Dll"
#load "./node_modules/fable-import-pixi/Fable.Import.Pixi.fs"

open System
open Fable.Core
open Fable.Import
open Fable.Import.Browser


let width = 800.
let height = 400.0

type Circle = 
    {X:float; Y:float;  Scale:float; ScaleSpeed: float; lrSpeed:float;
    hRad:float; vRad:float ; hRadInc:float; vRadInc:float; lr:float}

let canvas = Browser.document.getElementsByTagName_canvas().[0]
let ctx = canvas.getContext_2d()

canvas.height <- height
canvas.width <- width

let drawBg  (ctx:Browser.CanvasRenderingContext2D) canvas = 
    ctx.fillStyle <-U3.Case1 "black"
    ctx.fillRect(0.,0.,width,height)

let drawCircle (ctx:Browser.CanvasRenderingContext2D) canvas x y scale = 
    ctx.save()
    ctx.beginPath() 
    //ctx.transform(scale,0.,0.,scale,0.,0.)
    ctx.arc (x , y, 15. + scale, 0., 2. * Math.PI, false)
    console.log("Drawing X: " + x.ToString())
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
    float (4 + r.Next())

let hRadInc = 0.1
let vRadInc = 0.1


let MyCircle =
    {X= width/2.; Y= height/2.; Scale = 1. ; ScaleSpeed = 0.2 ; lrSpeed = lrSpeed();
        hRad = hRad(); vRad = vRad(); hRadInc = hRadInc; vRadInc = vRadInc; lr= 0.}


drawBg ctx canvas

drawCircle ctx canvas MyCircle.X MyCircle.Y MyCircle.Scale

let rec loop circle = async {
    ctx.clearRect(0.,0.,width,height)
    drawBg ctx canvas
    drawCircle ctx canvas circle.X circle.Y circle.Scale
    
    let newX = (width / 2.) + circle.hRad * Math.Sin(circle.lr * Math.PI/180.)
    console.log("NewX calculated: " + newX.ToString())
    console.log("lrSpeed: " + circle.lrSpeed.ToString())
    console.log("lr: " + circle.lr.ToString())
    let newHrad = circle.hRad + circle.hRadInc
    let newLr = circle.lr + circle.lrSpeed
    let circle  = {circle with hRad = newHrad; lr= newLr; X = newX; Scale = circle.Scale + circle.ScaleSpeed}
    do! Async.Sleep(int (1000/60))
    return! loop circle

}

loop MyCircle |> Async.StartImmediate


