"use client";

import { createElement, useLayoutEffect, useRef } from "react";

type ArticleCardProps = { principle: Principle; index: number };

const DIR = "/assets/principle-print";
const HOME = "https://www.alolya.gov.ly/";
const CREDIT = "منصة المبادئ القانونية بالموقع الإلكتروني للمحكمة العليا الليبية";
const SEPARATOR = "data:image/png;base64,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";

const FIELDS = [
  ["مدني", "الطعن المدني", "#F29000", "civil|المدني|مدنية|القضاء المدني|طعن مدني|الطعون المدنية"],
  ["إداري", "الطعن الإداري", "#866300", "admin|administrative|الإداري|إدارية|القضاء الإداري|طعن إداري|الطعون الإدارية"],
  ["دستوري", "الطعن الدستوري", "#2C6FD2", "constitutional|الدستوري|دستورية|القضاء الدستوري|طعن دستوري|الدائرة الدستورية"],
  ["جنائي", "الطعن الجنائي", "#EE0000", "criminal|الجنائي|جنائية|القضاء الجنائي|طعن جنائي|الطعون الجنائية"],
  ["أ. شخصية", "طعن الأحوال الشخصية", "#7C35B1", "personal|أ. الشخصية|أ الشخصية|أحوال شخصية|الأحوال الشخصية|طعن أ. الشخصية|الطعن في الأحوال الشخصية"],
  ["مجتمعة", "طعن الدوائر المجتمعة", "#5AAA65", "full court|الدوائر مجتمعة|الدوائر المجتمعة|دوائر مجتمعة"],
] as const;

function text(value: unknown) {
  const s = typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
  return /^(null|undefined)$/i.test(s) ? "" : s;
}

const key = (v: unknown) => text(v).normalize("NFKC").toLowerCase()
  .replace(/[\u061c\u064b-\u065f\u0670\u200e\u200f\u202a-\u202e\u2066-\u2069ـ]/g, "")
  .replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/[._-]/g, " ")
  .replace(/\s+/g, " ").trim();

function field(value: unknown) {
  const normalized = key(value);
  return FIELDS.find(([label, appeal, , aliases]) =>
    [label, appeal, ...aliases.split("|")].some((alias) => key(alias) === normalized)
  );
}

const digits = (s: string) => s.replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x660))
  .replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 0x6f0));

function date(value: unknown) {
  return digits(text(value)).replace(
    /(^|[^0-9])(?:(\d{4})\s*[-/]\s*(\d{1,2})\s*[-/]\s*(\d{1,2})|(\d{1,2})\s*[-/]\s*(\d{1,2})\s*[-/]\s*(\d{4}))(?![0-9])/g,
    (s, prefix, y1, m1, d1, d2, m2, y2) => {
      const d = Number(d1 || d2), m = Number(m1 || m2);
      return d >= 1 && d <= 31 && m >= 1 && m <= 12 ? prefix + [d, m, y1 || y2].join(" - ") : s;
    }
  );
}

function href(value: unknown) {
  const s = text(value);
  if (!s || /[\x00-\x20\x7f\\]/.test(s)) return "";
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  try {
    const u = new URL(s);
    return ["http:", "https:"].includes(u.protocol) && !u.username && !u.password ? s : "";
  } catch { return ""; }
}

function pageOf(v: unknown) {
  const s = digits(text(v)), n = Number(s);
  return /^\d+$/.test(s) && Number.isSafeInteger(n) && n > 0 ? n : null;
}

