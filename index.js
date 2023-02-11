const CanvasElement = document.getElementById("canvas"),
        CTX = CanvasElement.getContext("2d");

CTX.canvas.width = window.innerWidth;
CTX.canvas.height = window.innerHeight;

const CanvasWidth = CTX.canvas.width;
const CanvasHeight = CTX.canvas.height;

// You Could Also Use 2 Dimensional Arrays Here But Its All Really Simple So I Didnt Bother Using Multi Dimensional Arrays.

// Private Vars
let StarsX = [];
let StarsZ = [];
let StarsVelX = [];
let StarsVelZ = [];
let StarsRadius = [];

// Public Vars
let StarsAmount = 150;
let MoveSpeed = 2;
let CheckRadius = 100;
let LineColor = "#fefefe";

CTX.fillStyle = "#fefefe";

// Generating Stars Position For The First Time
// If You Wanna Add Colors And Whatnot, Just Make Array Then Give Them Initial Value, You Can Change That Later On.
for (i = 0; i < StarsAmount; i++)
{
    StarsX.push(Math.floor(Math.random() * (CanvasWidth - 1 + 1) + 1));
    StarsZ.push(Math.floor(Math.random() * (CanvasHeight - 1 + 1) + 1));
    StarsVelX.push(Math.random()) * 2 - 1;
    StarsVelZ.push(Math.random()) * 2 - 1;
    StarsRadius.push(Math.floor(Math.random() * (5 - 2 + 1) + 2));
}

function AnimateStars()
{
    CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height);

    for (let i = 0; i < StarsAmount; i++)
    {
        if (StarsX[i] > window.innerWidth || StarsZ[i] > window.innerHeight || StarsX[i] < 0 || StarsZ[i] < 0)
        {
            StarsX[i] = Math.floor(Math.random() * (CanvasWidth - 1 + 1) + 1);
            StarsZ[i] = Math.floor(Math.random() * (CanvasHeight - 1 + 1) + 1);            
            StarsVelX[i] = Math.random() * 2 - 1;
            StarsVelZ[i] = Math.random() * 2 - 1;
        }

        for (let j = 0; j < StarsAmount; j++)
        {
            if ((StarsX[i] - StarsX[j]) * (StarsX[i] - StarsX[j]) + (StarsZ[i] - StarsZ[j]) * (StarsZ[i] - StarsZ[j]) <= CheckRadius * CheckRadius)
            {
                CTX.beginPath();
                CTX.moveTo(StarsX[i], StarsZ[i]);
                CTX.lineTo(StarsX[j], StarsZ[j]);
                CTX.closePath();
                Random = Math.random();
                CTX.strokeStyle = LineColor;
                CTX.stroke(); 
            }
        }

        CTX.beginPath();
        CTX.arc(StarsX[i], StarsZ[i], StarsRadius[i], 0, Math.PI * 2, true);
        CTX.closePath();
        CTX.fill();

        StarsX[i] += StarsVelX[i] * MoveSpeed;
        StarsZ[i] += StarsVelZ[i] * MoveSpeed;
    }

    requestAnimationFrame(AnimateStars);
}

document.querySelector("#bg-color").addEventListener("change", () =>
{
    document.querySelector("body").style.backgroundColor = document.querySelector("#bg-color").value;
});
document.querySelector("#vertex-color").addEventListener("change", () =>
{
    CTX.fillStyle = document.querySelector("#vertex-color").value;
});
document.querySelector("#line-color").addEventListener("change", () =>
{
    LineColor = document.querySelector("#line-color").value; 
});
document.querySelector("#stars-ipt").addEventListener("change", () =>
{
    StarsAmount = document.querySelector("#stars-ipt").value;
    StarsX.length = 0;
    StarsZ.length = 0;
    StarsVelX.length = 0;
    StarsVelZ.length = 0;
    StarsRadius.length = 0;
    for (i = 0; i < StarsAmount; i++)
    {
        StarsX.push(Math.floor(Math.random() * (CanvasWidth - 1 + 1) + 1));
        StarsZ.push(Math.floor(Math.random() * (CanvasHeight - 1 + 1) + 1));
        StarsVelX.push(Math.random()) * 2 - 1;
        StarsVelZ.push(Math.random()) * 2 - 1;
        StarsRadius.push(Math.floor(Math.random() * (5 - 2 + 1) + 2));
    }
});
document.querySelector("#speed-ipt").addEventListener("change", () =>
{
    MoveSpeed = document.querySelector("#speed-ipt").value;
});
document.querySelector("#radius-ipt").addEventListener("change", () =>
{
    CheckRadius = document.querySelector("#radius-ipt").value;
});

// Calling The Animation
requestAnimationFrame(AnimateStars);