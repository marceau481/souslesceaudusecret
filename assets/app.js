// assets/app.js
async function loadIssues() {
  const res = await fetch("content/issues.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Impossible de charger content/issues.json");
  return await res.json();
}

function $(sel) { return document.querySelector(sel); }

function formatIssueLabel(issue){
  return `N°${issue.id} — ${issue.title}`;
}

function issueUrl(issue){
  return `numero.html?issue=${encodeURIComponent(issue.slug)}`;
}

function renderIssuesGrid(targetSel, issues){
  const el = $(targetSel);
  if(!el) return;
  el.innerHTML = (issues || []).map(i => `
    <article class="issueItem">
      <img class="cover" src="${i.cover || ""}" alt="Couverture ${formatIssueLabel(i)}" onerror="this.style.display='none'"/>
      <h3>${formatIssueLabel(i)}</h3>
      <div class="issueMeta">
        <span>${i.monthLabel ?? ""}</span>
        <a class="btn" href="${issueUrl(i)}">Le lire</a>
      </div>
    </article>
  `).join("") || `<div class="muted">Aucun numéro pour l’instant.</div>`;
}

function renderSummaryPreview(issue){
  const summary = (issue && issue.summary) ? issue.summary : [];
  if(!summary.length) return `<div class="muted">Sommaire à venir.</div>`;
  return summary.slice(0, 10).map(s => `
    <div style="padding:10px 0;border-top:1px solid var(--line);">
      <div class="muted">${s.item ? s.item : (s.section || "")}</div>
      <div>${(s.section && s.item) ? s.section : ""}</div>
      <div class="muted">${s.author ?? ""}</div>
    </div>
  `).join("");
}

function renderIssuePage(issue){
  $("#issue-cover").src = issue.cover || "";
  $("#issue-kicker").textContent = `N° ${issue.id} — ${issue.monthLabel ?? ""}`;
  $("#issue-title").textContent = issue.title || "";

  $("#issue-quote").textContent = issue.heroQuote ?? "";
  $("#issue-def").textContent = issue.definition ?? "";

  const summaryEl = $("#issue-summary");
  summaryEl.innerHTML = (issue.summary || []).map(s => `
    <li>
      <strong>${s.section || ""}</strong>
      ${s.item ? `— ${s.item}` : ""}
      ${s.author ? `<span class="muted"> · ${s.author}</span>` : ""}
    </li>
  `).join("") || `<li class="muted">Sommaire à venir.</li>`;

  const pdf = $("#issue-pdf");
  const warn = $("#pdf-warning");
  pdf.href = issue.pdfUrl || "#";
  if((issue.pdfUrl || "#") === "#"){
    warn.style.display = "block";
    warn.textContent = "PDF non configuré : ajoute un PDF via /admin (ou renseigne pdfUrl).";
  }
}

async function init(){
  const page = document.body.dataset.page;

  let data;
  try {
    data = await loadIssues();
  } catch (e){
    console.error(e);
    return;
  }

  const ISSUES = data.issues || [];
  const OLD_ISSUES = data.old_issues || [];

  if(page === "home"){
    const latest = ISSUES[0];
    if(latest){
      $("#latest-title").textContent = `N°${latest.id}`;
      $("#latest-theme").textContent = latest.title || "";
      $("#latest-excerpt-title").textContent = latest.excerptTitle ?? "";
      $("#latest-excerpt-text").textContent = latest.excerptText ?? "";
      $("#latest-summary").innerHTML = renderSummaryPreview(latest);
      $("#latest-read").href = issueUrl(latest);
    }
    renderIssuesGrid("#home-issues", ISSUES.slice(1, 5));
  }

  if(page === "numeros"){
    renderIssuesGrid("#issues-new", ISSUES);
    renderIssuesGrid("#issues-old", OLD_ISSUES);
  }

  if(page === "numero"){
    const params = new URLSearchParams(location.search);
    const slug = params.get("issue");
    const issue = [...ISSUES, ...OLD_ISSUES].find(i => i.slug === slug) || ISSUES[0];
    if(issue) renderIssuePage(issue);
  }

  const form = $("#newsletter-form");
  if(form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Test : inscription enregistrée (à brancher sur Mailchimp/Brevo/etc).");
      form.reset();
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
