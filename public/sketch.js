// ============================================================
// SPACE GIRL ADVENTURE
// p5.js
// JUEGO DE PLATAFORMAS ESPACIAL FUTURISTA
// ============================================================


// ============================================================
// VARIABLES GENERALES
// ============================================================

let level = 1;
let score = 70;
let lives = 3;

let gameState = "playing";

let worldWidth = 5200;

let cameraX = 0;
let cameraY = 0;

let player;

let platforms = [];
let cloudStations = [];
let enemies = [];
let stars = [];
let powerUps = [];

let particles = [];
let floatingTexts = [];
let backgroundStars = [];

let alienPlants = [];
let alienRocks = [];
let alienCrystals = [];

let lastTime = 0;

let portalCooldown = 0;

let gemsCollected = 0;

let flightTimer = 0;
const FLIGHT_DURATION = 480;

let levelGemAwarded = false;


// ============================================================
// COLORES
// ============================================================

const LEVEL_COLORS = [
  {
    main: [40, 220, 255],
    second: [100, 70, 255],
    accent: [255, 80, 190]
  },
  {
    main: [110, 240, 255],
    second: [170, 70, 255],
    accent: [255, 70, 220]
  },
  {
    main: [130, 255, 180],
    second: [90, 170, 255],
    accent: [255, 90, 210]
  }
];


// ============================================================
// SETUP
// ============================================================

function setup() {

  createCanvas(windowWidth, windowHeight);

  pixelDensity(1);

  player = createPlayer();

  createBackgroundStars();

  startLevel(1);

  lastTime = millis();
}


// ============================================================
// DRAW
// ============================================================

function draw() {

  let now = millis();

  let dt =
    (now - lastTime) / 16.6667;

  dt = constrain(dt, 0.5, 2.0);

  lastTime = now;


  if (portalCooldown > 0) {
    portalCooldown -= dt;
  }


  if (gameState === "playing") {

    updateGame(dt);

    drawBackground();

    push();

    translate(
      -cameraX,
      -cameraY
    );

    drawWorld();

    drawParticles();

    drawPlayer();

    pop();

    drawFloatingTexts();

    drawHUD();

  } else {

    drawBackground();

    drawEndScreen();
  }
}


// ============================================================
// CREAR JUGADORA
// ============================================================

function createPlayer() {

  return {

    x: 220,
    y: 300,

    w: 42,
    h: 68,

    vx: 0,
    vy: 0,

    speed: 0.65,
    maxSpeed: 6.2,

    jumpPower: -13.5,

    onGround: false,

    facing: 1,

    invulnerable: 0,

    jetTime: 0,

    animTime: 0,

    bodyLean: 0
  };
}


// ============================================================
// COMENZAR NIVEL
// ============================================================

function startLevel(n) {

  level = n;

  platforms = [];
  cloudStations = [];
  enemies = [];
  stars = [];
  powerUps = [];
  particles = [];
  floatingTexts = [];

  alienPlants = [];
  alienRocks = [];
  alienCrystals = [];

  cameraX = 0;
  cameraY = 0;

  flightTimer = 0;

  levelGemAwarded = false;

  portalCooldown = 45;

  player.x = 220;
  player.vx = 0;
  player.vy = 0;
  player.invulnerable = 0;


  if (level === 1) {

    player.y = 420;

    createLevelOne();
  }


  if (level === 2) {

    player.y = 420;

    createLevelTwo();
  }


  if (level === 3) {

    createLevelThree();

    player.y =
      alienGroundY(player.x) -
      player.h / 2;
  }
}


// ============================================================
// NIVEL 1
// ============================================================

function createLevelOne() {

  addPlatform(0, 510, 520, 40);
  addPlatform(610, 440, 260, 28);
  addPlatform(980, 510, 300, 40);
  addPlatform(1390, 410, 260, 28);
  addPlatform(1750, 500, 330, 40);
  addPlatform(2180, 390, 250, 28);
  addPlatform(2530, 500, 320, 40);
  addPlatform(2960, 420, 280, 28);
  addPlatform(3330, 500, 350, 40);
  addPlatform(3790, 400, 270, 28);
  addPlatform(4150, 500, 360, 40);
  addPlatform(4600, 420, 300, 28);
  addPlatform(5000, 500, 220, 40);

  addPlatform(420, 350, 120, 22);
  addPlatform(850, 320, 110, 22);
  addPlatform(1280, 330, 100, 22);
  addPlatform(1650, 300, 100, 22);
  addPlatform(2050, 310, 100, 22);
  addPlatform(2430, 300, 100, 22);
  addPlatform(2850, 320, 100, 22);
  addPlatform(3250, 300, 100, 22);
  addPlatform(3670, 310, 100, 22);
  addPlatform(4070, 300, 100, 22);
  addPlatform(4550, 310, 100, 22);

  createStandardStars();
  createStandardEnemies();

  powerUps.push({
    type: "flight",
    x: 1110,
    y: 450,
    collected: false,
    rotation: 0
  });

  powerUps.push({
    type: "heart",
    x: 3950,
    y: 350,
    collected: false,
    rotation: 0
  });
}


// ============================================================
// NIVEL 2
// ============================================================

function createLevelTwo() {

  addCloudStation(0, 520, 520, 65);
  addCloudStation(650, 450, 310, 60);
  addCloudStation(1060, 520, 360, 65);
  addCloudStation(1510, 410, 330, 58);
  addCloudStation(1940, 500, 350, 65);
  addCloudStation(2380, 390, 300, 58);
  addCloudStation(2780, 500, 360, 65);
  addCloudStation(3230, 410, 320, 58);
  addCloudStation(3650, 500, 360, 65);
  addCloudStation(4090, 400, 300, 58);
  addCloudStation(4470, 500, 380, 65);
  addCloudStation(4920, 410, 300, 58);

  addCloudStation(480, 320, 120, 42);
  addCloudStation(970, 290, 120, 42);
  addCloudStation(1430, 300, 110, 42);
  addCloudStation(1840, 290, 110, 42);
  addCloudStation(2290, 280, 110, 42);
  addCloudStation(2720, 300, 110, 42);
  addCloudStation(3160, 290, 110, 42);
  addCloudStation(3590, 300, 110, 42);
  addCloudStation(4030, 280, 110, 42);
  addCloudStation(4420, 300, 110, 42);

  createLevelTwoStars();
  createLevelTwoEnemies();

  powerUps.push({
    type: "star",
    x: 1260,
    y: 455,
    collected: false,
    rotation: 0
  });

  powerUps.push({
    type: "flight",
    x: 2500,
    y: 330,
    collected: false,
    rotation: 0
  });

  powerUps.push({
    type: "heart",
    x: 4550,
    y: 450,
    collected: false,
    rotation: 0
  });
}


// ============================================================
// NIVEL 3
// ============================================================

function createLevelThree() {

  createLevelThreeStars();
  createLevelThreeEnemies();

  createAlienEnvironment();

  powerUps.push({
    type: "star",
    x: 1450,
    y: alienGroundY(1450) - 60,
    collected: false,
    rotation: 0
  });

  powerUps.push({
    type: "flight",
    x: 2700,
    y: alienGroundY(2700) - 70,
    collected: false,
    rotation: 0
  });

  powerUps.push({
    type: "heart",
    x: 4450,
    y: alienGroundY(4450) - 65,
    collected: false,
    rotation: 0
  });
}


// ============================================================
// PLATAFORMAS
// ============================================================

function addPlatform(x, y, w, h) {

  platforms.push({
    x: x,
    y: y,
    w: w,
    h: h
  });
}


// ============================================================
// ESTACIONES
// ============================================================

function addCloudStation(x, y, w, h) {

  cloudStations.push({
    x: x,
    y: y,
    w: w,
    h: h,
    pulse: random(TWO_PI)
  });
}


// ============================================================
// ESTRELLAS NIVEL 1
// ============================================================

function createStandardStars() {

  let positions = [
    [520, 285],
    [760, 380],
    [1130, 350],
    [1450, 330],
    [1840, 420],
    [2240, 300],
    [2610, 400],
    [3000, 330],
    [3410, 400],
    [3870, 300],
    [4250, 360],
    [4700, 340]
  ];

  for (let p of positions) {

    stars.push({
      x: p[0],
      y: p[1],
      collected: false,
      rotation: random(TWO_PI),
      pulse: random(TWO_PI)
    });
  }
}


// ============================================================
// ESTRELLAS NIVEL 2
// ============================================================

function createLevelTwoStars() {

  for (let i = 0; i < 18; i++) {

    stars.push({
      x: 300 + i * 275,
      y: random(220, 430),
      collected: false,
      rotation: random(TWO_PI),
      pulse: random(TWO_PI)
    });
  }
}


// ============================================================
// ESTRELLAS NIVEL 3
// ============================================================

function createLevelThreeStars() {

  for (let i = 0; i < 15; i++) {

    let x = 350 + i * 330;

    stars.push({
      x: x,
      y: alienGroundY(x) - random(80, 145),
      collected: false,
      rotation: random(TWO_PI),
      pulse: random(TWO_PI)
    });
  }
}


// ============================================================
// ENEMIGOS NIVEL 1
// DRONES TECNOLÓGICOS
// ============================================================

