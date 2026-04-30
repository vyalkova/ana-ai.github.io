// Production stub — provides hooks/components that app.jsx imports,
// but renders nothing visible. The Tweaks panel is a design-time tool only.

function useTweaks(defaults) {
  const [tweaks] = React.useState(defaults);
  const setTweak = (key, value) => {
    // No-op in production. Tweaks are locked to defaults.
  };
  return [tweaks, setTweak];
}

function TweaksPanel({ children, title }) {
  return null;
}

function TweakSection({ children, title }) {
  return null;
}

function TweakSelect({ value, onChange, options }) {
  return null;
}

function TweakRadio({ value, onChange, options }) {
  return null;
}

function TweakToggle({ value, onChange, label }) {
  return null;
}
