const createModal = (title, content, buttons) => {
  $("body").append(
    `<div class="modal"><div class="modal-container"><div class="modal-header" style="width: 100%; text-align: center; justify-content: center;">${title}</div><div class="modal-content">${content}</div><div class="modal-buttons"></div></div></div>`
  );
  Object.keys(buttons).forEach((button) => {
    document
      .querySelector(".modal-buttons")
      .appendChild(document.createElement("div"))
      .classList.add("button");
    document.querySelector(".modal-buttons").lastChild.innerHTML = button;
    document
      .querySelector(".modal-buttons")
      .lastChild.addEventListener("click", buttons[button]);
  });
};

const codes = {
  rainbow: `localStorage.setItem('chatColor', 'gradient=[25deg: #f20505, #f26c05, #f2da05, #74f205, #05f28b, #05a7f2, #050df2]')`,
  "shades of grey": `localStorage.setItem('chatColor', 'gradient=[25deg: #fcfcfc, #050505]')`,
  "firey red": `localStorage.setItem('chatColor', 'gradient=[25deg: #f20505, #f26c05, #f2da05]')`,
  "bright cyan": `localStorage.setItem('chatColor', 'gradient=[25deg: #b5fffd, #8cfffc, #77ebfc, #68ceed]')`,
  "rich gold": `localStorage.setItem('chatColor', 'gradient=[25deg: #f2d64b, #967e0b]')`,
  death: `localStorage.setItem('chatColor', 'gradient=[25deg: #ed1005, #0a0100]')`,
  "watching the sunset": `localStorage.setItem('chatColor', 'gradient=[195deg: #FFA41C, #FF24BD]')`,
  beach: `localStorage.setItem('chatColor', 'gradient=[75deg: #FAFF5C, #98FFF5]')`,
  striped: `localStorage.setItem("chatColor", "gradient=[165deg: #5E38F7, #000000, #5E38F7, #000000, #5E38F7, #000000, #5E38F7]")`,
  passion: `localStorage.setItem('chatColor', 'gradient=[100deg: #fc1303, #9e0d03]')`,
  "blood orange": `localStorage.setItem('chatColor', 'gradient=[100deg: #fa7b05, #ad5605]')`,
  "ice cold": `localStorage.setItem('chatColor', 'gradient=[25deg: #bef7e7, #b5f5ec, #abeaed, #a5e7f0, #9edaf0]')`,
  "cotton candy": `localStorage.setItem('chatColor', 'gradient=[40deg: #ffbcd9, #A0D9EF]')`,
  "pretty in pastel": `localStorage.setItem('chatColor', 'gradient=[90deg: #ffb3ba, #ffdfba, #ffffba, #baffc9, #bae1ff]')`,
  "preposterous purple": `localStorage.setItem('chatColor', 'gradient=[right: #e0c3fc, #8ec5fc]')`,
};

window.copy = async (c) => {
  await navigator.clipboard.writeText(codes[c]);
};

window.transBG = (c) => {
  let bg = new TimelineMax();
  bg.to("#gradName", {
    opacity: 0,
    scaleX: 0,
    ease: Expo.easeIn,
  })
    .to(".background", {
      duration: 0.5,
      ease: Expo.easeIn,
      opacity: 0,
      scaleY: 0,
      scaleX: 0,
      transformOrigin: "center bottom"
    })
    .call(() => {
      document.querySelector(".background").style.background = parseCode(c);
      document.querySelector("#gradName").textContent = c.startsWith('gradient=') ? 'custom gradient' : c;
    })
    .to("#gradName", {
      opacity: 1,
      scaleX: 1,
      ease: Expo.easeOut,
    })
    .to(".background", {
      duration: 0.5,
      ease: Expo.easeOut,
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      transformOrigin: "center bottom",
      filter: 'brightness(70%)'
    });
};

const parseCode = (g) => {
  let code = codes[g] ? codes[g] : g;
  let raw = code.split("[")[1].split("]")[0].split(": ");
  let deg = raw[0];
  let colors = raw[1].split(", ");
  let dir;
  if (!deg.endsWith("deg"))
    dir =
      "to " +
      (deg === "up"
        ? "top"
        : deg === "down"
        ? "bottom"
        : deg === "right"
        ? "right"
        : deg);
  else dir = deg;
  return "linear-gradient(" + dir + ", " + colors.join(", ") + ")";
};

Object.keys(codes).forEach((code) => {
  $(".prem-btns").append(
    `<button style="display: flex; flex-direction: column; text-align: center; align-items: center; justify-content: center; min-width: 2vw; min-height: 2vw; aspect-ratio: 1/1; box-sizing: border-box; border-radius: 50%; padding: 0px !important;" onclick="transBG('${code}'); copy('${code}')" class="gradbutton"><div style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; background: ${parseCode(
      code
    )}; border-radius: 50%; min-width: 2.7vw !important; min-height: 2.7vw !important; aspect-ratio: 1/1 !important; margin: 0px !important; padding: 0px !important;"></div></button>`
  );
});

let cAngle = 8;
let angles = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
  180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320,
  330, 340, 350, 360,
];

let ap = document.getElementById("anglePicker");

var held = false;