function createStandardEnemies() {

  let positions = [
    [760, 390],
    [1200, 455],
    [1530, 355],
    [1900, 445],
    [2290, 335],
    [2700, 445],
    [3060, 365],
    [3470, 445],
    [3910, 345],
    [4300, 445],
    [4700, 365]
  ];

  for (let p of positions) {

    enemies.push({

      kind: "drone",

      x: p[0],
      y: p[1],

      baseY: p[1],

      w: 42,
      h: 28,

      vx: random([-1, 1]) * 1.2,

      phase: random(TWO_PI),

      alive: true,

      attack: random(TWO_PI)
    });
  }
}


// ============================================================
// ENEMIGOS NIVEL 2
// CRIATURAS ENERGÉTICAS
// ============================================================

function createLevelTwoEnemies() {

  let positions = [
    [780, 380],
    [1180, 470],
    [1640, 350],
    [2040, 450],
    [2460, 340],
    [2880, 450],
    [3320, 350],
    [3750, 450],
    [4200, 340],
    [4630, 450]
  ];

  for (let p of positions) {

    enemies.push({

      kind: "energy",

      x: p[0],
      y: p[1],

      baseY: p[1],

      w: 46,
      h: 38,

      vx: random([-1, 1]) * 0.85,

      phase: random(TWO_PI),

      alive: true,

      attack: random(TWO_PI)
    });
  }
}


// ============================================================
// ENEMIGOS NIVEL 3
// CRIATURAS ALIENÍGENAS
// ============================================================

function createLevelThreeEnemies() {

  let positions = [
    850,
    1300,
    1850,
    2350,
    2900,
    3450,
    3950,
    4500
  ];

  for (let x of positions) {

    enemies.push({

      kind: "alien",

      x: x,

      y:
        alienGroundY(x) - 35,

      baseY:
        alienGroundY(x) - 35,

      w: 48,
      h: 42,

      vx:
        random([-1, 1]) * 0.75,

      phase:
        random(TWO_PI),

      alive: true,

      attack:
        random(TWO_PI)
    });
  }
}


// ============================================================
// ENTORNO ALIENÍGENA
// ============================================================

function createAlienEnvironment() {

  for (
    let x = 100;
    x < worldWidth;
    x += 170
  ) {

    alienPlants.push({

      x: x + random(-35, 35),

      scale:
        random(0.55, 1.15),

      phase:
        random(TWO_PI)
    });
  }


  for (
    let x = 180;
    x < worldWidth;
    x += 310
  ) {

    alienRocks.push({

      x: x + random(-50, 50),

      size:
        random(0.7, 1.4),

      phase:
        random(TWO_PI)
    });
  }


  for (
    let x = 280;
    x < worldWidth;
    x += 420
  ) {

    alienCrystals.push({

      x: x + random(-80, 80),

      scale:
        random(0.7, 1.3),

      phase:
        random(TWO_PI)
    });
  }
}


// ============================================================
// ESTRELLAS DEL FONDO
// ============================================================

function createBackgroundStars() {

  backgroundStars = [];

  for (let i = 0; i < 200; i++) {

    backgroundStars.push({

      x: random(-100, width + 100),

      y:
        random(
          height * 0.03,
          height * 0.75
        ),

      size:
        random(0.6, 2.2),

      speed:
        random(0.15, 0.7),

      phase:
        random(TWO_PI),

      layer:
        random(0.2, 1)
    });
  }
}


// ============================================================
// ACTUALIZAR JUEGO
// ============================================================

function updateGame(dt) {

  updatePlayer(dt);

  updateEnemies(dt);

  updateParticles(dt);

  updateFloatingTexts(dt);

  updatePowerUps(dt);

  checkStars();

  checkPowerUps();

  checkEnemyCollisions();

  checkPortal();

  updateCamera(dt);
}


// ============================================================
// ACTUALIZAR JUGADORA
// ============================================================

function updatePlayer(dt) {

  let left =
    keyIsDown(LEFT_ARROW) ||
    keyIsDown(65);

  let right =
    keyIsDown(RIGHT_ARROW) ||
    keyIsDown(68);


  // ----------------------------------------------------------
  // MOVIMIENTO HORIZONTAL
  // ----------------------------------------------------------

  if (left) {

    player.vx -=
      player.speed * dt;

    player.facing = -1;
  }

  if (right) {

    player.vx +=
      player.speed * dt;

    player.facing = 1;
  }


  player.vx =
    constrain(
      player.vx,
      -player.maxSpeed,
      player.maxSpeed
    );


  if (!left && !right) {

    player.vx *=
      pow(0.78, dt);
  }


  // ----------------------------------------------------------
  // GRAVEDAD
  //
  // NIVEL 1 = NORMAL
  // NIVEL 2 = BAJA GRAVEDAD
  // NIVEL 3 = NORMAL
  // ----------------------------------------------------------

  let gravity =
    level === 2
      ? 0.30
      : 0.72;


  // ----------------------------------------------------------
  // VUELO
  // ----------------------------------------------------------

  if (flightTimer > 0) {

    flightTimer -= dt;

    player.vy +=
      gravity * 0.55 * dt;


    if (keyIsDown(32)) {

      player.vy -=
        0.23 * dt;

      player.vy =
        constrain(
          player.vy,
          -5.0,
          4.2
        );

      player.jetTime += dt;
    }

  } else {

    player.vy +=
      gravity * dt;
  }


  // ----------------------------------------------------------
  // MOVIMIENTO
  // ----------------------------------------------------------

  player.x +=
    player.vx * dt;

  player.y +=
    player.vy * dt;


  player.x =
    constrain(
      player.x,
      20,
      worldWidth - 40
    );


  player.onGround = false;


  // ----------------------------------------------------------
  // NIVEL 3
  // ----------------------------------------------------------

  if (level === 3) {

    let groundY =
      alienGroundY(player.x);


    if (
      player.y +
        player.h / 2 >= groundY &&
      player.vy >= 0
    ) {

      player.y =
        groundY -
        player.h / 2;

      player.vy = 0;

      player.onGround = true;
    }
  }


  // ----------------------------------------------------------
  // NIVEL 1
  // ----------------------------------------------------------

  if (level === 1) {

    for (let p of platforms) {

      if (
        player.vy >= 0 &&
        player.x + player.w / 2 > p.x &&
        player.x - player.w / 2 <
          p.x + p.w &&
        player.y + player.h / 2 >= p.y &&
        player.y + player.h / 2 <=
          p.y + p.h + 16
      ) {

        player.y =
          p.y -
          player.h / 2;

        player.vy = 0;

        player.onGround = true;
      }
    }
  }


  // ----------------------------------------------------------
  // NIVEL 2
  // ----------------------------------------------------------

  if (level === 2) {

    for (let p of cloudStations) {

      if (
        player.vy >= 0 &&
        player.x + player.w / 2 > p.x &&
        player.x - player.w / 2 <
          p.x + p.w &&
        player.y + player.h / 2 >= p.y &&
        player.y + player.h / 2 <=
          p.y + p.h + 20
      ) {

        player.y =
          p.y -
          player.h / 2;

        player.vy = 0;

        player.onGround = true;
      }
    }
  }


  // ----------------------------------------------------------
  // CAÍDA
  // ----------------------------------------------------------

  if (
    player.y >
    height + 220
  ) {

    loseLife();

    return;
  }


  // ----------------------------------------------------------
  // ANIMACIÓN
  // ----------------------------------------------------------

  player.animTime +=
    dt *
    (
      0.13 +
      abs(player.vx) * 0.075
    );


  let desiredLean =
    constrain(
      player.vx * 0.018,
      -0.08,
      0.08
    );


  player.bodyLean =
    lerp(
      player.bodyLean,
      desiredLean,
      0.10 * dt
    );


  if (player.invulnerable > 0) {

    player.invulnerable -= dt;
  }
}


// ============================================================
// SALTO
// ============================================================

function jumpPlayer() {

  if (
    gameState !==
    "playing"
  ) {

    return;
  }


  if (player.onGround) {

    player.vy =
      player.jumpPower;

    player.onGround = false;

    createJumpParticles();

    return;
  }


  if (
    flightTimer > 0
  ) {

    player.vy =
      min(
        player.vy,
        -3.8
      );

    player.jetTime += 2;
  }
}


// ============================================================
// ACTUALIZAR ENEMIGOS
// ============================================================

function updateEnemies(dt) {

  for (let e of enemies) {

    if (!e.alive) continue;


    e.x +=
      e.vx * dt;


    // --------------------------------------------------------
    // NIVEL 1: DRONES
    // --------------------------------------------------------

    if (
      e.kind ===
      "drone"
    ) {

      e.y =
        e.baseY +
        sin(
          frameCount * 0.055 +
          e.phase
        ) * 9;

    }


    // --------------------------------------------------------
    // NIVEL 2: CRIATURAS ENERGÉTICAS
    // --------------------------------------------------------

    if (
      e.kind ===
      "energy"
    ) {

      e.y =
        e.baseY +
        sin(
          frameCount * 0.045 +
          e.phase
        ) * 22;

      e.x +=
        sin(
          frameCount * 0.025 +
          e.phase
        ) *
        0.35 *
        dt;
    }


    // --------------------------------------------------------
    // NIVEL 3: CRIATURAS ALIEN
    // --------------------------------------------------------

    if (
      e.kind ===
      "alien"
    ) {

      e.baseY =
        alienGroundY(e.x) -
        30;

      e.y =
        e.baseY +
        sin(
          frameCount * 0.08 +
          e.phase
        ) * 4;
    }


    if (
      e.x < 100 ||
      e.x >
        worldWidth - 100
    ) {

      e.vx *= -1;
    }
  }
}


