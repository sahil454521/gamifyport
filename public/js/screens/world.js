/* ---------------- building content ---------------- */
function enterBuilding(b){
  blip(700,0.06);
  if(b.id==="about") return showAbout();
  if(b.id==="skills") return showSkills();
  if(b.id==="projects") return showProjects();
  if(b.id==="contact") return showContact();
  if(b.id==="gym") return showGymEntrance();
}

function showAbout(){
  const body = window.CONFIG.about.map(p=>`<p>${p}</p>`).join("");
  openDialog("ABOUT ME", body,
    `<button class="pxl-btn" onclick="closeDialog()">CLOSE</button>`);
}
function showSkills(){
  let body = "";
  Object.keys(window.CONFIG.skills).forEach(cat=>{
    body += `<p><b>${cat}:</b><br>` + window.CONFIG.skills[cat].map(s=>`<span class="tag">${s}</span>`).join(" ") + `</p>`;
  });
  openDialog("SKILLS SHOP — ITEMS ACQUIRED", body,
    `<button class="pxl-btn" onclick="closeDialog()">CLOSE</button>`);
}
function showProjects(){
  let body = window.CONFIG.projects.map(p=>`
    <div class="proj-card">
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div>${p.tech.map(t=>`<span class="tag">${t}</span>`).join(" ")}</div>
      ${p.link && p.link!=="#" ? `<a class="link-btn" href="${p.link}" target="_blank" rel="noopener">VIEW →</a>` : ""}
    </div>`).join("");
  openDialog("PROJECTS HALL", body,
    `<button class="pxl-btn" onclick="closeDialog()">CLOSE</button>`);
}
function showContact(){
  const c = window.CONFIG.contact;
  const body = `
    <div class="contact-row"><b>Email</b> <a class="link-btn" href="mailto:${c.email}">${c.email}</a></div>
    <div class="contact-row"><b>GitHub</b> <a class="link-btn" href="${c.github}" target="_blank" rel="noopener">Visit →</a></div>
    <div class="contact-row"><b>LinkedIn</b> <a class="link-btn" href="${c.linkedin}" target="_blank" rel="noopener">Visit →</a></div>
    <div class="contact-row"><b>Website</b> <a class="link-btn" href="${c.website}" target="_blank" rel="noopener">Visit →</a></div>
  `;
  openDialog("CONTACT — SIGNPOST", body,
    `<button class="pxl-btn" onclick="closeDialog()">CLOSE</button>`);
}
function showGymEntrance(){
  openDialog("GYM", `<p>The GYM LEADER blocks your path.</p><p>"So — you want the résumé? Beat me in battle, or just ask for it directly. Your call."</p>`,
    `<button class="pxl-btn red" onclick="closeDialog(); startBattle();">⚔ BATTLE</button>
     <button class="pxl-btn gold" onclick="closeDialog(); showResumePanel(false);">📄 JUST SHOW ME</button>
     <button class="pxl-btn" onclick="closeDialog()">LEAVE</button>`);
}
