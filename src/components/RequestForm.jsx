import { useState } from 'react';
import styles from './Sections.module.css';

const FALLBACK_EMAIL = 'info@greenmatter.nl';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  role: '',
  phase: '',
  message: '',
  website: '', // honeypot: blijft leeg bij echte bezoekers
};

function buildMailto(copy, form, selectedTitles) {
  const lines = [
    copy.quoteBody(selectedTitles.length > 0 ? selectedTitles : ['-']),
    '',
    `${copy.form.name}: ${form.name}`,
    `${copy.form.organisation}: ${form.organisation}`,
    `${copy.form.role}: ${copy.form.roles[form.role] ?? form.role}`,
    `${copy.form.phase}: ${copy.form.phases[form.phase] ?? form.phase}`,
    form.phone ? `${copy.form.phone}: ${form.phone}` : '',
    form.message ? `\n${form.message}` : '',
  ].filter(Boolean);

  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
    copy.quoteSubject,
  )}&body=${encodeURIComponent(lines.join('\n'))}`;
}

function RequestForm({ copy, language, onToggleSelected, selectedIds, solutions }) {
  const text = copy.form;
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle');

  const selectedTitles = solutions
    .filter((solution) => selectedIds.includes(solution.id))
    .map((solution) => solution.title);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/aanvraag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          language,
          solutions: selectedTitles,
          page: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus('success');
      setForm(emptyForm);
    } catch {
      setStatus('error');
      window.location.href = buildMailto(copy, form, selectedTitles);
    }
  };

  return (
    <section aria-labelledby="contact-heading" className={styles.section} id="contact">
      <div className={`${styles.inner} ${styles.formGrid}`}>
        <div>
          <h2 id="contact-heading">{text.heading}</h2>
          <p className={styles.lead}>{text.intro}</p>
        </div>

        {status === 'success' ? (
          <p className={styles.formSuccess} role="status">
            {text.success}
          </p>
        ) : (
          <form className={styles.form} noValidate={false} onSubmit={handleSubmit}>
            <fieldset className={styles.selection}>
              <legend>
                {text.selectionLabel} ({selectedIds.length})
              </legend>
              {selectedIds.length === 0 ? (
                <p className={styles.selectionEmpty}>{text.selectionEmpty}</p>
              ) : null}
              <div className={styles.checkboxGrid}>
                {solutions.map((solution) => (
                  <label key={solution.id} className={styles.checkbox}>
                    <input
                      checked={selectedIds.includes(solution.id)}
                      name="solutions"
                      type="checkbox"
                      value={solution.id}
                      onChange={() => onToggleSelected(solution.id)}
                    />
                    <span>{solution.title}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span>
                  {text.name} <abbr title={text.required}>*</abbr>
                </span>
                <input
                  autoComplete="name"
                  name="name"
                  required
                  type="text"
                  value={form.name}
                  onChange={updateField}
                />
              </label>
              <label className={styles.field}>
                <span>
                  {text.organisation} <abbr title={text.required}>*</abbr>
                </span>
                <input
                  autoComplete="organization"
                  name="organisation"
                  required
                  type="text"
                  value={form.organisation}
                  onChange={updateField}
                />
              </label>
            </div>

            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span>
                  {text.email} <abbr title={text.required}>*</abbr>
                </span>
                <input
                  autoComplete="email"
                  name="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={updateField}
                />
              </label>
              <label className={styles.field}>
                <span>{text.phone}</span>
                <input
                  autoComplete="tel"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={updateField}
                />
              </label>
            </div>

            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span>
                  {text.role} <abbr title={text.required}>*</abbr>
                </span>
                <select name="role" required value={form.role} onChange={updateField}>
                  <option value="">{text.choose}</option>
                  {Object.entries(text.roles).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>
                  {text.phase} <abbr title={text.required}>*</abbr>
                </span>
                <select name="phase" required value={form.phase} onChange={updateField}>
                  <option value="">{text.choose}</option>
                  {Object.entries(text.phases).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className={styles.field}>
              <span>{text.message}</span>
              <textarea
                name="message"
                placeholder={text.messagePlaceholder}
                rows={4}
                value={form.message}
                onChange={updateField}
              />
            </label>

            <label aria-hidden="true" className={styles.honeypot}>
              Website
              <input
                autoComplete="off"
                name="website"
                tabIndex={-1}
                type="text"
                value={form.website}
                onChange={updateField}
              />
            </label>

            <p className={styles.privacyNote}>
              {text.privacy}{' '}
              <a
                href="https://www.greenmatter.nl/privacyverklaring/"
                rel="noreferrer"
                target="_blank"
              >
                {text.privacyLink}
              </a>
              .
            </p>

            {status === 'error' ? (
              <p className={styles.formError} role="alert">
                {text.error}
              </p>
            ) : null}

            <button className={styles.submitButton} disabled={status === 'sending'} type="submit">
              {status === 'sending' ? text.sending : text.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default RequestForm;
