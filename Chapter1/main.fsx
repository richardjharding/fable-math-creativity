#r "./node_modules/fable-core/Fable.Core.Dll"
#load "./node_modules/fable-import-pixi/Fable.Import.Pixi.fs"

open System
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import.PIXI
open Fable.Import.Browser



importAll "core-js"

let options = [
  BackgroundColor (float 0x1099bb)
  Resolution 1.
]

let renderer =
  Globals.autoDetectRenderer( 800., 600., options )
  |> unbox<SystemRenderer>

let gameDiv = document.getElementById("game")
gameDiv.appendChild( renderer.view )

let rand = new Random()

type Circle = {
    graphic:Graphics
    hRad:float
    vRad:float
    hRadInc:float
    vRadInc: float
    mutable lr: float
    lrSpeed: float
}

let hRad () =
    float (4 + rand.Next())

let vRad () =
    float (4 + rand.Next())



let drawCircle (circle:Graphics) (x:float) (y:float) =     
    circle.lineStyle (4., float 0xffd900, 1.) |> ignore
    circle.beginFill(float 0xFFFF0B, 0.5) |> ignore
    circle.drawCircle(x,y,50.) |> ignore
    
    circle.endFill() |> ignore
    circle
    
let startList = [1..10]

let gList =
    startList |> List.map (fun i ->
                    let g = Graphics()
                    let r = new Random()
                    let x = float ( 400)
                    console.log ("x: " + x.ToString())
                    let y = float (300)
                    let g = drawCircle g x y
                    {graphic = g ; hRad = hRad(); vRad = vRad();hRadInc = 0.1; vRadInc = 0.1; lr = 0.; lrSpeed = 0.1}
                    )

// create the root of the scene graph
let stage = Container()

gList |> List.iter (fun g -> (
                                        //console.log (g.graphic.x.ToString())
                                        stage.addChild(g.graphic) |> ignore
                                        //console.log (g.graphic.x.ToString())
                                    )
                                )




let rec animate (dt:float) =
  window.requestAnimationFrame(FrameRequestCallback animate) |> ignore

  gList |>List.iter (fun g ->  
                        //console.log(g.position.x.ToString())
                        g.lr <- g.lr + g.lrSpeed
                        let b = g.graphic.getBounds()
                        console.log ("bounds x : " + b.x.ToString())
                        let x = (b.width/2. + g.hRad * Math.Sin(g.lr * Math.PI/180.0)) /1000000.
                        //console.log(x.ToString())
                        let y = b.width/2. + g.vRad * Math.Cos(g.lr * Math.PI/180.0) /1000000.
                        //let y= b.y //5. - 6.0 * Math.Cos(0.3)
                        //let x =  6.0 * Math.Sin(0.3)
                        g.graphic.position.set(x,y) |> ignore
                        ignore()
                        //console.log (x)
                        //g.position.set(x,y) |> ignore
                        //console.log (b.x)
                        //g.position.set(
                        )


  // just for fun, let's rotate mr rabbit a little
//   bunny.rotation <- bunny.rotation + 0.2
//  // let p = new Point(0.1, 0.1)
//   scaleShape graphics
//   graphics.alpha <- graphics.alpha * 0.97

//   if(graphics.scale.x > 35.0) then
//     graphics.scale.x <- 1.0
//     graphics.scale.y <- 1.0
//     graphics.alpha <- 1.0

//   console.log("scaleX = " + bunny.scale.x.ToString())

  // render the container
  renderer.render(stage)

// start animating
animate 0.