import "./delay-slider.css";

type DelaySliderProps = {
  id: string;
  delay: number;
  onChange: (newDelay: number) => void;
  label: string;
};

const SNAP_POINTS = [0, 5000, 10000, 15000, 20000, 25000, 30000];

const DelaySlider: React.FC<DelaySliderProps> = ({
  id,
  delay,
  onChange,
  label,
}) => {
  const [value, setValue] = useState(delay);
  const [snapEnabled, setSnapEnabled] = useState(true);

  useEffect(() => {
    setValue(delay);
  }, [delay]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(newValue);
  };

  const handleReset = () => {
    setValue(0);
    onChange(0);
  };

  return (
    <div className="delay-slider">
      <div className="slider-header">
        <label htmlFor={id}>
          {label}: {value / 1000}s
        </label>
        <div className="slider-controls">
          <button
            className="snap-toggle"
            onClick={() => setSnapEnabled(!snapEnabled)}
            title={snapEnabled ? "Désactiver snap" : "Activer snap"}
          >
            {snapEnabled ? "⊙" : "○"}
          </button>
          <button className="reset-button" onClick={handleReset}>
            {browser.i18n.getMessage("delayButton")}
          </button>
        </div>
      </div>
      <div className="slider-container">
        <input
          type="range"
          id={id}
          min="0"
          max="30000"
          step="100"
          value={value}
          onChange={handleChange}
          list={snapEnabled ? `${id}-detents` : undefined}
        />
        {snapEnabled && (
          <datalist id={`${id}-detents`}>
            {SNAP_POINTS.map((point) => (
              <option key={point} value={point} />
            ))}
          </datalist>
        )}
      </div>
    </div>
  );
};

export default DelaySlider;