// ============================================================
// POWER UPS
// ============================================================

function updatePowerUps(dt) {

  for (let p of powerUps) {

    if (!p.collected) {

      p.rotation +=
        0.025 * dt;
    }
  }
}


// ============================================================
// ESTRELLAS
// ============================================================

function checkStars() {

  for (let s of stars) {

    if (s.collected) continue;


    if (
      circleHitsPlayer(
        s.x,
        s.y,
        28
      )
    ) {

      s.collected = true;

      score += 10;

      createCollectParticles(
        s.x,
        s.y
      );

      addFloatingText(
        "+10",
        s.x,
        s.y,
        [255, 230, 80]
      );
    }
  }
}


// ============================================================
// POWER UPS
// ============================================================

function checkPowerUps() {

  for (let p of powerUps) {

    if (p.collected) continue;


    if (
      circleHitsPlayer(
        p.x,
        p.y,
        60
      )
    ) {

      collectPowerUp(p);
    }
  }
}


// ============================================================
// TOMAR POWER UP
// ============================================================

function collectPowerUp(p) {

  p.collected = true;


  if (
    p.type ===
    "flight"
  ) {

    flightTimer =
      FLIGHT_DURATION;

    player.jetTime = 0;

    player.vy =
      min(
        player.vy,
        -2.2
      );

    addFloatingText(
      "VUELO ACTIVADO",
      p.x,
      p.y,
      [80, 230, 255]
    );
  }


  if (
    p.type ===
    "heart"
  ) {

    lives =
      min(
        lives + 1,
        5
      );

    addFloatingText(
      "+1 VIDA",
      p.x,
      p.y,
      [255, 100, 170]
    );
  }


  if (
    p.type ===
    "star"
  ) {

    score += 50;

    addFloatingText(
      "+50",
      p.x,
      p.y,
      [255, 230, 80]
    );
  }


  createCollectParticles(
    p.x,
    p.y
  );
}


// ============================================================
// COLISIÓN CÍRCULO / JUGADORA
// ============================================================

function circleHitsPlayer(
  cx,
  cy,
  radius
) {

  let left =
    player.x -
    player.w / 2;

  let right =
    player.x +
    player.w / 2;

  let top =
    player.y -
    player.h / 2;

  let bottom =
    player.y +
    player.h / 2;


  let closestX =
    constrain(
      cx,
      left,
      right
    );

  let closestY =
    constrain(
      cy,
      top,
      bottom
    );


  let dx =
    cx -
    closestX;

  let dy =
    cy -
    closestY;


  return (
    dx * dx +
    dy * dy <=
    radius * radius
  );
}


// ============================================================
// COLISIONES ENEMIGOS
// ============================================================

function checkEnemyCollisions() {

  for (let e of enemies) {

    if (!e.alive) continue;


    if (
      player.x +
        player.w / 2 >
        e.x -
        e.w / 2 &&
      player.x -
        player.w / 2 <
        e.x +
        e.w / 2 &&
      player.y +
        player.h / 2 >
        e.y -
        e.h / 2 &&
      player.y -
        player.h / 2 <
        e.y +
        e.h / 2
    ) {

      if (
        player.vy > 0 &&
        player.y < e.y
      ) {

        e.alive = false;

        player.vy = -8;

        score += 50;

        createCollectParticles(
          e.x,
          e.y
        );

        addFloatingText(
          "+50",
          e.x,
          e.y,
          [100, 255, 255]
        );

      } else {

        loseLife();
      }
    }
  }
}


// ============================================================
// PERDER VIDA
// ============================================================

function loseLife() {

  if (
    player.invulnerable > 0
  ) {

    return;
  }


  lives--;


  createCollectParticles(
    player.x,
    player.y
  );


  if (
    lives <= 0
  ) {

    gameState =
      "gameover";

    return;
  }


  player.invulnerable =
    100;


  player.x =
    max(
      100,
      player.x - 280
    );


  if (
    level === 3
  ) {

    player.y =
      alienGroundY(
        player.x
      ) -
      player.h / 2;

  } else {

    player.y = 200;
  }


  player.vx = 0;
  player.vy = 0;

  flightTimer = 0;
}


// ============================================================
// PORTAL
// ============================================================

function getPortalPosition() {

  let portalX =
    worldWidth - 105;

  let portalY;


  if (
    level === 3
  ) {

    portalY =
      alienGroundY(
        portalX
      ) - 90;

  } else {

    portalY =
      min(
        465,
        height - 135
      );
  }


  return {
    x: portalX,
    y: portalY
  };
}


// ============================================================
// COMPROBAR PORTAL
// ============================================================

function checkPortal() {

  if (
    portalCooldown > 0
  ) {

    return;
  }


  let portal =
    getPortalPosition();


  if (
    player.x <
    worldWidth - 190
  ) {

    return;
  }


  if (
    !levelGemAwarded
  ) {

    levelGemAwarded = true;

    gemsCollected++;

    score += 100;

    createCollectParticles(
      portal.x,
      portal.y
    );

    addFloatingText(
      "+100",
      portal.x,
      portal.y - 70,
      [255, 220, 90]
    );
  }


  if (
    player.x >=
    worldWidth - 75
  ) {

    if (
      level < 3
    ) {

      startLevel(
        level + 1
      );

    } else {

      gameState =
        "victory";
    }
  }
}


// ============================================================
// CÁMARA
// ============================================================

function updateCamera(dt) {

  let targetX =
    player.x -
    width * 0.35;


  targetX =
    constrain(
      targetX,
      0,
      max(
        0,
        worldWidth - width
      )
    );


  cameraX =
    lerp(
      cameraX,
      targetX,
      0.075 * dt
    );


  let targetY = 0;


  if (
    flightTimer > 0 ||
    player.y <
      height * 0.34
  ) {

    targetY =
      player.y -
      height * 0.43;


    targetY =
      constrain(
        targetY,
        -150,
        130
      );
  }


  cameraY =
    lerp(
      cameraY,
      targetY,
      0.045 * dt
    );


  if (
    player.onGround &&
    flightTimer <= 0
  ) {

    cameraY =
      lerp(
        cameraY,
        0,
        0.025 * dt
      );
  }
}


// ============================================================
// FONDO
// ============================================================

function drawBackground() {

  background(
    4,
    5,
    22
  );

  drawNebula();

  drawStarsBackground();


  if (
    level === 3
  ) {

    drawAlienPlanetBackground();

  } else {

    drawSpaceHorizon();
  }
}


// ============================================================
// NEBULOSA
// ============================================================

function drawNebula() {

  let ctx =
    drawingContext;


  let g1 =
    ctx.createRadialGradient(
      width * 0.25,
      height * 0.28,
      20,
      width * 0.25,
      height * 0.28,
      width * 0.75
    );


  g1.addColorStop(
    0,
    "rgba(45,90,255,0.18)"
  );

  g1.addColorStop(
    0.5,
    "rgba(130,30,190,0.10)"
  );

  g1.addColorStop(
    1,
    "rgba(0,0,0,0)"
  );


  ctx.fillStyle = g1;

  rect(
    0,
    0,
    width,
    height
  );


  let g2 =
    ctx.createRadialGradient(
      width * 0.78,
      height * 0.55,
      10,
      width * 0.78,
      height * 0.55,
      width * 0.55
    );


  g2.addColorStop(
    0,
    "rgba(255,40,190,0.12)"
  );

  g2.addColorStop(
    0.5,
    "rgba(90,30,220,0.07)"
  );

  g2.addColorStop(
    1,
    "rgba(0,0,0,0)"
  );


  ctx.fillStyle = g2;

  rect(
    0,
    0,
    width,
    height
  );
}


// ============================================================
// ESTRELLAS FONDO
// ============================================================

function drawStarsBackground() {

  noStroke();


  for (let s of backgroundStars) {

    let flicker =
      0.35 +
      0.65 *
      (
        (
          sin(
            frameCount *
            0.035 *
            s.speed +
            s.phase
          ) + 1
        ) / 2
      );


    let x =
      (
        s.x -
        cameraX *
        s.layer *
        0.08
      ) %
      (width + 160);


    if (
      x < -80
    ) {

      x +=
        width + 160;
    }


    let size =
      s.size *
      (
        0.75 +
        flicker *
        0.45
      );


    fill(
      170 +
        85 * flicker,
      190 +
        65 * flicker,
      255
    );


    ellipse(
      x,
      s.y,
      size,
      size
    );


    if (
      flicker > 0.88 &&
      s.size > 1.5
    ) {

      stroke(
        160,
        220,
        255,
        100
      );

      strokeWeight(0.7);

      line(
        x - 3,
        s.y,
        x + 3,
        s.y
      );

      line(
        x,
        s.y - 3,
        x,
        s.y + 3
      );

      noStroke();
    }
  }
}


// ============================================================
// HORIZONTE
// ============================================================