const CSS = `
@font-face{font-family:LP-Sakkal;src:local("Sakkal Majalla"),local("Majalla");font-weight:400;font-display:swap}
@font-face{font-family:LP-Sakkal;src:local("Sakkal Majalla Bold"),local("Majalla Bold");font-weight:700;font-display:swap}
@font-face{font-family:LP-Adobe;src:local("Adobe Arabic"),local("Adobe Arabic Regular"),local("AdobeArabic-Regular");font-weight:400;font-display:swap}
@font-face{font-family:LP-Adobe;src:local("Adobe Arabic Bold"),local("AdobeArabic-Bold");font-weight:700;font-display:swap}
.lp{--lh:var(--platform-print-heading-font,LP-Sakkal,"Sakkal Majalla","Noto Sans Arabic",Arial,sans-serif);--lb:var(--platform-print-body-font,LP-Adobe,"Adobe Arabic","Noto Naskh Arabic",Arial,sans-serif);width:210mm;max-width:none;margin:0;padding:0;direction:rtl}
.lp,.lp *{box-sizing:border-box}
.lp-measure{position:fixed!important;top:0;left:-10000px;right:auto;visibility:hidden;pointer-events:none}
.lp-page{position:relative;width:210mm;height:297mm;overflow:hidden;background:white;color:black;margin:0 0 18px;font-family:var(--lh);print-color-adjust:exact;-webkit-print-color-adjust:exact}
.lp-page > header,.lp-page > footer{margin:0;padding:0;border:0}
.lp-qr{position:absolute;left:23.87mm;top:6.8mm;width:20.85mm;height:20.85mm}
.lp-crest{position:absolute;left:170.625mm;transform:translateX(-50%);overflow:hidden}
.lp-crest img{position:absolute;max-width:none;max-height:none;display:block}
.lp-state{top:7.65mm;width:19.15mm;height:8mm}
.lp-state img{width:244.4882%;height:311.4537%;left:-72.8346%;top:-2.2026%}
.lp-court{top:17.6mm;width:35.15mm;height:9.88mm}
.lp-court img{width:133.5484%;height:264.794%;left:-17.0968%;top:-99.2509%}
.lp-office{position:absolute;left:144.35mm;top:31.65mm;width:52.5mm;margin:0;text-align:center;font:400 10pt/1.12 "HSN_Shahd_Regular",var(--lh)}
.lp-basmala{position:absolute;left:50%;top:27mm;width:19.25mm;height:auto;transform:translateX(-50%)}
.lp-strip{position:absolute;left:0;top:105.69mm;width:20mm;height:23mm;display:grid;place-items:center;background:var(--ink);color:white}
.lp-strip span{white-space:nowrap;transform:rotate(-90deg);font:700 18pt/1 var(--lh)}
.lp-running{position:absolute;top:10.5mm;left:25mm;right:25mm;display:flex;align-items:baseline;justify-content:space-between;direction:ltr;white-space:nowrap;color:#808080;font:400 12pt/1.13 "HSN_Shahd_Regular",var(--lh)}
.lp-running a{font:400 10pt/1.13 Calibri,Arial,sans-serif;color:#0563c1}
.lp-story{position:absolute;inset:30mm 25mm 25mm}
.lp-first .lp-story{top:40.75mm}
.lp-flow{display:flow-root}
.lp-intro{display:flex;flex-direction:column;padding-bottom:4.032mm;text-align:center}
.lp-intro > *{margin:0;line-height:1.08;font-weight:700}
.lp-intro bdi{white-space:nowrap}
.lp-title{font-size:24pt;min-height:9.144mm}
.lp-serial{font-size:22pt;min-height:8.382mm;margin-top:3.976mm;color:var(--ink)}
.lp-appeal{font-size:12pt;min-height:4.572mm;margin-top:2.958mm}
.lp-date{font-size:18pt;min-height:6.858mm;margin-top:2.478mm}
.lp-summary,.lp-text{margin:0;padding-inline-start:9mm;font:400 19pt/1.16 var(--lb);white-space:pre-wrap;overflow-wrap:anywhere;text-align:justify;text-align-last:right}
.lp-summary{font-size:18pt}
.lp-summary strong{font-weight:700}
.lp-divider{width:49.18mm;height:8.72mm;margin:4.6mm auto 2.8mm;background:var(--ink);mask:url(${SEPARATOR}) center/100% 100% no-repeat;-webkit-mask:url(${SEPARATOR}) center/100% 100% no-repeat}
.lp-note,.lp-overturn{margin:3mm 0 0;text-align:center;white-space:pre-wrap;overflow-wrap:anywhere;font:400 13pt/1.2 var(--lb)}
.lp-note a{color:#d4a96a;text-decoration:none}
.lp-note a:hover{text-decoration:underline}
.lp-overturn{color:#a1121b}
.lp-credit,.lp-number{position:absolute;margin:0;font:400 14pt/1.07 var(--lh)}
.lp-credit{right:25mm;bottom:15.5mm;text-align:right}
.lp-credit a{color:inherit;text-decoration:none}
.lp-number{bottom:9mm;left:25mm;right:25mm;text-align:center}
@page lpPrinciple{size:A4;margin:0}
@media print{
  .lp-page{page:lpPrinciple;margin:0;height:296.9mm;break-inside:avoid}
  .lp-page:not(:last-child){break-after:page}
  .lp-measure{display:none!important}
}
`;

