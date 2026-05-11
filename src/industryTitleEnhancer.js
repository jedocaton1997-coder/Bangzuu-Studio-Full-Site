const INDUSTRY_TITLES = new Set([
  "TRAVEL & TOURISM",
  "ENTERTAINMENT & MEDIA",
  "FITNESS & LIFESTYLE",
]);

function createSvgEl(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function enhanceIndustryTitles() {
  document.querySelectorAll("svg text").forEach((text) => {
    const label = (text.textContent || "").trim();
    if (!INDUSTRY_TITLES.has(label)) return;
    if (text.dataset.industryTitleEnhanced === "true") return;

    const svg = text.closest("svg");
    const parent = text.parentNode;
    if (!svg || !parent) return;

    const viewBox = svg.getAttribute("viewBox") || "0 0 700 380";
    const parts = viewBox.split(/\s+/).map(Number);
    const width = Number.isFinite(parts[2]) ? parts[2] : 700;

    const bar = createSvgEl("rect");
    bar.setAttribute("x", "0");
    bar.setAttribute("y", "0");
    bar.setAttribute("width", String(width));
    bar.setAttribute("height", "54");
    bar.setAttribute("fill", "rgba(0,0,0,.56)");
    bar.setAttribute("class", "industry-title-bar");

    const line = createSvgEl("line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "54");
    line.setAttribute("x2", String(width));
    line.setAttribute("y2", "54");
    line.setAttribute("stroke", "rgba(253,186,116,.26)");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("class", "industry-title-line");

    parent.insertBefore(bar, text);
    parent.insertBefore(line, text);

    text.setAttribute("x", "28");
    text.setAttribute("y", "34");
    text.setAttribute("fill", "#fde68a");
    text.setAttribute("font-family", "Bebas Neue");
    text.setAttribute("font-size", "24");
    text.setAttribute("letter-spacing", "4");
    text.setAttribute("class", `${text.getAttribute("class") || ""} industry-title-text`.trim());
    text.dataset.industryTitleEnhanced = "true";
  });
}

if (typeof window !== "undefined") {
  const run = () => requestAnimationFrame(enhanceIndustryTitles);
  run();
  window.addEventListener("load", run, { once: true });

  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