function drawSpaceHorizon() {

  noStroke();

  fill(
    8,
    12,
    38,
    150
  );

  rect(
    0,
    height * 0.73,
    width,
    height * 0.27
  );

  fill(
    12,
    15,
    48,
    180
  );

  rect(
    0,
    height * 0.82,
    width,
    height * 0.18
  );
}


// ============================================================
// PLANETA ALIEN
// ============================================================

function drawAlienPlanetBackground() {

  noStroke();

  fill(
    10,
    18,
    38,
    230
  );

  rect(
    0,
    height * 0.67,
    width,
    height * 0.33
  );


  // ----------------------------------------------------------
  // LUNA / PLANETA GIGANTE
  // ----------------------------------------------------------

  fill(
    45,
    30,
    75,
    100
  );

  ellipse(
    width * 0.76,
    height * 0.24,
    width * 0.52,
    width * 0.52
  );


  fill(
    65,
    45,
    100,
    80
  );

  ellipse(
    width * 0.76,
    height * 0.24,
    width * 0.43,
    width * 0.43
  );


  // Cráteres.

  fill(
    30,
    25,
    60,
    80
  );

  ellipse(
    width * 0.66,
    height * 0.18,
    45,
    25
  );

  ellipse(
    width * 0.82,
    height * 0.32,
    65,
    30
  );

  ellipse(
    width * 0.78,
    height * 0.15,
    30,
    18
  );


  // ----------------------------------------------------------
  // AURORA ALIENÍGENA
  // ----------------------------------------------------------

  noFill();

  stroke(
    70,
    255,
    210,
    35
  );

  strokeWeight(22);

  arc(
    width * 0.48,
    height * 0.45,
    width * 0.9,
    height * 0.35,
    PI,
    TWO_PI
  );

  stroke(
    160,
    80,
    255,
    25
  );

  strokeWeight(14);

  arc(
    width * 0.58,
    height * 0.47,
    width * 0.8,
    height * 0.30,
    PI,
    TWO_PI
  );


  // ----------------------------------------------------------
  // MONTAÑAS ALIENÍGENAS
  // ----------------------------------------------------------

  noStroke();

  fill(
    18,
    32,
    52,
    240
  );

  triangle(
    0,
    height * 0.78,
    width * 0.18,
    height * 0.54,
    width * 0.38,
    height * 0.78
  );

  triangle(
    width * 0.20,
    height * 0.78,
    width * 0.46,
    height * 0.50,
    width * 0.70,
    height * 0.78
  );

  triangle(
    width * 0.58,
    height * 0.78,
    width * 0.82,
    height * 0.56,
    width,
    height * 0.78
  );


  // Brillo de las montañas.

  stroke(
    80,
    210,
    180,
    65
  );

  strokeWeight(2);

  line(
    0,
    height * 0.78,
    width * 0.18,
    height * 0.54
  );

  line(
    width * 0.20,
    height * 0.78,
    width * 0.46,
    height * 0.50
  );

  line(
    width * 0.58,
    height * 0.78,
    width * 0.82,
    height * 0.56
  );


  // ----------------------------------------------------------
  // GRID DEL PLANETA
  // ----------------------------------------------------------

  stroke(
    70,
    220,
    190,
    65
  );

  strokeWeight(1);


  for (
    let y =
      height * 0.76;
    y < height;
    y += 24
  ) {

    line(
      0,
      y,
      width,
      y
    );
  }


  for (
    let x =
      -width;
    x <
      width * 2;
    x += 90
  ) {

    line(
      width * 0.5,
      height * 0.70,
      x,
      height
    );
  }


  noStroke();


  // Plantas decorativas.

  for (let plant of alienPlants) {

    let sx =
      (
        plant.x -
        cameraX * 0.15
      );

    if (
      sx > -80 &&
      sx < width + 80
    ) {

      let sy =
        height * 0.72;

      drawAlienPlant(
        sx,
        sy,
        plant.scale
      );
    }
  }
}


// ============================================================
// PLANTA ALIEN
// ============================================================

function drawAlienPlant(
  x,
  y,
  scaleValue
) {

  push();

  translate(
    x,
    y
  );

  scale(
    scaleValue
  );


  stroke(
    70,
    255,
    190,
    150
  );

  strokeWeight(2);

  line(
    0,
    0,
    0,
    -42
  );


  noStroke();

  fill(
    80,
    255,
    190,
    150
  );

  ellipse(
    -8,
    -26,
    13,
    24
  );

  ellipse(
    8,
    -34,
    13,
    24
  );


  fill(
    255,
    90,
    210,
    170
  );

  ellipse(
    0,
    -48,
    11,
    16
  );


  pop();
}


// ============================================================
// MUNDO
// ============================================================

function drawWorld() {

  if (
    level === 3
  ) {

    drawPlanetGround();

  } else {

    drawPlatforms();

    drawCloudStations();
  }


  drawStars();

  drawPowerUps();

  drawEnemies();

  drawPortal();
}


// ============================================================
// SUELO ALIEN
// ============================================================

function alienGroundY(x) {

  let base =
    height - 118;

  let wave1 =
    sin(x * 0.0022) * 12;

  let wave2 =
    sin(x * 0.006) * 7;

  let wave3 =
    sin(x * 0.012) * 3;


  return (
    base +
    wave1 +
    wave2 +
    wave3
  );
}


// ============================================================
// TERRENO
// ============================================================

function drawPlanetGround() {

  noStroke();


  let step = 80;


  fill(
    10,
    28,
    42
  );


  beginShape();

  vertex(
    0,
    alienGroundY(0)
  );


  for (
    let x = 0;
    x <= worldWidth;
    x += step
  ) {

    vertex(
      x,
      alienGroundY(x)
    );
  }


  vertex(
    worldWidth,
    height + 100
  );

  vertex(
    0,
    height + 100
  );

  endShape(CLOSE);


  // Línea luminosa.

  stroke(
    90,
    255,
    190,
    170
  );

  strokeWeight(2);


  for (
    let x = 0;
    x < worldWidth;
    x += step
  ) {

    line(
      x,
      alienGroundY(x),
      x + step,
      alienGroundY(
        x + step
      )
    );
  }


  noStroke();


  // Rocas.

  for (let rock of alienRocks) {

    let gy =
      alienGroundY(
        rock.x
      );

    drawAlienRock(
      rock.x,
      gy + 12,
      rock.size
    );
  }


  // Cristales.

  for (let crystal of alienCrystals) {

    let gy =
      alienGroundY(
        crystal.x
      );

    drawAlienCrystal(
      crystal.x,
      gy,
      crystal.scale
    );
  }


  // Detalles del terreno.

  for (
    let x = 0;
    x < worldWidth;
    x += 130
  ) {

    let gy =
      alienGroundY(x);


    fill(
      25,
      55,
      60
    );

    rect(
      x,
      gy + 18,
      90,
      5,
      3
    );


    fill(
      70,
      190,
      150,
      100
    );

    rect(
      x + 20,
      gy + 40,
      35,
      3
    );
  }
}


// ============================================================
// ROCA ALIEN
// ============================================================

function drawAlienRock(
  x,
  y,
  scaleValue
) {

  push();

  translate(
    x,
    y
  );

  scale(
    scaleValue
  );


  noStroke();

  fill(
    28,
    45,
    62
  );

  beginShape();

  vertex(
    -28,
    5
  );

  vertex(
    -18,
    -15
  );

  vertex(
    -2,
    -24
  );

  vertex(
    18,
    -17
  );

  vertex(
    28,
    5
  );

  vertex(
    16,
    13
  );

  vertex(
    -15,
    14
  );

  endShape(CLOSE);


  fill(
    70,
    150,
    130,
    100
  );

  ellipse(
    -6,
    -8,
    9,
    6
  );

  ellipse(
    10,
    -3,
    6,
    5
  );


  pop();
}


// ============================================================
// CRISTAL ALIEN
// ============================================================

function drawAlienCrystal(
  x,
  y,
  scaleValue
) {

  push();

  translate(
    x,
    y
  );

  scale(
    scaleValue
  );


  noStroke();

  fill(
    55,
    180,
    160,
    80
  );

  ellipse(
    0,
    -22,
    42,
    45
  );


  fill(
    70,
    230,
    190,
    180
  );

  beginShape();

  vertex(
    -12,
    0
  );

  vertex(
    -8,
    -34
  );

  vertex(
    0,
    -55
  );

  vertex(
    9,
    -28
  );

  vertex(
    14,
    0
  );

  endShape(CLOSE);


  fill(
    160,
    255,
    225,
    170
  );

  triangle(
    0,
    -48,
    4,
    -29,
    -5,
    -31
  );


  pop();
}


// ============================================================
// PLATAFORMAS
// ============================================================

function drawPlatforms() {

  for (let p of platforms) {

    drawPlatform(p);
  }
}