ap.onmousedown = () => {
  held = true;
  var int;
  int = setInterval(() => {
    if (!held)
      return clearInterval(int);
    if (cAngle < (angles.length - 1)) {
      console.log(cAngle, angles.length - 1)
      cAngle++;
      ap.style.transform = "rotate(" + angles[cAngle] + "deg)";
    } else {
      cAngle = 0;
      ap.style.transform = "rotate(" + angles[cAngle] + "deg)";
    }
  }, 200)
  
};

ap.onmouseup = () => {
  held = false;
};

function getDominantColors(imgEl) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imgWidth = imgEl.naturalWidth,
    imgHeight = imgEl.naturalHeight;

  canvas.width = imgWidth;
  canvas.height = imgHeight;
  ctx.drawImage(imgEl, 0, 0);

  const data = ctx.getImageData(0, 0, imgWidth, imgHeight).data;

  var colorThief = new ColorThief();

  var palette = colorThief
    .getPalette(imgEl)
    .map((x) => "rgb(" + x.join(",") + ")")
    .filter((x) => x !== "rgb(0,0,0)");
  palette = palette.slice(
    0,
    document.getElementById("blookRange").value > palette.length
      ? palette.length
      : document.getElementById("blookRange").value
  );
  return palette;
}

function rgbToHex(rgb) {
  const [r, g, b] = rgb
    .split("rgb(")[1]
    .split(")")[0]
    .split(",")
    .map((x) => parseInt(x.trim()));
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function toDataURL(image) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.height = image.naturalHeight;
  canvas.width = image.naturalWidth;
  context.drawImage(image, 0, 0);
  var dataURL = canvas.toDataURL("image/jpeg");
  return dataURL;
}

window.genBlook = async () => {
  var cont = document.getElementById("fbContainer");
  var span = document.createElement("span");
  span.style.fontFamily = "Lexend";
  span.style.color = "white";
  span.style.fontSize = "2vw";
  span.style.filter = "drop-shadow(0px 0px 2px #000)";
  span.style.margin = "2vw";
  span.textContent = "Generating colors...";
  cont.appendChild(span);
  var blooks = Object.fromEntries(
    Object.entries(
      await (
        await fetch("/assets/blooks.json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json()
    ).map((x) => [x[0].toLowerCase(), x[1]])
  );

  if (!blooks[document.getElementById("blook").value.toLowerCase()])
    createModal("Error", "Invalid blook.", {
      Close: () => document.querySelector(".modal").remove(),
    });

  const image = new Image();
  image.src =
    blooks[document.getElementById("blook").value.toLowerCase()].image;
  image.crossOrigin = "Anonymous";
  image.onload = async () => {
    const colors = getDominantColors(image).map((x) => rgbToHex(x));

    var gradientStops = "gradient=[90deg: " + colors.join(", ") + "]";

    transBG(gradientStops);

    span.remove();

    createModal(
      "Text copied to your clipboard.",
      `<span style="font-family: \'Lexend\', sans-serif; color: ${
        colors[0]
      };">Name color: ${
        colors[0]
      }</span><br><span style="font-family: \'Lexend\', sans-serif; -webkit-text-fill-color: transparent; background: ${parseCode(
        gradientStops
      )}; -webkit-background-clip: text; background-clip: text;">Text looks like this.</span>`,
      {
        Close: () => document.querySelector(".modal").remove(),
      }
    );

    await navigator.clipboard.writeText(
      `localStorage.setItem(\'chatColor\', \'${gradientStops}\');`
    );
  };
};

window.genG = async () => {
  let tl = document.getElementById("timeline");
  let ch = [...tl.children];

  if (ch.length < 2)
    return createModal(
      "Error",
      "You need to have at least two colors to make a gradient.",
      {
        Close: () => document.querySelector(".modal").remove(),
      }
    );
  else if (ch.length > 7)
    return createModal(
      "Error",
      "You can only have up to 7 colors in a gradient.",
      {
        Close: () => document.querySelector(".modal").remove(),
      }
    );

  let ang = angles[cAngle];
  ang =
    ang === 0
      ? "up"
      : ang === 90
      ? "right"
      : ang === 180
      ? "down"
      : ang === 270
      ? "left"
      : ang === undefined || ang === "undefined"
      ? "up"
      : ang + "deg";

  let grS = [];

  for (let x of ch) {
    grS.push(
      x
        .getAttribute("style")
        .split(";")
        .filter((x) => x.split(":")[0] === "--color")[0]
        .split(":")[1]
    );
  }

  await navigator.clipboard.writeText(
    "localStorage.setItem('chatColor', '" +
      "gradient=[" +
      ang +
      ": " +
      grS.join(", ") +
      "]" +
      "')"
  );

  createModal(
    "Text copied to your clipboard.",
    `<span style="font-family: \'Lexend\', sans-serif; -webkit-text-fill-color: transparent; background: ${parseCode(
      "gradient=[" + ang + ": " + grS.join(", ") + "]"
    )}; -webkit-background-clip: text; background-clip: text;">Text looks like this.</span>`,
    {
      Close: () => document.querySelector(".modal").remove(),
    }
  );

  transBG("gradient=[" + ang + ": " + grS.join(", ") + "]");
};
