const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "obsidian-gold",
  "layout": "centered",
  "headingFont": "mono",
  "headingMode": "all-plain",
  "showBadge": true,
  "buttonStyle": "outline"
}/*EDITMODE-END*/;

const PALETTES = {
  "cream-navy-pink": {
    name: "Cream · Navy · Violet",
    bg: "#f3eee8", bg2: "#ece4d9", bgSoft: "#f8f3ec",
    ink: "#0d1b4c", ink2: "#324075", ink3: "#6a7397", inkMute: "#9099b5",
    accent: "#7a4bd6", accent2: "#a87ce8", accentSoft: "#ece1ff",
    white: "#ffffff", line: "rgba(13, 27, 76, 0.08)",
    fieldBg: "#f8f3ec", fieldLine: "rgba(13, 27, 76, 0.08)",
    dark: false,
  },
  "warmgrey-textured": {
    name: "Warm Grey · Layered",
    bg: "#3a352f", bg2: "#221f1c", bgSoft: "#5a5048",
    ink: "#f5efe6", ink2: "#cfc7b9", ink3: "#9a9286", inkMute: "#7a7368",
    accent: "#a78bff", accent2: "#7a4bd6", accentSoft: "rgba(167,139,255,0.18)",
    white: "rgba(34,31,28,0.78)", line: "rgba(255,245,220,0.10)",
    fieldBg: "rgba(255,245,220,0.05)", fieldLine: "rgba(255,245,220,0.12)",
    dark: true,
  },
  "porcelain-indigo-coral": {
    name: "Porcelain · Indigo · Coral",
    bg: "#f1edea", bg2: "#e6dfd8", bgSoft: "#f7f4f1",
    ink: "#1f2966", ink2: "#3b478e", ink3: "#7079a8", inkMute: "#9aa0c2",
    accent: "#ff5d52", accent2: "#ffb347", accentSoft: "#ffe5e1",
    white: "#ffffff", line: "rgba(31, 41, 102, 0.08)",
    fieldBg: "#f7f4f1", fieldLine: "rgba(31, 41, 102, 0.08)",
    dark: false,
  },
  "mint-forest-amber": {
    name: "Mint · Forest · Amber",
    bg: "#eaf1ec", bg2: "#dde7df", bgSoft: "#f3f8f4",
    ink: "#0e3a2c", ink2: "#2d5a48", ink3: "#5a7a6c", inkMute: "#90a499",
    accent: "#e08e23", accent2: "#ffb347", accentSoft: "#fcebd2",
    white: "#ffffff", line: "rgba(14, 58, 44, 0.10)",
    fieldBg: "#f3f8f4", fieldLine: "rgba(14, 58, 44, 0.10)",
    dark: false,
  },
  "sand-espresso-rust": {
    name: "Sand · Espresso · Rust",
    bg: "#efe8df", bg2: "#e2d8c8", bgSoft: "#f6f1e8",
    ink: "#3d2a1c", ink2: "#5e4632", ink3: "#8a7460", inkMute: "#b3a18b",
    accent: "#c2552c", accent2: "#e8a366", accentSoft: "#f7d8c4",
    white: "#fdfaf4", line: "rgba(61, 42, 28, 0.10)",
    fieldBg: "#f6f1e8", fieldLine: "rgba(61, 42, 28, 0.10)",
    dark: false,
  },
  "obsidian-gold": {
    name: "Obsidian · Gold (dark)",
    bg: "#1c1815", bg2: "#14110f", bgSoft: "#2a241e",
    ink: "#f5efe6", ink2: "#c8c0b3", ink3: "#8a8275", inkMute: "#6e6759",
    accent: "#d4b27a", accent2: "#b8945c", accentSoft: "rgba(212,178,122,0.16)",
    white: "rgba(20,17,15,0.78)", line: "rgba(255,245,220,0.08)",
    fieldBg: "rgba(255,245,220,0.04)", fieldLine: "rgba(255,245,220,0.10)",
    dark: true,
  },
  "graphite-violet": {
    name: "Graphite · Violet (dark)",
    bg: "#1f1d28", bg2: "#15131c", bgSoft: "#2a2738",
    ink: "#f0eef7", ink2: "#c4bfd6", ink3: "#8b85a3", inkMute: "#6c6786",
    accent: "#a78bff", accent2: "#7a3cff", accentSoft: "rgba(167,139,255,0.18)",
    white: "rgba(21,19,28,0.78)", line: "rgba(240,238,247,0.08)",
    fieldBg: "rgba(240,238,247,0.05)", fieldLine: "rgba(240,238,247,0.10)",
    dark: true,
  },
};