function drawPlatform(p) {

  push();

  noStroke();

  fill(
    0,
    0,
    0,
    90
  );

  rect(
    p.x + 8,
    p.y + 8,
    p.w,
    p.h,
    8
  );


  stroke(
    LEVEL_COLORS[
      level - 1
    ].main[0],
    LEVEL_COLORS[
      level - 1
    ].main[1],
    LEVEL_COLORS[
      level - 1
    ].main[2],
    180
  );

  strokeWeight(2);


  fill(
    12,
    20,
    42
  );

  rect(
    p.x,
    p.y,
    p.w,
    p.h,
    8
  );


  noStroke();

  fill(
    LEVEL_COLORS[
      level - 1
    ].main[0],
    LEVEL_COLORS[
      level - 1
    ].main[1],
    LEVEL_COLORS[
      level - 1
    ].main[2],
    110
  );

  rect(
    p.x + 4,
    p.y + 2,
    p.w - 8,
    5,
    3
  );


  fill(
    30,
    60,
    90
  );


  for (
    let x = p.x + 20;
    x <
      p.x + p.w - 10;
    x += 55
  ) {

    rect(
      x,
      p.y + 14,
      28,
      5,
      2
    );
  }


  fill(
    255,
    80,
    200
  );


  for (
    let x = p.x + 15;
    x < p.x + p.w;
    x += 75
  ) {

    ellipse(
      x,
      p.y + p.h - 7,
      4,
      4
    );
  }


  pop();
}


// ============================================================
// ESTACIONES
// ============================================================

function drawCloudStations() {

  for (let c of cloudStations) {

    let pulse =
      sin(
        frameCount * 0.035 +
        c.pulse
      ) * 2;


    push();

    noStroke();


    fill(
      10,
      30,
      70,
      130
    );

    ellipse(
      c.x + c.w / 2,
      c.y + c.h / 2 + 12,
      c.w * 0.95,
      c.h * 0.6
    );


    fill(
      100,
      145,
      255,
      90
    );

    ellipse(
      c.x + c.w * 0.25,
      c.y + c.h * 0.55,
      c.w * 0.42,
      c.h * 0.9 + pulse
    );

    ellipse(
      c.x + c.w * 0.50,
      c.y + c.h * 0.40,
      c.w * 0.50,
      c.h * 1.05 + pulse
    );

    ellipse(
      c.x + c.w * 0.75,
      c.y + c.h * 0.55,
      c.w * 0.42,
      c.h * 0.9 + pulse
    );


    fill(
      75,
      220,
      255,
      120
    );

    ellipse(
      c.x + c.w * 0.5,
      c.y + c.h * 0.5,
      c.w * 0.75,
      c.h * 0.42
    );


    stroke(
      150,
      240,
      255,
      160
    );

    strokeWeight(1.5);


    line(
      c.x + 18,
      c.y + c.h * 0.48,
      c.x + c.w - 18,
      c.y + c.h * 0.48
    );


    noStroke();

    pop();
  }
}


// ============================================================
// ESTRELLAS
// ============================================================

function drawStars() {

  for (let s of stars) {

    if (s.collected) continue;


    push();

    translate(
      s.x,
      s.y
    );

    rotate(
      s.rotation +
      frameCount * 0.018
    );


    let pulse =
      1 +
      sin(
        frameCount * 0.06 +
        s.pulse
      ) * 0.10;


    scale(pulse);

    draw3DStar();

    pop();
  }
}


// ============================================================
// ESTRELLA 3D
// ============================================================

function draw3DStar() {

  noStroke();

  fill(
    120,
    60,
    20,
    120
  );

  drawStarShape(
    2,
    3,
    24,
    10
  );


  fill(
    255,
    150,
    30
  );

  drawStarShape(
    0,
    2,
    24,
    10
  );


  fill(
    255,
    230,
    80
  );

  drawStarShape(
    0,
    0,
    22,
    9
  );


  fill(
    255,
    250,
    190
  );

  triangle(
    -2,
    -16,
    3,
    -5,
    -8,
    -7
  );
}


function drawStarShape(
  x,
  y,
  outerR,
  innerR
) {

  beginShape();

  for (
    let i = 0;
    i < 20;
    i++
  ) {

    let a =
      -HALF_PI +
      i * PI / 10;


    let r =
      i % 2 === 0
        ? outerR
        : innerR;


    vertex(
      x + cos(a) * r,
      y + sin(a) * r
    );
  }

  endShape(CLOSE);
}


// ============================================================
// POWER UPS
// ============================================================

function drawPowerUps() {

  for (let p of powerUps) {

    if (p.collected) continue;


    push();

    translate(
      p.x,
      p.y
    );


    let bob =
      sin(
        frameCount * 0.05 +
        p.x
      ) * 3;


    translate(
      0,
      bob
    );


    if (
      p.type ===
      "flight"
    ) {

      draw3DFlightIcon();
    }


    if (
      p.type ===
      "heart"
    ) {

      draw3DHeartIcon();
    }


    if (
      p.type ===
      "star"
    ) {

      draw3DStarPowerIcon();
    }


    pop();
  }
}


// ============================================================
// ICONO VUELO
// ============================================================

function draw3DFlightIcon() {

  push();

  noStroke();

  fill(
    50,
    220,
    255,
    24
  );

  ellipse(
    0,
    0,
    76,
    58
  );


  fill(
    10,
    50,
    85
  );


  drawMechanicalWing(
    -1,
    -2,
    -1
  );

  drawMechanicalWing(
    1,
    -2,
    1
  );


  fill(
    25,
    35,
    60
  );

  rect(
    -8,
    -13,
    16,
    28,
    6
  );


  stroke(
    100,
    225,
    255,
    180
  );

  strokeWeight(2);

  noFill();

  rect(
    -6,
    -11,
    12,
    24,
    5
  );


  noStroke();

  fill(
    210,
    250,
    255
  );

  ellipse(
    0,
    -4,
    7,
    7
  );


  fill(
    80,
    230,
    255
  );

  rect(
    -4,
    8,
    8,
    4,
    2
  );


  fill(
    255,
    110,
    190,
    190
  );

  triangle(
    -5,
    15,
    -1,
    15,
    -3,
    23
  );

  triangle(
    1,
    15,
    5,
    15,
    3,
    23
  );


  pop();
}


// ============================================================
// ALA MECÁNICA
// ============================================================

function drawMechanicalWing(
  side,
  yOffset,
  direction
) {

  push();

  scale(
    direction,
    1
  );


  noStroke();

  fill(
    30,
    45,
    70
  );

  ellipse(
    11,
    1 + yOffset,
    11,
    11
  );


  fill(
    65,
    100,
    135
  );

  beginShape();

  vertex(
    8,
    -7 + yOffset
  );

  vertex(
    25,
    -14 + yOffset
  );

  vertex(
    34,
    -5 + yOffset
  );

  vertex(
    28,
    5 + yOffset
  );

  vertex(
    14,
    9 + yOffset
  );

  vertex(
    8,
    5 + yOffset
  );

  endShape(CLOSE);


  fill(
    30,
    55,
    85
  );

  beginShape();

  vertex(
    15,
    -5 + yOffset
  );

  vertex(
    24,
    -9 + yOffset
  );

  vertex(
    29,
    -4 + yOffset
  );

  vertex(
    25,
    2 + yOffset
  );

  vertex(
    16,
    5 + yOffset
  );

  endShape(CLOSE);


  stroke(
    90,
    220,
    255,
    170
  );

  strokeWeight(1.5);

  line(
    14,
    -4 + yOffset,
    27,
    -8 + yOffset
  );

  line(
    17,
    2 + yOffset,
    27,
    -2 + yOffset
  );


  noStroke();

  fill(
    45,
    70,
    100
  );

  beginShape();

  vertex(
    27,
    -5 + yOffset
  );

  vertex(
    38,
    -1 + yOffset
  );

  vertex(
    34,
    8 + yOffset
  );

  vertex(
    25,
    8 + yOffset
  );

  endShape(CLOSE);


  stroke(
    255,
    100,
    195,
    170
  );

  strokeWeight(1.5);

  line(
    29,
    0 + yOffset,
    35,
    3 + yOffset
  );


  pop();
}


// ============================================================
// CORAZÓN
// ============================================================

function draw3DHeartIcon() {

  noStroke();

  fill(
    100,
    20,
    65
  );

  drawHeartShape(
    2,
    4,
    25
  );


  fill(
    220,
    40,
    125
  );

  drawHeartShape(
    0,
    2,
    25
  );


  fill(
    255,
    80,
    165
  );

  drawHeartShape(
    0,
    0,
    23
  );


  fill(
    255,
    190,
    225
  );

  ellipse(
    -7,
    -7,
    8,
    5
  );
}


function drawHeartShape(
  x,
  y,
  s
) {

  beginShape();

  vertex(
    x,
    y + s * 0.9
  );

  vertex(
    x - s,
    y
  );

  vertex(
    x - s * 0.85,
    y - s * 0.55
  );

  vertex(
    x - s * 0.35,
    y - s * 0.85
  );

  vertex(
    x,
    y - s * 0.35
  );

  vertex(
    x + s * 0.35,
    y - s * 0.85
  );

  vertex(
    x + s * 0.85,
    y - s * 0.55
  );

  vertex(
    x + s,
    y
  );

  endShape(CLOSE);
}


// ============================================================
// ESTRELLA POWER
// ============================================================

function draw3DStarPowerIcon() {

  noStroke();

  fill(
    120,
    50,
    170,
    120
  );

  drawStarShape(
    3,
    4,
    28,
    12
  );


  fill(
    255,
    80,
    220
  );

  drawStarShape(
    0,
    2,
    27,
    11
  );


  fill(
    255,
    180,
    245
  );

  drawStarShape(
    0,
    0,
    24,
    10
  );


  fill(
    255,
    255,
    255,
    210
  );

  ellipse(
    -5,
    -9,
    6,
    5
  );
}


