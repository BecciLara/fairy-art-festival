// Tabs umschalten
const btnSam = document.getElementById('tab-btn-samstag');
const btnSon = document.getElementById('tab-btn-sonntag');
const tabSam = document.getElementById('tab-samstag');
const tabSon = document.getElementById('tab-sonntag');

function selectTab(day) {
  const sam = day === 'samstag';
  btnSam.setAttribute('aria-selected', sam);
  btnSon.setAttribute('aria-selected', !sam);
  tabSam.hidden = !sam;
  tabSon.hidden = sam;
}
if (btnSam && btnSon) {
  btnSam.addEventListener('click', () => selectTab('samstag'));
  btnSon.addEventListener('click', () => selectTab('sonntag'));
}

// Filter Bühne/Ort
const stageFilter = document.getElementById('stageFilter');
function applyFilter() {
  const val = stageFilter.value;
  document.querySelectorAll('table.timetable tbody tr').forEach(tr => {
    const stage = tr.getAttribute('data-stage');
    tr.style.display = (val === 'all' || stage === val) ? '' : 'none';
  });
}
if (stageFilter) {
  stageFilter.addEventListener('change', applyFilter);
  applyFilter();
}

// ICS Export – erzeugt eine ics-Datei aus den sichtbaren Rows (vereinfachte Version)
const icsBtn = document.getElementById('icsBtn');
if (icsBtn) {
  icsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Fairy Art Festival//Programm//DE'];

    document.querySelectorAll('table.timetable').forEach(table => {
      const dayName = table.dataset.day; // samstag/sonntag
      const dayDate = (dayName === 'samstag') ? '20250823' : '20250824'; // ggf. anpassen

      table.querySelectorAll('tbody tr').forEach(tr => {
        if (tr.style.display === 'none') return; // gefilterte auslassen
        const tds = tr.querySelectorAll('td');
        const time = tds[0].textContent.trim(); // "HH:MM – HH:MM"
        const title = tds[1].innerText.replace(/\s+/g,' ').trim();
        const location = tds[2].innerText.trim();
        const note = tds[3]?.innerText.trim() || '';

        const match = time.match(/(\d{1,2}):(\d{2}).*(\d{1,2}):(\d{2})/);
        if (!match) return;
        const [_, sh, sm, eh, em] = match;

        const dtstart = `${dayDate}T${sh.padStart(2,'0')}${sm}00`;
        const dtend   = `${dayDate}T${eh.padStart(2,'0')}${em}00`;

        lines.push('BEGIN:VEVENT');
        lines.push(`UID:${crypto.randomUUID()}@fairy.art`);
        lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z'}`);
        lines.push(`DTSTART:${dtstart}`);
        lines.push(`DTEND:${dtend}`);
        lines.push(`SUMMARY:${title}`);
        lines.push(`LOCATION:${location}`);
        if (note) lines.push(`DESCRIPTION:${note}`);
        lines.push('END:VEVENT');
      });
    });

    lines.push('END:VCALENDAR');
    const blob = new Blob([lines.join('\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fairy-art-festival-programm.ics';
    a.click();
    URL.revokeObjectURL(url);
  });
}
