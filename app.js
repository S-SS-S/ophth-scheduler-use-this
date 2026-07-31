(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const state = { lang: 'ar', recommendations: [], earliest: null };

  const translations = {
    ar: {
      pageTitle: 'حاسبة مواعيد زيارة طبيب العيون',
      eyebrow: 'أداة تثقيفية ثنائية اللغة',
      heroTitle: 'اعرف موعد متابعة عيونك بطريقة أوضح',
      heroText: 'أدخل معلومات المتابعة الروتينية، واختر الحالات ذات الصلة، وستعرض الأداة أقرب موعد مقترح مع سبب واضح.',
      heroStat: 'الحساب يتم محليًا في جهازك',
      urgentTitle: 'لا تستخدم الحاسبة للأعراض العاجلة',
      urgentText: 'فقدان النظر المفاجئ، الستارة أو الظل، الومضات أو العوائم الجديدة، الألم الشديد، إصابة العين أو التعرض للمواد الكيميائية تتطلب تقييمًا عاجلًا.',
      step1: 'معلوماتك الأساسية', step1Help: 'اختر تاريخ الميلاد أو الفئة العمرية، ثم أدخل تاريخ آخر زيارة.',
      step2: 'الحالات ذات الصلة', step2Help: 'يمكن اختيار أكثر من حالة، وسنعرض أقرب موعد.',
      step3: 'تفاصيل إضافية', step3Help: 'تظهر فقط عند الحاجة.',
      dob: 'تاريخ الميلاد', ageToggle: 'استخدام الفئة العمرية بدلًا من تاريخ الميلاد', ageGroup: 'الفئة العمرية', lastVisit: 'تاريخ آخر زيارة لطبيب العيون', noVisit: 'لا توجد لدي زيارة سابقة لطبيب العيون',
      dobHelp: 'تُستخدم فقط لحساب العمر داخل المتصفح.', lastHelp: 'لا يمكن أن يكون التاريخ في المستقبل.',
      calculate: 'احسب موعد الزيارة القادمة', reset: 'إعادة ضبط',
      result: 'النتيجة', resultTools: 'أدوات النتيجة', copyShare: 'نسخ / مشاركة', calendar: 'إضافة إلى التقويم', print: 'طباعة / حفظ PDF', earliestOnly: 'عرض الأقرب فقط',
      earliest: 'أقرب موعد مقترح', lastVisitShort: 'آخر زيارة', age: 'العمر', basis: 'السبب', next: 'الزيارة القادمة', window: 'نافذة المتابعة',
      noAutomatic: 'لا يوجد تاريخ تلقائي لهذه الاختيارات. اتبع تعليمات طبيب العيون.',
      asap: 'في أقرب وقت ممكن من أجل سلامتك ومن حرصنا عليك.',
      dueNow: 'الموعد مستحق الآن', overdue: (d) => `الموعد متأخر ${d} يوم`, dueIn: (d) => `متبقٍ ${d} يوم`,
      validationDob: 'أدخل تاريخ الميلاد أو استخدم الفئة العمرية.', validationLast: 'أدخل تاريخ آخر زيارة أو اختر عدم وجود زيارة سابقة.', validationFuture: 'لا يمكن اختيار تاريخ في المستقبل.',
      disclaimer: 'تنبيه: هذه أداة تثقيفية ولا تُغني عن التقييم الطبي أو تعليمات طبيب العيون المعالج.',
      privacy: 'الخصوصية', terms: 'الشروط والتنبيه الطبي', contact: 'تواصل', email: 'البريد الإلكتروني', phone: 'واتساب',
      howTitle: 'كيف تعمل الحاسبة؟', how1: 'تُجرى الحسابات في متصفحك.', how2: 'عند تعدد الحالات نستخدم أقرب موعد.', how3: 'التوصية لا تتجاوز تعليمات الطبيب.',
      severity: 'شدة السكري', severe: 'شديد — 3 أشهر', moderate: 'متوسط — 6 أشهر', mild: 'بسيط — 9 أشهر', unknown: 'لا أعرف — سنة',
      tedActive: 'مرض العين الدرقي نشط حاليًا',
      annual: 'متابعة سنوية', diabetesBasis: 'حسب شدة السكري', antiVegfBasis: 'متابعة شهرية أثناء العلاج النشط', hba1cBasis: 'السكر التراكمي أعلى من الطبيعي: سنوي', glp1Basis: 'استخدام الدواء: سنوي', tedActiveBasis: 'نشط: كل 3–6 أشهر', tedStableBasis: 'مستقر: سنوي', retinalLaserBasis: 'بعد ليزر الشبكية: سنوي',
      copied: 'تم النسخ.', shareUnavailable: 'تعذر فتح المشاركة؛ تم نسخ النتيجة بدلًا من ذلك.',
      conditions: {
        t1dm: ['السكري النوع الأول (بالغون)', 'تُحدد المدة حسب الشدة'],
        t2dm: ['السكري النوع الثاني (بالغون)', 'تُحدد المدة حسب الشدة'],
        antiVEGF: ['مضادات عامل نمو بطانة الأوعية الدموية (حقن داخل العين)', 'متابعة أثناء العلاج النشط'],
        hba1c: ['السكر التراكمي أعلى من الطبيعي', 'متابعة سنوية'],
        glp1: ['استخدام سيماجلوتايد (أوزمبيك) أو تيرزيباتايد (مونجارو)', 'متابعة سنوية'],
        glauSus: ['مشتبه ماء أزرق / ارتفاع ضغط العين', 'متابعة سنوية'],
        fhGlau: ['قرابة درجة أولى لمريض ماء أزرق', 'متابعة سنوية'],
        highMy: ['قصر نظر شديد', 'متابعة سنوية'],
        ted: ['مرض عين درقي (غريفز)', 'حسب نشاط المرض'],
        retLaser: ['إجراء ليزر للشبكية', 'سنة من آخر زيارة'],
        noRisk: ['بالغون بلا عوامل خطورة', 'حسب الفئة العمرية']
      }
    },
    en: {
      pageTitle: 'Ophthalmology Visit Scheduler',
      eyebrow: 'Bilingual educational tool',
      heroTitle: 'Understand when your next eye follow-up may be due',
      heroText: 'Enter routine follow-up information, select relevant conditions, and receive the earliest suggested date with a clear explanation.',
      heroStat: 'Calculations stay on your device',
      urgentTitle: 'Do not use the scheduler for urgent symptoms',
      urgentText: 'Sudden vision loss, a curtain or shadow, new flashes or floaters, severe pain, eye trauma, or chemical exposure require urgent professional assessment.',
      step1: 'Basic information', step1Help: 'Use date of birth or age group, then enter the last visit date.',
      step2: 'Relevant conditions', step2Help: 'Choose more than one when applicable; the earliest date will be shown.',
      step3: 'Additional details', step3Help: 'Only shown when needed.',
      dob: 'Date of birth', ageToggle: 'Use age group instead of date of birth', ageGroup: 'Age group', lastVisit: 'Last ophthalmology visit', noVisit: 'I have never visited an ophthalmologist',
      dobHelp: 'Used only to calculate age in your browser.', lastHelp: 'Future dates are not allowed.',
      calculate: 'Calculate next visit', reset: 'Reset',
      result: 'Result', resultTools: 'Result tools', copyShare: 'Copy / Share', calendar: 'Add to Calendar', print: 'Print / Save PDF', earliestOnly: 'Show earliest only',
      earliest: 'Earliest suggested date', lastVisitShort: 'Last visit', age: 'Age', basis: 'Basis', next: 'Next visit', window: 'Follow-up window',
      noAutomatic: 'No automatic date applies to these selections. Follow your ophthalmologist’s instructions.',
      asap: 'As soon as possible for your safety and out of our concern for you.',
      dueNow: 'Due now', overdue: (d) => `Overdue by ${d} day${d === 1 ? '' : 's'}`, dueIn: (d) => `Due in ${d} day${d === 1 ? '' : 's'}`,
      validationDob: 'Enter date of birth or use an age group.', validationLast: 'Enter the last visit date or choose no previous visit.', validationFuture: 'A future date cannot be selected.',
      disclaimer: 'Note: This educational tool does not replace medical evaluation or instructions from your treating ophthalmologist.',
      privacy: 'Privacy', terms: 'Terms and medical disclaimer', contact: 'Contact', email: 'Email', phone: 'WhatsApp',
      howTitle: 'How it works', how1: 'Calculations run in your browser.', how2: 'The earliest interval is used for multiple conditions.', how3: 'A clinician’s instructions always take priority.',
      severity: 'Diabetes severity', severe: 'Severe — 3 months', moderate: 'Moderate — 6 months', mild: 'Mild — 9 months', unknown: 'I do not know — 1 year',
      tedActive: 'Thyroid eye disease is currently active',
      annual: 'Annual follow-up', diabetesBasis: 'Based on diabetes severity', antiVegfBasis: 'Monthly during active therapy', hba1cBasis: 'HbA1c above normal: yearly', glp1Basis: 'Medication use: yearly', tedActiveBasis: 'Active: every 3–6 months', tedStableBasis: 'Stable: annually', retinalLaserBasis: 'After retinal laser: yearly',
      copied: 'Copied.', shareUnavailable: 'Sharing was unavailable, so the result was copied instead.',
      conditions: {
        t1dm: ['Type 1 diabetes (adults)', 'Interval based on severity'],
        t2dm: ['Type 2 diabetes (adults)', 'Interval based on severity'],
        antiVEGF: ['Anti-VEGF therapy (intraocular injections)', 'Follow-up during active treatment'],
        hba1c: ['HbA1c above normal', 'Annual follow-up'],
        glp1: ['Using semaglutide (Ozempic) or tirzepatide (Mounjaro)', 'Annual follow-up'],
        glauSus: ['Glaucoma suspect / ocular hypertension', 'Annual follow-up'],
        fhGlau: ['First-degree relative with glaucoma', 'Annual follow-up'],
        highMy: ['High myopia', 'Annual follow-up'],
        ted: ['Thyroid eye disease (Graves)', 'Based on disease activity'],
        retLaser: ['Previous retinal laser', 'One year from the last visit'],
        noRisk: ['Adults without known risk factors', 'Age-based interval']
      }
    }
  };

  const conditionIds = ['t1dm','t2dm','antiVEGF','hba1c','glp1','glauSus','fhGlau','highMy','ted','retLaser','noRisk'];
  const t = (key) => key.split('.').reduce((obj, part) => obj && obj[part], translations[state.lang]);
  const addMonths = (date, count) => { const result = new Date(date); result.setMonth(result.getMonth() + count); return result; };
  const addYears = (date, count) => { const result = new Date(date); result.setFullYear(result.getFullYear() + count); return result; };
  const parseDate = (value) => value ? new Date(`${value}T12:00:00`) : null;
  const formatDate = (date) => new Intl.DateTimeFormat(state.lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB', { day:'2-digit', month:'2-digit', year:'numeric' }).format(date);
  const ageFromDob = (dob) => { const now = new Date(); let age = now.getFullYear() - dob.getFullYear(); const beforeBirthday = now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate()); return age - (beforeBirthday ? 1 : 0); };
  const daysFromToday = (date) => { const a = new Date(date); const b = new Date(); a.setHours(0,0,0,0); b.setHours(0,0,0,0); return Math.round((a - b) / 86400000); };

  function setText(id, value) { const el = $(id); if (el) el.textContent = value; }
  function setLanguage(lang) {
    state.lang = lang === 'en' ? 'en' : 'ar';
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('oph_lang', state.lang);
    document.title = t('pageTitle');
    document.querySelectorAll('[data-i18n]').forEach(el => { const value = t(el.dataset.i18n); if (typeof value === 'string') el.textContent = value; });
    conditionIds.forEach(id => { setText(`tx_${id}`, t(`conditions.${id}`)[0]); setText(`sub_${id}`, t(`conditions.${id}`)[1]); });
    $('lang-ar').classList.toggle('active', state.lang === 'ar');
    $('lang-en').classList.toggle('active', state.lang === 'en');
    if (!$('resultsCard').classList.contains('hidden')) calculate();
  }

  function setTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('oph_theme', dark ? 'dark' : 'light');
    $('theme-light').classList.toggle('active', !dark);
    $('theme-dark').classList.toggle('active', dark);
  }

  function setFontScale(value) {
    const safe = Math.max(85, Math.min(140, Number(value) || 100));
    document.documentElement.style.setProperty('--font-scale', `${safe}%`);
    setText('fontPct', `${safe}%`);
    localStorage.setItem('oph_font_scale', String(safe));
  }

  function toggleAgeMode() {
    const grouped = $('ageGroupToggle').checked;
    $('dobWrap').classList.toggle('hidden', grouped);
    $('ageGroupWrap').classList.toggle('hidden', !grouped);
    clearError('dob');
  }

  function toggleNoVisit() {
    const noVisit = $('noOphthVisit').checked;
    $('lastVisit').disabled = noVisit;
    if (noVisit) { $('lastVisit').value = ''; clearError('lastVisit'); }
  }

  function toggleExtras() {
    const dm = $('c_t1dm').checked || $('c_t2dm').checked;
    const ted = $('c_ted').checked;
    $('conditionalFields').classList.toggle('hidden', !(dm || ted));
    $('dmExtra').classList.toggle('hidden', !dm);
    $('tedExtra').classList.toggle('hidden', !ted);
  }

  function showError(id, message) {
    const input = $(id); const error = $(`${id}Error`);
    input.classList.add('invalid'); error.textContent = message; error.classList.remove('hidden'); input.focus();
  }
  function clearError(id) { const input = $(id); const error = $(`${id}Error`); input.classList.remove('invalid'); error.textContent = ''; error.classList.add('hidden'); }

  function getAge() {
    if ($('ageGroupToggle').checked) {
      const group = $('ageGroup').value;
      return { years: group === 'u40' ? 30 : group === '40-54' ? 47 : group === '55-64' ? 60 : 70, label: group === 'u40' ? '< 40' : group };
    }
    const dob = parseDate($('dob').value);
    if (!dob) return null;
    return { years: ageFromDob(dob), label: String(ageFromDob(dob)) };
  }

  function diabetesDate(lastVisit) {
    const selected = document.querySelector('input[name="dmSeverity"]:checked');
    const value = selected ? selected.value : 'unknown';
    return value === 'severe' ? addMonths(lastVisit,3) : value === 'moderate' ? addMonths(lastVisit,6) : value === 'mild' ? addMonths(lastVisit,9) : addYears(lastVisit,1);
  }

  function calculate() {
    clearError('dob'); clearError('lastVisit');
    const noVisit = $('noOphthVisit').checked;
    const age = getAge();
    if (!age) { showError('dob', t('validationDob')); return; }
    if (noVisit) {
      state.recommendations = []; state.earliest = null;
      renderAsap(age);
      return;
    }
    const lastVisit = parseDate($('lastVisit').value);
    if (!lastVisit) { showError('lastVisit', t('validationLast')); return; }
    const today = new Date(); today.setHours(23,59,59,999);
    if (lastVisit > today) { showError('lastVisit', t('validationFuture')); return; }

    const recs = [];
    const annual = (id, basis = t('annual')) => recs.push({ id, label:t(`conditions.${id}`)[0], next:addYears(lastVisit,1), basis });
    if ($('c_glauSus').checked) annual('glauSus');
    if ($('c_fhGlau').checked) annual('fhGlau');
    if ($('c_highMy').checked) annual('highMy');
    if ($('c_hba1c').checked) annual('hba1c', t('hba1cBasis'));
    if ($('c_glp1').checked) annual('glp1', t('glp1Basis'));
    if ($('c_retLaser').checked) annual('retLaser', t('retinalLaserBasis'));
    if ($('c_t1dm').checked) recs.push({ id:'t1dm', label:t('conditions.t1dm')[0], next:diabetesDate(lastVisit), basis:t('diabetesBasis') });
    if ($('c_t2dm').checked) recs.push({ id:'t2dm', label:t('conditions.t2dm')[0], next:diabetesDate(lastVisit), basis:t('diabetesBasis') });
    if ($('c_antiVEGF').checked) recs.push({ id:'antiVEGF', label:t('conditions.antiVEGF')[0], next:addMonths(lastVisit,1), basis:t('antiVegfBasis') });
    if ($('c_ted').checked) {
      if ($('tedActive').checked) recs.push({ id:'ted', label:t('conditions.ted')[0], next:addMonths(lastVisit,3), window:[addMonths(lastVisit,3),addMonths(lastVisit,6)], basis:t('tedActiveBasis') });
      else annual('ted', t('tedStableBasis'));
    }
    if ($('c_noRisk').checked && age.years >= 40) {
      if (age.years <= 54) recs.push({ id:'noRisk', label:t('conditions.noRisk')[0], next:addYears(lastVisit,2), window:[addYears(lastVisit,2),addYears(lastVisit,4)], basis:'40–54: 2–4 years' });
      else if (age.years <= 64) recs.push({ id:'noRisk', label:t('conditions.noRisk')[0], next:addYears(lastVisit,1), window:[addYears(lastVisit,1),addYears(lastVisit,3)], basis:'55–64: 1–3 years' });
      else recs.push({ id:'noRisk', label:t('conditions.noRisk')[0], next:addYears(lastVisit,1), window:[addYears(lastVisit,1),addYears(lastVisit,2)], basis:'≥65: 1–2 years' });
    }

    recs.sort((a,b) => a.next - b.next);
    state.recommendations = recs; state.earliest = recs[0] || null;
    renderResults(lastVisit, age);
  }

  function renderAsap(age) {
    $('resultsCard').classList.remove('hidden');
    $('summary').innerHTML = `<div class="date">${t('asap')}</div><p>${t('age')}: ${age.label}</p>`;
    $('dueBanner').classList.add('hidden'); $('details').innerHTML = '';
    $('resultsCard').scrollIntoView({behavior:'smooth',block:'start'});
  }

  function renderResults(lastVisit, age) {
    $('resultsCard').classList.remove('hidden');
    if (state.earliest) {
      $('summary').innerHTML = `<span>${t('earliest')}</span><div class="date">${formatDate(state.earliest.next)}</div><p>${t('lastVisitShort')}: ${formatDate(lastVisit)} · ${t('age')}: ${age.label}</p>`;
      const diff = daysFromToday(state.earliest.next);
      $('dueBanner').classList.remove('hidden');
      $('dueBanner').className = `status ${diff < 0 ? 'overdue' : diff === 0 ? 'due' : 'future'}`;
      $('dueBanner').textContent = diff < 0 ? t('overdue')(-diff) : diff === 0 ? t('dueNow') : t('dueIn')(diff);
    } else {
      $('summary').innerHTML = `<div class="date">${t('noAutomatic')}</div><p>${t('lastVisitShort')}: ${formatDate(lastVisit)} · ${t('age')}: ${age.label}</p>`;
      $('dueBanner').classList.add('hidden');
    }
    const list = $('earliestOnly').checked && state.earliest ? [state.earliest] : state.recommendations;
    $('details').innerHTML = list.map(rec => `<article class="detail"><h3>${rec.label}</h3><p><strong>${t('basis')}:</strong> ${rec.basis}</p><p><strong>${t('next')}:</strong> ${formatDate(rec.next)}</p>${rec.window ? `<p><strong>${t('window')}:</strong> ${formatDate(rec.window[0])} – ${formatDate(rec.window[1])}</p>` : ''}</article>`).join('');
    $('resultsCard').scrollIntoView({behavior:'smooth',block:'start'});
  }

  function reset() {
    $('schedulerForm').reset();
    $('lastVisit').disabled = false;
    $('resultsCard').classList.add('hidden');
    toggleAgeMode(); toggleExtras(); clearError('dob'); clearError('lastVisit');
    state.recommendations = []; state.earliest = null;
  }

  function resultText() {
    return [$('summary').innerText, $('dueBanner').classList.contains('hidden') ? '' : $('dueBanner').innerText, $('details').innerText].filter(Boolean).join('\n\n');
  }

  async function shareOrCopy() {
    const text = resultText(); if (!text) return;
    try { if (navigator.share) { await navigator.share({title:document.title,text}); return; } } catch (_) {}
    try { await navigator.clipboard.writeText(text); alert(t('copied')); } catch (_) {
      const area = document.createElement('textarea'); area.value = text; document.body.append(area); area.select(); document.execCommand('copy'); area.remove(); alert(t('copied'));
    }
  }

  function downloadCalendar() {
    if (!state.earliest) return;
    const d = state.earliest.next; const ymd = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
    const title = state.lang === 'ar' ? 'موعد متابعة عيون مقترح' : 'Suggested ophthalmology follow-up';
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Ophth-Scheduler//EN\r\nBEGIN:VEVENT\r\nUID:${Date.now()}@opth.net\r\nDTSTART;VALUE=DATE:${ymd}\r\nSUMMARY:${title}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([ics],{type:'text/calendar'})); const link = document.createElement('a'); link.href=url; link.download='ophthalmology-follow-up.ics'; link.click(); URL.revokeObjectURL(url);
  }

  function registerServiceWorker() { if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {}); }

  function init() {
    $('lang-ar').addEventListener('click', () => setLanguage('ar'));
    $('lang-en').addEventListener('click', () => setLanguage('en'));
    $('theme-light').addEventListener('click', () => setTheme('light'));
    $('theme-dark').addEventListener('click', () => setTheme('dark'));
    $('fontMinus').addEventListener('click', () => setFontScale(Number(localStorage.getItem('oph_font_scale') || 100) - 5));
    $('fontPlus').addEventListener('click', () => setFontScale(Number(localStorage.getItem('oph_font_scale') || 100) + 5));
    $('fontReset').addEventListener('click', () => setFontScale(100));
    $('ageGroupToggle').addEventListener('change', toggleAgeMode);
    $('noOphthVisit').addEventListener('change', toggleNoVisit);
    $('c_t1dm').addEventListener('change', toggleExtras); $('c_t2dm').addEventListener('change', toggleExtras); $('c_ted').addEventListener('change', toggleExtras);
    $('btnCalc').addEventListener('click', calculate); $('resetBtn').addEventListener('click', reset);
    $('copyBtn').addEventListener('click', shareOrCopy); $('icsBtn').addEventListener('click', downloadCalendar); $('printBtn').addEventListener('click', () => window.print()); $('earliestOnly').addEventListener('change', calculate);
    setTheme(localStorage.getItem('oph_theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    setFontScale(localStorage.getItem('oph_font_scale') || 100);
    setLanguage(localStorage.getItem('oph_lang') || 'ar');
    toggleAgeMode(); toggleExtras(); registerServiceWorker();
  }

  document.addEventListener('DOMContentLoaded', init);
})();