// ============================================================
// ENEMIGOS
// ============================================================

function drawEnemies() {

  for (let e of enemies) {

    if (!e.alive) continue;


    if (
      e.kind ===
      "drone"
    ) {

      drawDroneEnemy(e);
    }


    if (
      e.kind ===
      "energy"
    ) {

      drawEnergyEnemy(e);
    }


    if (
      e.kind ===
      "alien"
    ) {

      drawAlienEnemy(e);
    }
  }
}


// ============================================================
// ENEMIGO NIVEL 1
// DRON
// ============================================================

function drawDroneEnemy(e) {

  push();

  translate(
    e.x,
    e.y
  );


  let bob =
    sin(
      frameCount * 0.05 +
      e.phase
    ) * 2;


  translate(
    0,
    bob
  );


  noStroke();

  fill(
    255,
    50,
    180,
    25
  );

  ellipse(
    0,
    0,
    62,
    44
  );


  fill(
    30,
    35,
    70
  );

  ellipse(
    0,
    0,
    42,
    28
  );


  fill(
    90,
    100,
    150
  );

  ellipse(
    0,
    -5,
    28,
    16
  );


  fill(
    255,
    60,
    190
  );

  ellipse(
    0,
    -1,
    9,
    9
  );


  fill(
    80,
    230,
    255
  );

  ellipse(
    -14,
    8,
    4,
    4
  );

  ellipse(
    14,
    8,
    4,
    4
  );


  // pequeñas antenas

  stroke(
    100,
    220,
    255,
    150
  );

  strokeWeight(1.5);

  line(
    -14,
    -9,
    -21,
    -17
  );

  line(
    14,
    -9,
    21,
    -17
  );


  noStroke();

  fill(
    255,
    100,
    190
  );

  ellipse(
    -22,
    -18,
    4,
    4
  );

  ellipse(
    22,
    -18,
    4,
    4
  );


  pop();
}


// ============================================================
// ENEMIGO NIVEL 2
// CRIATURA ENERGÉTICA
// ============================================================

function drawEnergyEnemy(e) {

  push();

  translate(
    e.x,
    e.y
  );


  let pulse =
    1 +
    sin(
      frameCount * 0.09 +
      e.phase
    ) * 0.12;


  scale(pulse);


  noStroke();

  fill(
    170,
    70,
    255,
    25
  );

  ellipse(
    0,
    0,
    72,
    72
  );


  fill(
    80,
    35,
    125,
    220
  );

  ellipse(
    0,
    0,
    43,
    43
  );


  fill(
    170,
    90,
    255,
    170
  );

  ellipse(
    0,
    0,
    31,
    31
  );


  fill(
    230,
    190,
    255
  );

  ellipse(
    -7,
    -7,
    8,
    8
  );


  fill(
    255,
    80,
    220
  );

  ellipse(
    7,
    5,
    7,
    7
  );


  // Rayos.

  stroke(
    190,
    100,
    255,
    160
  );

  strokeWeight(2);


  line(
    -23,
    0,
    -33,
    -5
  );

  line(
    23,
    0,
    33,
    -5
  );

  line(
    0,
    -23,
    -5,
    -33
  );

  line(
    0,
    23,
    5,
    33
  );


  noStroke();


  pop();
}


// ============================================================
// ENEMIGO NIVEL 3
// CRIATURA ALIENÍGENA
// ============================================================

function drawAlienEnemy(e) {

  push();

  translate(
    e.x,
    e.y
  );


  let bob =
    sin(
      frameCount * 0.08 +
      e.phase
    ) * 3;


  translate(
    0,
    bob
  );


  // Aura.

  noStroke();

  fill(
    80,
    255,
    180,
    25
  );

  ellipse(
    0,
    0,
    72,
    58
  );


  // Cuerpo.

  fill(
    28,
    80,
    72
  );

  ellipse(
    0,
    3,
    43,
    35
  );


  // Cabeza.

  fill(
    65,
    150,
    120
  );

  ellipse(
    0,
    -7,
    35,
    31
  );


  // Ojos alienígenas.

  fill(
    10,
    25,
    35
  );

  ellipse(
    -9,
    -9,
    9,
    13
  );

  ellipse(
    9,
    -9,
    9,
    13
  );


  fill(
    180,
    255,
    215
  );

  ellipse(
    -8,
    -10,
    3,
    4
  );

  ellipse(
    8,
    -10,
    3,
    4
  );


  // Antenas.

  stroke(
    80,
    230,
    170,
    180
  );

  strokeWeight(2);

  line(
    -9,
    -21,
    -17,
    -32
  );

  line(
    9,
    -21,
    17,
    -32
  );


  noStroke();

  fill(
    255,
    100,
    210
  );

  ellipse(
    -18,
    -33,
    6,
    6
  );

  ellipse(
    18,
    -33,
    6,
    6
  );


  // Patas.

  stroke(
    70,
    220,
    170
  );

  strokeWeight(3);

  line(
    -12,
    16,
    -19,
    27
  );

  line(
    12,
    16,
    19,
    27
  );

  noStroke();


  pop();
}


// ============================================================
// PORTAL
// ============================================================

function drawPortal() {

  let portal =
    getPortalPosition();


  push();

  translate(
    portal.x,
    portal.y
  );


  let pulse =
    1 +
    sin(
      frameCount * 0.08
    ) * 0.05;


  scale(pulse);


  noFill();


  // Aura.

  stroke(
    255,
    255,
    255,
    25
  );

  strokeWeight(18);

  ellipse(
    0,
    0,
    125,
    190
  );


  stroke(
    100,
    220,
    255,
    100
  );

  strokeWeight(8);

  ellipse(
    0,
    0,
    115,
    180
  );


  stroke(
    220,
    100,
    255,
    170
  );

  strokeWeight(4);

  ellipse(
    0,
    0,
    95,
    160
  );


  stroke(
    255,
    255,
    255,
    220
  );

  strokeWeight(2);

  ellipse(
    0,
    0,
    78,
    138
  );


  noStroke();

  fill(
    220,
    245,
    255,
    45
  );

  ellipse(
    0,
    0,
    65,
    120
  );


  // Partículas orbitales.

  for (
    let i = 0;
    i < 8;
    i++
  ) {

    let a =
      frameCount * 0.025 +
      i * TWO_PI / 8;


    let r = 68;


    fill(
      255,
      255,
      255,
      210
    );


    ellipse(
      cos(a) * r * 0.65,
      sin(a) * r,
      5,
      5
    );
  }


  pop();
}


// ============================================================
// JUGADORA
// ============================================================

function drawPlayer() {

  if (
    player.invulnerable > 0 &&
    floor(frameCount / 5) % 2 === 0
  ) {

    return;
  }


  push();


  translate(
    player.x,
    player.y
  );


  scale(
    player.facing,
    1
  );


  let speedRatio =
    constrain(
      abs(player.vx) /
      player.maxSpeed,
      0,
      1
    );


  let walkAmount =
    player.onGround
      ? speedRatio
      : 0;


  let phase =
    player.animTime;


  let bob =
    player.onGround
      ? sin(phase) *
        0.7 *
        walkAmount
      : 0;


  translate(
    0,
    bob
  );


  drawBackpack();

  drawUniformTails();


  if (
    flightTimer > 0
  ) {

    drawPlayerFlightWings();
  }


  drawPlayerLegs(
    walkAmount,
    phase
  );

  drawPlayerBody();

  drawPlayerArms(
    walkAmount,
    phase
  );

  drawPlayerHelmet();


  if (
    flightTimer > 0 &&
    keyIsDown(32)
  ) {

    drawJetFlames();
  }


  pop();
}


// ============================================================
// MOCHILA
// ============================================================

function drawBackpack() {

  noStroke();

  fill(
    25,
    35,
    70
  );

  rect(
    -22,
    -18,
    10,
    38,
    5
  );


  fill(
    70,
    100,
    150
  );

  rect(
    -24,
    -15,
    6,
    28,
    3
  );


  fill(
    100,
    230,
    255,
    160
  );

  ellipse(
    -21,
    -5,
    4,
    4
  );


  fill(
    255,
    80,
    185
  );

  rect(
    -24,
    8,
    6,
    3,
    1
  );
}


// ============================================================
// COLITAS DEL UNIFORME
// ============================================================

function drawUniformTails() {

  noStroke();


  fill(
    35,
    45,
    70
  );

  ellipse(
    -16,
    -27,
    9,
    9
  );

  ellipse(
    16,
    -27,
    9,
    9
  );


  fill(
    215,
    65,
    155
  );

  beginShape();

  vertex(
    -18,
    -26
  );

  vertex(
    -29,
    -16
  );

  vertex(
    -27,
    4
  );

  vertex(
    -18,
    10
  );

  vertex(
    -21,
    -8
  );

  vertex(
    -13,
    -22
  );

  endShape(CLOSE);


  beginShape();

  vertex(
    18,
    -26
  );

  vertex(
    29,
    -16
  );

  vertex(
    27,
    4
  );

  vertex(
    18,
    10
  );

  vertex(
    21,
    -8
  );

  vertex(
    13,
    -22
  );

  endShape(CLOSE);


  fill(
    255,
    105,
    195
  );

  rect(
    -19,
    -28,
    6,
    5,
    2
  );

  rect(
    13,
    -28,
    6,
    5,
    2
  );


  fill(
    255,
    155,
    220,
    150
  );

  rect(
    -24,
    -14,
    3,
    12,
    1
  );

  rect(
    21,
    -14,
    3,
    12,
    1
  );
}


