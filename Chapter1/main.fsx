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

let drawCircle (ctx:Browser.CanvasRenderingContext2D) canvas x y scale alpha = 
    ctx.save()    
    ctx.globalAlpha <- alpha
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
     float (4 + r.Next(1,1000)/100)

let hRadInc = 0.1
let vRadInc = 0.1
let scaleMax = 80.



let MyCircle =
    {X= width/2.; Y= height/2.; Scale = 1. ; ScaleSpeed = 0.6 ; lrSpeed = lrSpeed(); alpha = 1.0;
        hRad = hRad(); vRad = vRad(); hRadInc = hRadInc; vRadInc = vRadInc; lr= 0.}


let myCircles = 
    [MyCircle]
let setAlpha (circle:Circle) = 
    if(circle.Scale > scaleMax) then         
        {circle with alpha = circle.alpha - 0.017}
    else
        circle

drawBg ctx canvas

drawCircle ctx canvas MyCircle.X MyCircle.Y MyCircle.Scale

let rec loop (circles:Circle list) = async {
    ctx.clearRect(0.,0.,width,height)
    drawBg ctx canvas

    let circles = circles 
                    |> List.map (fun circle -> 
                    drawCircle ctx canvas circle.X circle.Y circle.Scale circle.alpha
                
                    let newX = (width / 2.) + circle.hRad * Math.Sin(circle.lr * Math.PI/180.)
                    let newY = height /2. + circle.vRad * Math.Cos(circle.lr * Math.PI/180.)
                    console.log("NewX calculated: " + newX.ToString())
                    console.log("lrSpeed: " + circle.lrSpeed.ToString())
                    console.log("lr: " + circle.lr.ToString())
                    console.log("Scale: " + circle.Scale.ToString())
                    let newHrad = circle.hRad + circle.hRadInc
                    let newVrad = circle.vRad + circle.vRadInc
                    let newLr = circle.lr + circle.lrSpeed
                    let circle  =  {circle with hRad = newHrad; vRad = newVrad; lr= newLr; X = newX; Y = newY; Scale = circle.Scale + circle.ScaleSpeed}
                                |> setAlpha
                    circle    
                    )     
                    |> List.filter (fun circle -> 
                                        circle.alpha > 0.
                                    )
                    
    let f = r.Next(1,1000)/ 10
    
    
    do! Async.Sleep(int (1000/60))

    if(f >= 97)
    then
        return! loop  (MyCircle :: circles)
    else
        return! loop circles

}

loop myCircles |> Async.StartImmediate


