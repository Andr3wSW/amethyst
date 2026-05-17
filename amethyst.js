```js id="7kq2mv"
(() => {
  // Prevent duplicates
  if (document.getElementById("amethyst-root")) return;

  // ROOT
  const root = document.createElement("div");
  root.id = "amethyst-root";
  root.innerHTML = `
    <div id="amethyst-panel">

      <div class="amethyst-bg">
        <div class="am-circle"></div>
        <div class="am-circle"></div>
        <div class="am-circle"></div>
        <div class="am-circle"></div>
        <div class="am-circle"></div>
      </div>

      <div class="am-header">
        <div>
          <div class="am-title">Amethyst Assistant</div>
          <div class="am-subtitle">Gemini Powered</div>
        </div>

        <button id="amethyst-close">✕</button>
      </div>

      <input
        type="password"
        id="amethyst-key"
        placeholder="Enter Gemini API key"
      />

      <button id="amethyst-run">
        GET ANSWER
      </button>

      <button id="amethyst-diagnostic">
        ENABLE DIAGNOSTIC MODE
      </button>

      <div id="amethyst-output">
        Ready.
      </div>

    </div>
  `;

  document.body.appendChild(root);

  // STYLE
  const style = document.createElement("style");
  style.textContent = `
    #amethyst-root * {
      box-sizing: border-box;
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Helvetica,
        Arial,
        sans-serif;
    }

    #amethyst-panel {
      position: fixed;
      top: 30px;
      right: 30px;
      width: 390px;
      z-index: 999999999;

      background: #f5efff;
      border: 2px solid #e0d0ff;
      border-radius: 24px;

      overflow: hidden;

      box-shadow:
        0 20px 50px rgba(128, 51, 255, 0.25),
        0 8px 20px rgba(128, 51, 255, 0.15);

      color: #4a3e56;

      backdrop-filter: blur(10px);
    }

    .amethyst-bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .am-circle {
      position: absolute;
      top: -60px;
      border-radius: 50%;
      background:
        linear-gradient(
          135deg,
          rgba(155,102,255,0.25),
          rgba(115,31,255,0.15)
        );

      animation: amFall linear infinite;
    }

    .am-circle:nth-child(1) {
      left: 10%;
      width: 40px;
      height: 40px;
      animation-duration: 8s;
    }

    .am-circle:nth-child(2) {
      left: 30%;
      width: 25px;
      height: 25px;
      animation-duration: 11s;
      animation-delay: 2s;
    }

    .am-circle:nth-child(3) {
      left: 55%;
      width: 50px;
      height: 50px;
      animation-duration: 9s;
      animation-delay: 4s;
    }

    .am-circle:nth-child(4) {
      left: 75%;
      width: 20px;
      height: 20px;
      animation-duration: 7s;
      animation-delay: 1s;
    }

    .am-circle:nth-child(5) {
      left: 85%;
      width: 35px;
      height: 35px;
      animation-duration: 13s;
      animation-delay: 5s;
    }

    @keyframes amFall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }

      10% {
        opacity: 1;
      }

      90% {
        opacity: 1;
      }

      100% {
        transform: translateY(500px) rotate(360deg);
        opacity: 0;
      }
    }

    .am-header {
      position: relative;
      z-index: 2;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 20px 20px 10px;
    }

    .am-title {
      font-size: 24px;
      font-weight: 800;
      color: #731fff;
      letter-spacing: -0.03em;
      text-shadow: 0 2px 8px rgba(115,31,255,0.15);
    }

    .am-subtitle {
      margin-top: 2px;
      font-size: 12px;
      color: #9b66ff;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    #amethyst-close {
      border: none;
      background: rgba(255,255,255,0.8);
      width: 36px;
      height: 36px;
      border-radius: 12px;
      cursor: pointer;
      font-size: 16px;
      color: #731fff;
      font-weight: bold;
      transition: 0.15s;
    }

    #amethyst-close:hover {
      background: white;
      transform: scale(1.05);
    }

    #amethyst-panel input,
    #amethyst-panel button,
    #amethyst-output {
      position: relative;
      z-index: 2;
    }

    #amethyst-key {
      width: calc(100% - 40px);
      margin: 10px 20px;

      border: 2px solid #dacbf5;
      background: rgba(255,255,255,0.95);

      color: #2d1f3d;

      padding: 16px;
      border-radius: 14px;

      outline: none;

      font-size: 15px;
      font-weight: 500;

      transition: 0.15s;

      box-shadow:
        0 4px 12px rgba(155,102,255,0.08);
    }

    #amethyst-key:focus {
      border-color: #8033ff;

      box-shadow:
        0 0 0 4px rgba(128,51,255,0.15),
        0 8px 20px rgba(128,51,255,0.25);
    }

    #amethyst-key::placeholder {
      color: #bdaec7;
    }

    #amethyst-run,
    #amethyst-diagnostic {
      width: calc(100% - 40px);

      margin: 10px 20px;

      border: none;
      border-radius: 14px;

      padding: 17px;

      font-size: 15px;
      font-weight: 700;

      cursor: pointer;

      transition: 0.15s;
    }

    #amethyst-run {
      background: #8033ff;
      color: white;

      box-shadow:
        0 6px 16px rgba(128,51,255,0.35);
    }

    #amethyst-run:hover {
      background: #9452ff;
      transform: translateY(-1px);
    }

    #amethyst-diagnostic {
      background: #ff40aa;
      color: white;

      box-shadow:
        0 6px 16px rgba(255,64,170,0.35);
    }

    #amethyst-diagnostic:hover {
      background: #ff66be;
      transform: translateY(-1px);
    }

    #amethyst-output {
      margin: 20px;

      min-height: 80px;
      max-height: 250px;

      overflow-y: auto;

      background: rgba(255,255,255,0.9);

      border: 2px dashed #cfbdf2;

      border-radius: 14px;

      padding: 16px;

      line-height: 1.7;
      font-size: 14px;

      color: #3b2d4a;

      box-shadow:
        0 4px 12px rgba(155,102,255,0.05);
    }
  `;

  document.head.appendChild(style);

  // ELEMENTS
  const closeBtn = document.getElementById("amethyst-close");
  const runBtn = document.getElementById("amethyst-run");
  const diagnosticBtn = document.getElementById("amethyst-diagnostic");
  const output = document.getElementById("amethyst-output");
  const keyInput = document.getElementById("amethyst-key");

  // LOAD SAVED KEY
  keyInput.value = localStorage.getItem("amethyst_api_key") || "";

  let diagnosticMode = false;

  // CLOSE
  closeBtn.onclick = () => {
    root.remove();
    style.remove();
  };

  // DIAGNOSTIC TOGGLE
  diagnosticBtn.onclick = () => {
    diagnosticMode = !diagnosticMode;

    if (diagnosticMode) {
      diagnosticBtn.textContent = "DISABLE DIAGNOSTIC MODE";
      output.textContent =
        "Diagnostic Mode Activated. Smarter Model is In Use";
    } else {
      diagnosticBtn.textContent = "ENABLE DIAGNOSTIC MODE";
      output.textContent = "Diagnostic Mode Disabled.";
    }
  };

  // MAIN
  runBtn.onclick = async () => {
    const key = keyInput.value.trim();

    if (!key) {
      output.textContent = "Please enter your Gemini API key.";
      return;
    }

    localStorage.setItem("amethyst_api_key", key);

    output.textContent = "Scanning page...";

    try {
      // Grab visible text from page
      const pageText = document.body.innerText
        .replace(/\s+/g, " ")
        .slice(0, 15000);

      output.textContent = "Sending to Gemini...";

      const model = diagnosticMode
        ? "gemini-2.5-pro"
        : "gemini-2.5-flash";

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text:
`You are a math assistant.

Solve the question shown on the webpage.

Answer basically as possible while still explaining clearly.

DO NOT use:
- LaTeX
- \\boxed
- \\frac
- fancy math formatting

Use:
- x for multiplication
- / for division
- simple fractions like 3/4

Webpage content:

${pageText}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || "Request failed"
        );
      }

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

      output.innerHTML = text
        .replace(/\n/g, "<br>");
    } catch (err) {
      console.error(err);

      output.textContent =
        "Error: " + err.message;
    }
  };
})();
```