// ============================================================
// ALAS DE LA JUGADORA
// ============================================================

function drawPlayerFlightWings() {

  push();


  let deploy =
    constrain(
      flightTimer / 45,
      0,
      1
    );


  push();

  translate(
    -16,
    -4
  );

  rotate(
    -0.20 * deploy
  );


  stroke(
    90,
    210,
    245,
    180
  );

  strokeWeight(1.3);

  fill(
    35,
    55,
    85,
    245
  );


  beginShape();

  vertex(
    0,
    -8
  );

  vertex(
    -17,
    -15
  );

  vertex(
    -30,
    -7
  );

  vertex(
    -21,
    1
  );

  vertex(
    -8,
    6
  );

  endShape(CLOSE);


  stroke(
    255,
    100,
    190,
    150
  );

  line(
    -8,
    -7,
    -24,
    -8
  );

  line(
    -10,
    -1,
    -21,
    -2
  );

  pop();


  push();

  translate(
    16,
    -4
  );

  rotate(
    0.20 * deploy
  );


  stroke(
    90,
    210,
    245,
    180
  );

  strokeWeight(1.3);

  fill(
    35,
    55,
    85,
    245
  );


  beginShape();

  vertex(
    0,
    -8
  );

  vertex(
    17,
    -15
  );

  vertex(
    30,
    -7
  );

  vertex(
    21,
    1
  );

  vertex(
    8,
    6
  );

  endShape(CLOSE);


  stroke(
    255,
    100,
    190,
    150
  );

  line(
    8,
    -7,
    24,
    -8
  );

  line(
    10,
    -1,
    21,
    -2
  );


  pop();


  pop();
}


// ============================================================
// PIERNAS
// ============================================================

function drawPlayerLegs(
  walkAmount,
  phase
) {

  let swing =
    sin(phase) *
    0.10 *
    walkAmount;


  push();

  translate(
    -8,
    28
  );

  rotate(swing);

  noStroke();

  fill(
    30,
    45,
    80
  );

  rect(
    -5,
    0,
    10,
    22,
    5
  );

  fill(
    75,
    115,
    160
  );

  rect(
    -4,
    3,
    8,
    14,
    4
  );

  fill(
    25,
    30,
    55
  );

  rect(
    -7,
    18,
    15,
    8,
    4
  );

  fill(
    80,
    225,
    255,
    180
  );

  rect(
    -4,
    20,
    7,
    2,
    1
  );

  pop();


  push();

  translate(
    8,
    28
  );

  rotate(-swing);

  noStroke();

  fill(
    30,
    45,
    80
  );

  rect(
    -5,
    0,
    10,
    22,
    5
  );

  fill(
    75,
    115,
    160
  );

  rect(
    -4,
    3,
    8,
    14,
    4
  );

  fill(
    25,
    30,
    55
  );

  rect(
    -7,
    18,
    15,
    8,
    4
  );

  fill(
    255,
    90,
    190,
    180
  );

  rect(
    -3,
    20,
    7,
    2,
    1
  );

  pop();
}


// ============================================================
// CUERPO
// ============================================================

function drawPlayerBody() {

  push();

  rotate(
    player.bodyLean
  );


  noStroke();


  fill(
    10,
    15,
    35
  );

  rect(
    -14,
    -10,
    28,
    42,
    10
  );


  fill(
    230,
    235,
    248
  );

  rect(
    -13,
    -9,
    26,
    39,
    9
  );


  fill(
    165,
    180,
    210
  );

  rect(
    8,
    -7,
    5,
    35,
    5
  );


  fill(
    245,
    247,
    255
  );

  rect(
    -9,
    -5,
    18,
    29,
    6
  );


  fill(
    255,
    80,
    185
  );

  rect(
    -8,
    2,
    16,
    4,
    2
  );


  fill(
    70,
    220,
    255
  );

  ellipse(
    0,
    15,
    8,
    8
  );


  fill(
    200,
    250,
    255
  );

  ellipse(
    -2,
    13,
    3,
    3
  );


  fill(
    45,
    65,
    105
  );

  rect(
    -11,
    23,
    22,
    5,
    2
  );


  fill(
    255,
    100,
    195
  );

  rect(
    -7,
    23,
    14,
    2,
    1
  );


  fill(
    255,
    90,
    190
  );

  rect(
    -14,
    -2,
    3,
    10,
    1
  );

  rect(
    11,
    8,
    3,
    9,
    1
  );


  pop();
}


// ============================================================
// BRAZOS
// ============================================================

function drawPlayerArms(
  walkAmount,
  phase
) {

  let swing =
    sin(
      phase + PI
    ) *
    0.08 *
    walkAmount;


  push();

  translate(
    -14,
    -3
  );

  rotate(
    -0.08 +
    swing
  );

  noStroke();

  fill(
    210,
    220,
    238
  );

  rect(
    -5,
    0,
    10,
    25,
    5
  );

  fill(
    150,
    170,
    205
  );

  rect(
    -3,
    5,
    6,
    14,
    3
  );

  fill(
    35,
    45,
    75
  );

  ellipse(
    0,
    25,
    11,
    9
  );

  fill(
    255,
    90,
    190
  );

  rect(
    -5,
    8,
    3,
    7,
    1
  );

  pop();


  push();

  translate(
    14,
    -3
  );

  rotate(
    0.08 -
    swing
  );

  noStroke();

  fill(
    210,
    220,
    238
  );

  rect(
    -5,
    0,
    10,
    25,
    5
  );

  fill(
    150,
    170,
    205
  );

  rect(
    -3,
    5,
    6,
    14,
    3
  );

  fill(
    35,
    45,
    75
  );

  ellipse(
    0,
    25,
    11,
    9
  );

  fill(
    255,
    90,
    190
  );

  rect(
    2,
    8,
    3,
    7,
    1
  );

  pop();
}


// ============================================================
// CASCO
// ============================================================

function drawPlayerHelmet() {

  noStroke();

  fill(
    18,
    25,
    50
  );

  ellipse(
    0,
    -30,
    46,
    46
  );


  fill(
    218,
    228,
    242
  );

  ellipse(
    0,
    -30,
    42,
    41
  );


  fill(
    145,
    165,
    195
  );

  ellipse(
    14,
    -30,
    11,
    33
  );


  fill(
    8,
    14,
    29
  );

  ellipse(
    1,
    -31,
    32,
    29
  );


  fill(
    15,
    27,
    50
  );

  ellipse(
    2,
    -32,
    27,
    22
  );


  fill(
    90,
    205,
    240,
    55
  );

  beginShape();

  vertex(
    -12,
    -40
  );

  vertex(
    1,
    -45
  );

  vertex(
    11,
    -41
  );

  vertex(
    2,
    -37
  );

  endShape(CLOSE);


  fill(
    190,
    235,
    255,
    65
  );

  ellipse(
    -8,
    -39,
    6,
    2
  );


  stroke(
    55,
    90,
    125
  );

  strokeWeight(2);

  noFill();

  arc(
    1,
    -30,
    33,
    30,
    0.1,
    PI - 0.1
  );


  noStroke();

  fill(
    255,
    80,
    185
  );

  rect(
    -18,
    -13,
    36,
    4,
    2
  );


  fill(
    100,
    230,
    255
  );

  rect(
    -8,
    -11,
    16,
    2,
    1
  );


  fill(
    255,
    110,
    195
  );

  ellipse(
    -15,
    -15,
    3,
    3
  );

  ellipse(
    15,
    -15,
    3,
    3
  );
}


// ============================================================
// LLAMAS
// ============================================================

function drawJetFlames() {

  let flame =
    10 +
    sin(
      frameCount * 0.22
    ) * 3;


  noStroke();


  fill(
    255,
    100,
    180,
    110
  );


  triangle(
    -13,
    36,
    -3,
    36,
    -8,
    36 + flame
  );


  triangle(
    3,
    36,
    13,
    36,
    8,
    36 + flame
  );


  fill(
    80,
    230,
    255,
    180
  );


  triangle(
    -10,
    36,
    -5,
    36,
    -8,
    36 +
      flame * 0.65
  );


  triangle(
    5,
    36,
    10,
    36,
    8,
    36 +
      flame * 0.65
  );
}


// ============================================================
// PARTÍCULAS
// ============================================================

function createCollectParticles(
  x,
  y
) {

  for (
    let i = 0;
    i < 8;
    i++
  ) {

    particles.push({

      x: x,

      y: y,

      vx:
        random(
          -2.5,
          2.5
        ),

      vy:
        random(
          -3,
          1
        ),

      life: 30,

      maxLife: 30,

      size:
        random(
          2,
          5
        )
    });
  }


  if (
    particles.length >
    100
  ) {

    particles.splice(
      0,
      particles.length - 100
    );
  }
}


// ============================================================
// PARTÍCULAS SALTO
// ============================================================