function draw(host: HTMLDivElement, p: Principle) {
  const d = host.ownerDocument;
  const win = d.defaultView!;
  const [label, appeal, color] = field(p.principle_type) ?? field(p.ruling_type) ?? ["مبدأ", "", "#6B7280"];
  const serial = text(p.serial_number);
  const number = text(p.number), year = text(p.judicial_year);
  const website = href(p.website_url);
  const websiteHost = website ? new URL(website, HOME).hostname : "";
  const courtSite = /(^|\.)alolya\.gov\.ly$/i.test(websiteHost);
  const publication = p.publications?.[0];
  const pdf = href(publication?.pdf_file);
  const shownPage = pageOf(p.page_number) ?? pageOf(publication?.page_number);
  const pdfPage = pageOf(publication?.page_number) ?? shownPage;
  const details = [
    text(p.appeal_year) ? "السنة " + text(p.appeal_year) : "",
    text(p.issue_number) ? "العدد " + text(p.issue_number) : "",
    shownPage ? "ص " + shownPage : "",
  ].filter(Boolean);
  const source = website
    ? (courtSite ? "منشور على الموقع الإلكتروني للمحكمة العليا:" : "منشور على الموقع الإلكتروني:")
    : (pdf || details.length)
      ? "مجلة المحكمة العليا" + (details.length ? ": " + details.join(" - ") : "")
      : "";
  const sourceHref = website || (pdf && pdfPage ? pdf.split("#")[0] + "#page=" + pdfPage : pdf);
  const decision = text(p.overturn_decision);
  const overturnFlag: unknown = p.overturn;
  const overturned = overturnFlag === true || ["1", "true", "نعم", "عدول", "تم العدول"].includes(key(overturnFlag));

  const make = <T extends keyof HTMLElementTagNameMap>(tag: T, css = "", value = "") => {
    const node = d.createElement(tag);
    node.className = css;
    node.textContent = value;
    return node;
  };
  const ltr = (s: string) => { const b = make("bdi", "", s); b.dir = "ltr"; return b; };
  const a = (url: string, s = "") => {
    const link = make("a", "", s);
    link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer";
    return link;
  };
  const img = (file: string, css: string, alt: string) => {
    const i = make("img", css);
    i.src = DIR + "/" + file; i.alt = alt; i.loading = "eager";
    return i;
  };
  const crest = (css: string, alt: string) => {
    const box = make("div", "lp-crest " + css);
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", alt);
    box.append(img("pdf-logo.png", "", ""));
    return box;
  };
  const divider = () => {
    const el = make("div", "lp-divider");
    el.setAttribute("aria-hidden", "true");
    return el;
  };
  const reference = () => {
    const p = make("p", "lp-note");
    if (sourceHref) {
      const link = a(sourceHref, source);
      if (website) link.append(make("br"), ltr(courtSite ? "www.alolya.gov.ly" : websiteHost));
      p.append(link);
    } else p.textContent = source;
    return p;
  };

  const stage = make("div", "lp lp-measure");
  stage.dir = "rtl";
  stage.setAttribute("aria-hidden", "true");
  for (const name of ["--platform-print-heading-font", "--platform-print-body-font"]) {
    const font = win.getComputedStyle(host).getPropertyValue(name).trim();
    if (font) stage.style.setProperty(name, font);
  }
  d.body.append(stage);

  function newPage(n: number) {
    const paper = make("section", "lp-page" + (n === 1 ? " lp-first" : ""));
    paper.style.setProperty("--ink", color);
    paper.setAttribute("aria-label", "صفحة " + n);
    const header = make("header"), footer = make("footer");
    const strip = make("div", "lp-strip");
    strip.append(make("span", "", label));
    const story = make("article", "lp-story"), flow = make("div", "lp-flow");
    story.append(flow);
    footer.append(make("p", "lp-number", String(n)));
    if (n === 1) {
      header.append(img("qr.png", "lp-qr", "رمز الاستجابة السريعة"),
        crest("lp-state", "دولة ليبيا"), crest("lp-court", "المحكمة العليا"),
        make("p", "lp-office", "المكتب الفني بالمحكمة العليا"),
        img("basmala.jpeg", "lp-basmala", "بسم الله الرحمن الرحيم"));
      const title = make("div", "lp-intro");
      const ref = make("p", "lp-serial");
      if (serial) ref.append("رقم المبدأ: ", ltr([serial, text(p.gregorian_year)].filter(Boolean).join(" / ")), " " + label);
      const caseTitle = make("p", "lp-appeal", text(p.ruling_type) || appeal);
      if (number) caseTitle.append(" ", ltr([number, year].filter(Boolean).join(" / ")));
      if (number && year) caseTitle.append(" " + (text(p.sign) || "ق"));
      const session = make("p", "lp-date"), day = date(p.session_date);
      if (day) {
        session.append("جلسة: ");
        day.split(/(\d{1,2} - \d{1,2} - \d{4})/g).forEach((s, i) => session.append(i % 2 ? ltr(s) : s));
      }
      title.append(make("h2", "lp-title", "المبادئ القانونية"), ref, caseTitle, session);
      flow.append(title);
      const brief = text(p.brief), colon = brief.indexOf(":");
      if (brief) {
        const line = make("p", "lp-summary");
        if (colon > 0) line.append(make("strong", "", brief.slice(0, colon + 1)), " " + brief.slice(colon + 1).trimStart());
        else line.textContent = brief;
        flow.append(line, divider());
      }
      const credit = make("p", "lp-credit");
      credit.append(a(website || HOME, CREDIT));
      footer.prepend(credit);
    } else {
      const running = make("div", "lp-running");
      const office = make("span", "", "المكتب الفني بالمحكمة العليا: المبادئ القانونية");
      office.dir = "rtl";
      running.append(office, a(HOME, "www.alolya.gov.ly"));
      header.append(running);
    }
    paper.append(header, strip, story, footer);
    stage.append(paper);
    return { story, flow };
  }

  try {
    let n = 1, current = newPage(n);
    const fits = () => current.flow.getBoundingClientRect().height <= current.story.getBoundingClientRect().height - 0.7;
    if (!fits()) throw new Error("الموجز أطول من مساحة الصفحة الأولى.");
    const parts = [
      { s: text(p.content), css: "lp-text" },
      { s: source, css: "lp-note" },
      { s: overturned ? decision : "", css: "lp-overturn" },
    ].filter((part) => part.s);
    for (const [i, part] of parts.entries()) {
      const last = i === parts.length - 1;
      if (part.css === "lp-note") {
        const note = reference(), closing = last ? divider() : null;
        const addNote = () => {
          current.flow.append(note);
          if (closing) current.flow.append(closing);
        };
        addNote();
        if (!fits()) {
          note.remove();
          closing?.remove();
          current = newPage(++n);
          addNote();
        }
        if (!fits()) throw new Error("مرجع المبدأ أطول من مساحة الصفحة.");
        continue;
      }

      // Keep the ending of the principle with its short source and divider.
      const keepReference = part.css === "lp-text" && parts.length === i + 2 && parts[i + 1]?.css === "lp-note";
      const keepEnd = last || keepReference;
      const words = part.s.match(/[^ \r\n\t]+[ \r\n\t]*/gu) ?? [];
      for (let start = 0; start < words.length;) {
        const line = make("p", part.css);
        const set = (from: number, to?: number) => {
          line.textContent = words.slice(from, to).join("").trim();
        };
        set(start);
        current.flow.append(line);
        const probe = keepReference ? reference() : null;
        const closing = keepEnd ? divider() : null;
        if (probe) current.flow.append(probe);
        if (closing) current.flow.append(closing);
        const completeFits = fits();
        probe?.remove();
        if (completeFits) {
          if (keepReference) closing?.remove();
          break;
        }
        closing?.remove();
        let lo = 0, hi = words.length - start - (keepEnd ? 1 : 0);
        while (lo < hi) {
          const mid = Math.ceil((lo + hi) / 2);
          set(start, start + mid);
          if (fits()) lo = mid; else hi = mid - 1;
        }
        if (!lo) {
          line.remove();
          if (!current.flow.childElementCount) throw new Error("تعذّر توزيع فقرة على الصفحة.");
        } else {
          if (keepEnd) {
            const min = 3 * parseFloat(win.getComputedStyle(line).lineHeight) - 0.5;
            set(start + lo);
            while (lo > 1 && line.getBoundingClientRect().height < min) set(start + --lo);
          }
          set(start, start + lo);
          start += lo;
        }
        if (start < words.length) current = newPage(++n);
      }
    }
    host.replaceChildren(...Array.from(stage.children));
    host.dataset.printReady = "true";
  } finally {
    stage.remove();
  }
}

export default function PrinciplePdfUI({ principle, index }: ArticleCardProps) {
  const pages = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const host = pages.current;
    if (!host) return;
    let active = true;
    const render = () => {
      try { draw(host, principle); }
      catch (error) {
        host.dataset.printReady = "error";
        host.replaceChildren("تعذّر تجهيز قالب الطباعة.");
        console.error(error);
      }
    };
    render();
    void host.ownerDocument.fonts?.ready.then(() => { if (active) render(); });
    return () => { active = false; };
  }, [principle]);

  return createElement("div", { className: "lp", dir: "rtl", lang: "ar", "data-principle-print": index },
    createElement("style", null, CSS),
    createElement("div", { ref: pages, "data-print-ready": "loading" })
  );
}
