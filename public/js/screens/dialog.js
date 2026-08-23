// ========================================
// DIALOG SYSTEM
// ========================================

function openDialog(title, bodyHtml, actionsHtml) {
    dialogOpen = true;

    const wrap = document.getElementById("dialog-wrap");
    const titleEl = document.getElementById("dialog-title");
    const bodyEl = document.getElementById("dialog-body");
    const actionsEl = document.getElementById("dialog-actions");
    const boxEl = document.getElementById("dialog-box");

    if (!wrap || !titleEl || !bodyEl) return;

    titleEl.textContent = title;
    bodyEl.innerHTML = bodyHtml;
    if (actionsEl) actionsEl.innerHTML = actionsHtml || "";

    wrap.classList.add("showing");
    wrap.style.display = "flex";
    if (boxEl) boxEl.scrollTop = 0;

    if (typeof blip === "function") blip(660, 0.05);
}

function closeDialog() {
    dialogOpen = false;
    const wrap = document.getElementById("dialog-wrap");
    if (wrap) {
        wrap.classList.remove("showing");
        wrap.style.display = "none";
    }
}

// Bind close button
function initDialog() {
    const closeBtn = document.getElementById("dialog-close");
    if (closeBtn) {
        closeBtn.onclick = closeDialog;
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDialog);
} else {
    initDialog();
}

console.log("✅ dialog.js loaded");