function createJumpParticles() {

  for (
    let i = 0;
    i < 5;
    i++
  ) {

    particles.push({

      x:
        player.x +
        random(
          -12,
          12
        ),

      y:
        player.y +
        player.h / 2,

      vx:
        random(
          -1,
          1
        ),

      vy:
        random(
          0,
          1
        ),

      life: 20,

      maxLife: 20,

      size:
        random(
          2,
          4
        )
    });
  }
}


// ============================================================
// ACTUALIZAR PARTÍCULAS
// ============================================================

function updateParticles(dt) {

  for (
    let i =
      particles.length - 1;
    i >= 0;
    i--
  ) {

    let p =
      particles[i];


    p.x +=
      p.vx * dt;

    p.y +=
      p.vy * dt;


    p.vy +=
      0.08 * dt;


    p.life -=
      dt;


    if (
      p.life <= 0
    ) {

      particles.splice(
        i,
        1
      );
    }
  }
}


// ============================================================
// DIBUJAR PARTÍCULAS
// ============================================================

function drawParticles() {

  noStroke();


  for (let p of particles) {

    let alpha =
      map(
        p.life,
        0,
        p.maxLife,
        0,
        220
      );


    fill(
      100,
      220,
      255,
      alpha
    );


    ellipse(
      p.x,
      p.y,
      p.size,
      p.size
    );
  }
}


// ============================================================
// TEXTOS FLOTANTES
// ============================================================

function addFloatingText(
  textValue,
  x,
  y,
  colorValue
) {

  floatingTexts.push({

    text:
      textValue,

    x:
      x,

    y:
      y,

    life:
      60,

    color:
      colorValue
  });
}


function updateFloatingTexts(dt) {

  for (
    let i =
      floatingTexts.length - 1;
    i >= 0;
    i--
  ) {

    let t =
      floatingTexts[i];


    t.y -=
      0.7 * dt;


    t.life -=
      dt;


    if (
      t.life <= 0
    ) {

      floatingTexts.splice(
        i,
        1
      );
    }
  }
}


function drawFloatingTexts() {

  textAlign(
    CENTER,
    CENTER
  );

  textSize(16);


  for (let t of floatingTexts) {

    fill(
      t.color[0],
      t.color[1],
      t.color[2],
      map(
        t.life,
        0,
        60,
        0,
        255
      )
    );


    text(
      t.text,
      t.x - cameraX,
      t.y - cameraY
    );
  }
}


// ============================================================
// HUD MEJORADO
// ============================================================

function drawHUD() {

  push();


  // ==========================================================
  // PANEL PRINCIPAL
  // ==========================================================

  noStroke();

  fill(
    5,
    8,
    28,
    225
  );


  rect(
    18,
    18,
    310,
    132,
    14
  );


  // Borde exterior.

  stroke(
    70,
    220,
    255,
    110
  );

  strokeWeight(1.5);

  noFill();

  rect(
    18,
    18,
    310,
    132,
    14
  );


  // Línea decorativa superior.

  stroke(
    255,
    80,
    190,
    100
  );

  strokeWeight(2);

  line(
    35,
    47,
    310,
    47
  );


  // ==========================================================
  // TÍTULO
  // ==========================================================

  noStroke();

  fill(
    120,
    230,
    255
  );

  textAlign(
    LEFT,
    CENTER
  );

  textSize(15);

  text(
    "SPACE GIRL ADVENTURE",
    34,
    33
  );


  // ==========================================================
  // NIVEL
  // ==========================================================

  fill(255);

  textSize(13);

  text(
    "NIVEL " +
      level,
    34,
    66
  );


  // ==========================================================
  // SCORE
  // ==========================================================

  fill(
    255,
    220,
    80
  );

  text(
    "SCORE",
    34,
    88
  );


  fill(255);

  text(
    score,
    92,
    88
  );


  // ==========================================================
  // GEMAS
  // ==========================================================

  fill(
    100,
    230,
    255
  );

  text(
    "OBJETIVOS",
    150,
    66
  );


  fill(255);

  text(
    gemsCollected +
      " / 3",
    150,
    88
  );


  // ==========================================================
  // VIDAS
  // ==========================================================

  fill(
    255,
    110,
    180
  );

  text(
    "VIDAS",
    245,
    66
  );


  for (
    let i = 0;
    i < min(lives, 5);
    i++
  ) {

    drawHUDHeart(
      252 +
        i * 15,
      89,
      7
    );
  }


  // ==========================================================
  // BARRA DE PROGRESO
  // ==========================================================

  fill(
    160,
    180,
    210
  );

  textSize(10);

  text(
    "PROGRESO DE MISIÓN",
    34,
    110
  );


  let progress =
    constrain(
      player.x /
        worldWidth,
      0,
      1
    );


  // Fondo barra.

  noStroke();

  fill(
    20,
    30,
    60
  );

  rect(
    34,
    119,
    275,
    7,
    4
  );


  // Barra.

  fill(
    70,
    230,
    255
  );

  rect(
    34,
    119,
    275 * progress,
    7,
    4
  );


  // Punto de destino.

  fill(
    255,
    255,
    255
  );

  ellipse(
    34 +
      275 * progress,
    122.5,
    5,
    5
  );


  // ==========================================================
  // OBJETIVOS DEL NIVEL
  // ==========================================================

  let objectiveY =
    138;


  fill(
    90,
    220,
    255,
    180
  );

  textSize(10);

  text(
    "★ RECOLECTA ESTRELLAS",
    34,
    objectiveY
  );


  // ==========================================================
  // PODERES
  // ==========================================================

  drawPowerStatus();


  // ==========================================================
  // CONTROLES
  // ==========================================================

  fill(
    210,
    220,
    240
  );

  textAlign(
    RIGHT,
    CENTER
  );

  textSize(12);


  text(
    "← → MOVER   ESPACIO SALTAR / VOLAR",
    width - 22,
    height - 22
  );


  pop();
}


// ============================================================
// CORAZÓN HUD
// ============================================================

function drawHUDHeart(
  x,
  y,
  s
) {

  push();

  translate(
    x,
    y
  );

  scale(
    s / 23
  );

  noStroke();

  fill(
    255,
    80,
    165
  );

  drawHeartShape(
    0,
    0,
    1
  );

  pop();
}


// ============================================================
// ESTADO PODERES
// ============================================================

function drawPowerStatus() {

  let x =
    width - 190;

  let y =
    25;


  if (
    flightTimer > 0
  ) {

    fill(
      10,
      15,
      40,
      215
    );

    noStroke();

    rect(
      x,
      y,
      170,
      30,
      10
    );


    fill(
      80,
      230,
      255
    );

    textAlign(
      CENTER,
      CENTER
    );

    textSize(12);


    text(
      "✦ VUELO " +
        ceil(
          flightTimer /
          60
        ),
      x + 85,
      y + 15
    );


    y += 36;
  }


  // ----------------------------------------------------------
  // BAJA GRAVEDAD SOLO EN NIVEL 2
  // ----------------------------------------------------------

  if (
    level === 2
  ) {

    fill(
      10,
      15,
      40,
      215
    );

    rect(
      x,
      y,
      170,
      30,
      10
    );


    fill(
      190,
      120,
      255
    );

    textAlign(
      CENTER,
      CENTER
    );

    textSize(12);

    text(
      "◉ BAJA GRAVEDAD",
      x + 85,
      y + 15
    );
  }
}


// ============================================================
// PANTALLA FINAL
// ============================================================

function drawEndScreen() {

  push();


  fill(
    5,
    7,
    25,
    225
  );

  rect(
    0,
    0,
    width,
    height
  );


  textAlign(
    CENTER,
    CENTER
  );


  if (
    gameState ===
    "victory"
  ) {

    fill(
      90,
      240,
      255
    );

    textSize(42);

    text(
      "MISIÓN COMPLETADA",
      width / 2,
      height / 2 - 70
    );


    fill(255);

    textSize(20);

    text(
      "La exploradora ha atravesado los tres mundos",
      width / 2,
      height / 2 - 20
    );

  } else {

    fill(
      255,
      80,
      180
    );

    textSize(48);

    text(
      "GAME OVER",
      width / 2,
      height / 2 - 60
    );


    fill(255);

    textSize(20);

    text(
      "La misión terminó",
      width / 2,
      height / 2 - 10
    );
  }


  fill(
    255,
    220,
    80
  );

  textSize(22);

  text(
    "SCORE  " +
      score,
    width / 2,
    height / 2 + 35
  );


  fill(
    190,
    220,
    255
  );

  textSize(16);

  text(
    "Presiona R para comenzar nuevamente",
    width / 2,
    height / 2 + 80
  );


  pop();
}


// ============================================================
// TECLADO
// ============================================================

function keyPressed() {

  if (
    key === " " ||
    keyCode === 32
  ) {

    jumpPlayer();

    return;
  }


  if (
    key === "r" ||
    key === "R"
  ) {

    restartGame();
  }
}


// ============================================================
// REINICIAR
// ============================================================

function restartGame() {

  level = 1;

  score = 70;

  lives = 3;

  gemsCollected = 0;

  gameState =
    "playing";


  player =
    createPlayer();


  startLevel(1);
}


// ============================================================
// CAMBIO DE TAMAÑO
// ============================================================

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );

  createBackgroundStars();
}