const FONTS = {
  "sans-bold":   { name: "Inter Bold",      heading: "'Inter', system-ui, sans-serif",       weight: 800, tracking: "-0.035em", leading: 0.98 },
  "serif-italic":{ name: "Fraunces Italic", heading: "'Fraunces', serif",                    weight: 500, tracking: "-0.025em", leading: 1.02 },
  "serif-bold":  { name: "Fraunces Bold",   heading: "'Fraunces', serif",                    weight: 600, tracking: "-0.02em",  leading: 1.0  },
  "mono":        { name: "Mono Caps",       heading: "'Space Mono', 'JetBrains Mono', ui-monospace, monospace", weight: 700, tracking: "0.02em", leading: 0.95 },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[tweaks.palette] || PALETTES["cream-navy-pink"];
  const font = FONTS[tweaks.headingFont] || FONTS["sans-bold"];

  const cssVars = {
    "--bg": palette.bg,
    "--bg-2": palette.bg2,
    "--bg-soft": palette.bgSoft,
    "--ink": palette.ink,
    "--ink-2": palette.ink2,
    "--ink-3": palette.ink3,
    "--ink-mute": palette.inkMute,
    "--accent": palette.accent,
    "--accent-2": palette.accent2,
    "--accent-soft": palette.accentSoft,
    "--white": palette.white,
    "--line": palette.line,
    "--field-bg": palette.fieldBg,
    "--field-line": palette.fieldLine,
    "--font-heading": font.heading,
    "--heading-weight": font.weight,
    "--heading-tracking": font.tracking,
    "--heading-leading": font.leading,
  };

  return (
    <div className="page" style={cssVars}>
      <BackgroundFX dark={palette.dark} />
      <main className="hero" data-layout={tweaks.layout}>
        {tweaks.layout === "card-left" ? (
          <>
            <SignupCard buttonStyle={tweaks.buttonStyle} />
            <HeroCopy tweaks={tweaks} />
          </>
        ) : (
          <>
            <HeroCopy tweaks={tweaks} />
            {tweaks.layout !== "centered" && <SignupCard buttonStyle={tweaks.buttonStyle} />}
          </>
        )}
        {tweaks.layout === "centered" && <SignupCard buttonStyle={tweaks.buttonStyle} />}
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakSelect
            value={tweaks.palette}
            onChange={(v) => setTweak("palette", v)}
            options={Object.entries(PALETTES).map(([k, v]) => ({ value: k, label: v.name }))}
          />
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio
            value={tweaks.layout}
            onChange={(v) => setTweak("layout", v)}
            options={[
              { value: "split", label: "Split" },
              { value: "card-left", label: "Card left" },
              { value: "centered", label: "Centered" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Heading font">
          <TweakRadio
            value={tweaks.headingFont}
            onChange={(v) => setTweak("headingFont", v)}
            options={Object.entries(FONTS).map(([k, v]) => ({ value: k, label: v.name }))}
          />
        </TweakSection>
        <TweakSection title="Heading style">
          <TweakRadio
            value={tweaks.headingMode}
            onChange={(v) => setTweak("headingMode", v)}
            options={[
              { value: "italic-accent", label: "Italic accent" },
              { value: "all-italic", label: "All italic" },
              { value: "all-plain", label: "All plain" },
              { value: "big-amp", label: "Big ampersand" },
              { value: "line-break", label: "Stacked lines" },
            ]}
          />
        </TweakSection>
        <TweakSection title="CTA button">
          <TweakRadio
            value={tweaks.buttonStyle}
            onChange={(v) => setTweak("buttonStyle", v)}
            options={[
              { value: "navy", label: "Ink" },
              { value: "accent", label: "Accent" },
              { value: "outline", label: "Outline" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Free Resources badge">
          <TweakToggle
            value={tweaks.showBadge}
            onChange={(v) => setTweak("showBadge", v)}
            label="Show pill above heading"
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function HeroCopy({ tweaks }) {
  return (
    <header className="hero__copy">
      {tweaks.showBadge && (
        <span className="badge">
          <span className="badge__dot" />
          FREE RESOURCES
        </span>
      )}
      <Heading mode={tweaks.headingMode} />
      <p className="hero__sub">
        Get instant access to the resources I shared in my videos.
        Templates, tools, documents and more.
      </p>
    </header>
  );
}

function Heading({ mode }) {
  if (mode === "all-italic") {
    return <h1 className="hero__title hero__title--all-italic">Tools, Templates &amp; Documents</h1>;
  }
  if (mode === "all-plain") {
    return (
      <h1 className="hero__title">
        <span className="line">Tools,</span>
        <span className="line">Templates</span>
        <span className="line">&amp; Documents</span>
      </h1>
    );
  }
  if (mode === "big-amp") {
    return (
      <h1 className="hero__title">
        Tools, Templates <span className="big-amp">&amp;</span> Documents
      </h1>
    );
  }
  if (mode === "line-break") {
    return (
      <h1 className="hero__title hero__title--stacked">
        Tools,<br />Templates <em>&amp;</em><br />Documents
      </h1>
    );
  }
  return (
    <h1 className="hero__title">
      Tools, Templates <em>&amp; Documents</em>
    </h1>
  );
}

function BackgroundFX({ dark }) {
  return (
    <div className={`bgfx ${dark ? "bgfx--dark" : ""}`} aria-hidden>
      <div className="bgfx__floor" />
      <div className="bgfx__sun" />
      <div className="bgfx__warm" />
    </div>
  );
}

const RESOURCES = [
  { kind: "Notion", title: "Project OS Template", size: "8 pages" },
  { kind: "Figma", title: "Brand Audit Kit", size: "24 frames" },
  { kind: "PDF", title: "Pricing Playbook", size: "32 pages" },
];

// ⚠️ REPLACE 'YOUR_FORM_ID' WITH YOUR REAL FORMSPREE FORM ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgzradl";

function SignupCard({ buttonStyle = "navy" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const nameValid = name.trim().length >= 2;
  const canSubmit = emailValid && nameValid && !submitting;

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!canSubmit) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

      const response = await fetch("https://formspree.io/f/xlgzradl", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        setDone(true);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ SUCCESS SCREEN (your new version)
  if (done) {
    return (
      <section className="card success-card">
        <div className="success-simple">
          <div className="success__check"><CheckIcon /></div>

          <h3>You're In!</h3>

          <p>
            Click the button below to access all the free resources,
            templates, tools, guides, and more.
          </p>

          <a
            className="access-button"
            href="https://www.notion.so/I-Lost-My-Job-So-I-Started-Building-With-AI-3521b991d641802299e9fba46ff50759"
            target="_blank"
            rel="noopener noreferrer"
          >
            Access Resources
          </a>
        </div>
      </section>
    );
  }

  // ✅ NORMAL FORM
  return (
    <section className="card">
      <div className="card__head">
        <h2 className="card__title">Get Instant Access</h2>
        <p className="card__sub">Enter your details below to unlock all resources</p>
      </div>

      <form className="form" onSubmit={onSubmit} noValidate>
        <Field
          label="Name"
          icon={<UserIcon />}
          placeholder="Your name"
          value={name}
          onChange={setName}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          error={touched.name && !nameValid ? "Tell us what to call you" : null}
          autoComplete="name"
        />

        <Field
          label="Email"
          icon={<MailIcon />}
          placeholder="you@company.com"
          value={email}
          onChange={setEmail}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={touched.email && !emailValid ? "That doesn't look like an email" : null}
          type="email"
          autoComplete="email"
        />

        <button
          type="submit"
          className={`btn-primary ${submitting ? "is-loading" : ""}`}
          disabled={!canSubmit}
        >
          {submitting ? <SpinIcon /> : null}
          <span>{submitting ? "Unlocking…" : "Get Free Access"}</span>
        </button>

        {submitError && (
          <p style={{ margin: "8px 0 0", fontSize: "12.5px", color: "#f08c7e", textAlign: "center" }}>
            {submitError}
          </p>
        )}

        <p className="fineprint">
          <LockIcon /> Only valuable emails. Unsubscribe anytime.
        </p>
      </form>
    </section>
  );
}

function Field({ label, icon, placeholder, value, onChange, onBlur, error, type = "text", autoComplete }) {
  return (
    <label className={`field ${error ? "field--error" : ""}`}>
      <span className="field__label">{label}</span>
      <span className="field__input">
        <span className="field__icon">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          spellCheck={false}
        />
      </span>
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}

function UserIcon() { return (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M5 20c1.4-3.4 4-5 7-5s5.6 1.6 7 5" /></svg>); }
function MailIcon() { return (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2.4" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>); }
function LockIcon() { return (<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "-2px", marginRight: 4}}><rect x="4.5" y="10.5" width="15" height="10" rx="2.2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></svg>); }
function CheckIcon() { return (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5" /></svg>); }
function DownloadIcon() { return (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" /></svg>); }
function SpinIcon() { return (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 4a8 8 0 1 1-8 8" /></svg>); }

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
