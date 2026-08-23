/* ---------------- dialog system ---------------- */
function openDialog(title, bodyHtml, actionsHtml){
  dialogOpen = true;
  $("#dialog-title").textContent = title;
  $("#dialog-body").innerHTML = bodyHtml;
  $("#dialog-actions").innerHTML = actionsHtml || "";
  $("#dialog-wrap").classList.add("showing");
  $("#dialog-box").scrollTop = 0;
  blip(660,0.05);
}
function closeDialog(){
  dialogOpen = false;
  $("#dialog-wrap").classList.remove("showing");
}
