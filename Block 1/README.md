# Hybrid App – Steckbrief

## Kurzbeschreibung

Eine Hybrid App ist eine Web-App (HTML/CSS/JS), die in eine native Hülle («WebView») verpackt wird. So läuft sie auf mehreren Plattformen und hat trotzdem Zugriff auf native Gerätefunktionen.

---

## Typische Technologien

- **Frameworks:** Ionic, Apache Cordova, Capacitor
- **Sprachen:** HTML, CSS, JavaScript / TypeScript
- **Frontend-Frameworks:** Angular, React, Vue
- **Laufzeitumgebung:** WebView (Android & iOS)

---

## Beispiele

- Instagram (frühere Version)
- Twitter Lite
- Untis Mobile
- Viele Banking-Apps

---

## Typische Anwendungsfälle

**Geeignet für:**
- Firmen mit bestehendem Web-Team
- Projekte mit Zeit- oder Budgetdruck auf mehreren Plattformen
- Content-Apps, News-Apps, E-Commerce

**Weniger geeignet für:**
- Grafikintensive Spiele
- Apps mit sehr hohen Performance-Anforderungen

---

## Eigenschaften

| Kriterium | Bewertung | Kommentar |
|---|---|---|
| Platform APIs | ★★★☆☆ | Zugriff via Cordova/Capacitor-Plugins – nicht alle APIs verfügbar, Plugins nötig |
| Performance | ★★★☆☆ | WebView ist langsamer als nativ; reicht für die meisten Apps |
| Kosten / Zeit | ★★★★☆ | Eine Codebase für alle Plattformen – deutlich günstiger als native |
| UX | ★★★☆☆ | Kann nativ wirken, fühlt sich aber oft «web-artig» an; plattformspezifische Gesten fehlen |
| Offline | ★★★☆☆ | Möglich via Service Worker / lokaler Datenspeicherung – braucht extra Aufwand |
| Distribution | ★★★★☆ | App Store + Play Store – vertraute Installation für Nutzer |
| Updates | ★★★★☆ | Web-Teil kann ohne Store-Update geändert werden; native Hülle braucht Store-Release |
| Plattformsupport | ★★★★★ | iOS, Android, (Web) – eine Codebase, volle Abdeckung |

---

## Abgrenzung zu anderen App-Typen

| Typ | Unterschied zur Hybrid App |
|---|---|
| Native App | Beste Performance/UX, aber teuer (separate Codebases pro Plattform) |
| Cross-Platform (React Native / Flutter) | Rendert native Komponenten statt WebView → bessere Performance, ähnliche Kosten |
| PWA | Nur im Browser, kein App Store; weniger API-Zugriff |

---

## Quellen

- [Ionic Framework](https://ionicframework.com/)
- [Apache Cordova](https://cordova.apache.org/)
- [Capacitor](https://capacitorjs.com/)